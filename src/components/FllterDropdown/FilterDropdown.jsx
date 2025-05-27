"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { GiSettingsKnobs } from "react-icons/gi";
import BottomSheet from "../BottomSheet/BottomSheet";

const grades = [
  { id: 0, label: "전체" },
  { id: 1, label: "COMMON" },
  { id: 2, label: "RARE" },
  { id: 3, label: "SUPER RARE" },
  { id: 4, label: "LEGENDARY" },
];

const genres = [
  { id: 0, label: "전체" },
  { id: 1, label: "여행" },
  { id: 2, label: "풍경" },
  { id: 3, label: "인물" },
  { id: 4, label: "사물" },
];

const sales = [
  { id: 0, label: "전체" },
  { id: 1, label: "판매중" },
  { id: 2, label: "판매완료" },
];

const methods = [
  { id: 0, label: "전체" },
  { id: 1, label: "교환중" },
  { id: 2, label: "교환완료" },
];

// 각 필터 타입별 옵션 객체
const filterOptions = {
  grade: grades,
  genre: genres,
  sale: sales,
  method: methods,
};

// UI에 보여줄 라벨
const labels = {
  grade: "등급",
  genre: "장르",
  sale: "매진여부",
  method: "판매방법",
};

export default function FilterDropdown({
  iconSize = 35,
  visibleFilters = ["grade", "genre", "sale", "method"],
  gradeCounts = [],
  genreCounts = [],
  saleCounts = [],
  methodCounts = [],
  filteredCount,  
  loading,        
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [openFilter, setOpenFilter] = useState(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isSmOrLarger, setIsSmOrLarger] = useState(false);
  const dropdownRef = useRef(null);
  const SM_WIDTH = 744;

  useEffect(() => {
    function handleResize() {
      const isSm = window.innerWidth >= SM_WIDTH;
      setIsSmOrLarger(isSm);
      if (isSm) setIsBottomSheetOpen(false);
      else setOpenFilter(null);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenFilter(null);
      }
    }

    if (openFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openFilter]);

  const getFilterValue = (type) => {
    const value = searchParams.get(type);
    return value ? Number(value) : 0;
  };

  const getCount = (type, id) => {
    if (id === 0) return 0; // "전체"는 카운트 표시 안함

    let countData;
    switch (type) {
      case "grade":
        countData = gradeCounts.find((c) => c.gradeId === id);
        break;
      case "genre":
        countData = genreCounts.find((c) => c.genreId === id);
        break;
      case "sale":
        countData = saleCounts.find((c) => c.saleId === id);
        break;
      case "method":
        countData = methodCounts.find((c) => c.methodId === id);
        break;
      default:
        return 0;
    }
    return countData ? countData.count : 0;
  };

  const getLabelFromId = (type, id) => {
    const option = filterOptions[type].find((opt) => opt.id === id);
    const hasQueryParam = searchParams.has(type);

    if (!hasQueryParam && id === 0) {
      return labels[type];
    }

    if (!option) return "전체";

    const count = getCount(type, id);
    if (count > 0) {
      return `${option.label}`;
    }
    return option.label;
  };

  const handleSelect = (filterType, value) => {
    const params = new URLSearchParams(searchParams);

    if (value === 0) {
      params.delete(filterType);
    } else {
      params.set(filterType, value);
    }

    setOpenFilter(null);
    setIsBottomSheetOpen(false);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className="flex gap-4 items-center relative w-full flex-wrap md:flex-nowrap md:ml-6 lg:ml-12"
      ref={dropdownRef}
    >
      {/* 데스크톱 드롭다운 버튼들 */}
      {visibleFilters.map((type) => {
        const selectedId = getFilterValue(type);
        return (
          <div key={type} className="relative hidden md:block">
            <button
              onClick={() =>
                setOpenFilter((prev) => (prev === type ? null : type))
              }
              className="flex justify-center md:gap-3 lg:gap-3.5 items-center h-[22px] lg:h-[24px] text-white border-none md:text-700-14 lg:text-700-16 cursor-pointer"
            >
              <span>{getLabelFromId(type, selectedId)}</span>
              {openFilter === type ? (
                <GoTriangleUp className="ml-1" />
              ) : (
                <GoTriangleDown className="ml-1" />
              )}
            </button>

            {/* 드롭다운 목록 */}
            {openFilter === type && isSmOrLarger && (
              <ul className="absolute left-0 mt-2 bg-black border text-white w-[134px] z-10 max-h-60 overflow-auto">
                {filterOptions[type].map((item) => {
                  const count = getCount(type, item.id);
                  return (
                    <li
                      key={item.id}
                      onClick={() => handleSelect(type, item.id)}
                      className={`hover:bg-gray-700 px-4 py-2 cursor-pointer ${
                        item.id === selectedId ? "bg-gray-700 font-bold" : ""
                      }`}
                    >
                      {item.label}{" "}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}

      {/* 모바일 설정 아이콘 */}
      {visibleFilters.length > 0 && (
        <div
          className="flex justify-center items-center border border-gray-200 rounded-xs md:hidden cursor-pointer"
          style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
          onClick={() => setIsBottomSheetOpen(true)}
        >
          <GiSettingsKnobs
            className="w-5 h-5 font-bold"
            style={{ transform: "rotate(90deg)" }}
          />
        </div>
      )}

      {/* 모바일 바텀시트 */}
      {isBottomSheetOpen && !isSmOrLarger && (
        <>
          <div
            className="fixed inset-0 bg-black z-8889"
            style={{ opacity: 0.5 }}
            onClick={() => setIsBottomSheetOpen(false)}
          />
          <BottomSheet
            onClose={() => setIsBottomSheetOpen(false)}
            filters={visibleFilters}
            counts={{
              grade: gradeCounts,
              genre: genreCounts,
              sale: saleCounts,
              method: methodCounts,
            }}
            filteredCount={filteredCount}  
            loading={loading}             
          />
        </>
      )}
    </div>
  );
}
