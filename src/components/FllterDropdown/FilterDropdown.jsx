"use client";

import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { GiSettingsKnobs } from "react-icons/gi";
import BottomSheet from "../BottomSheet/BottomSheet";
import { useFilterDropdown } from "@/hooks/useFilterDropdown";

// 필터 옵션 정의
const filterOptions = {
  grade: [
    { id: 0, label: "전체" },
    { id: 1, label: "COMMON" },
    { id: 2, label: "RARE" },
    { id: 3, label: "SUPER RARE" },
    { id: 4, label: "LEGENDARY" },
  ],
  genre: [
    { id: 0, label: "전체" },
    { id: 1, label: "여행" },
    { id: 2, label: "풍경" },
    { id: 3, label: "인물" },
    { id: 4, label: "사물" },
  ],
  sale: [
    { id: 0, label: "전체" },
    { id: 1, label: "판매중" },
    { id: 2, label: "판매완료" },
  ],
  method: [
    { id: 0, label: "전체" },
    { id: 1, label: "교환중" },
    { id: 2, label: "교환완료" },
  ],
};

// 필터 타입 라벨
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
  const {
    dropdownRef,
    openFilter,
    setOpenFilter,
    isBottomSheetOpen,
    setIsBottomSheetOpen,
    isSmOrLarger,
    getFilterValue,
    getCount,
    handleSelect,
  } = useFilterDropdown({
    grade: gradeCounts,
    genre: genreCounts,
    sale: saleCounts,
    method: methodCounts,
  });

  const getLabelFromId = (type, id) => {
    const option = filterOptions[type].find((opt) => opt.id === id);
    return !getFilterValue(type) && id === 0 ? labels[type] : option?.label || "전체";
  };

  return (
    <div
      className="flex gap-4 items-center relative w-full flex-wrap md:flex-nowrap md:ml-6 lg:ml-12"
      ref={dropdownRef}
    >
      {/* Desktop 드롭다운 */}
      {visibleFilters.map((type) => {
        const selectedId = getFilterValue(type);
        return (
          <div key={type} className="relative hidden md:block">
            <button
              onClick={() => setOpenFilter(openFilter === type ? null : type)}
              className="flex items-center gap-2 h-[24px] text-white md:text-700-14 lg:text-700-16"
            >
              <span>{getLabelFromId(type, selectedId)}</span>
              {openFilter === type ? (
                <GoTriangleUp className="ml-1" />
              ) : (
                <GoTriangleDown className="ml-1" />
              )}
            </button>

            {openFilter === type && isSmOrLarger && (
              <ul className="absolute left-0 mt-2 bg-black border text-white w-[134px] z-10 max-h-60 overflow-auto">
                {filterOptions[type].map((item) => (
                  <li
                    key={item.id}
                    onClick={() => handleSelect(type, item.id)}
                    className={`hover:bg-gray-700 px-4 py-2 cursor-pointer ${
                      item.id === selectedId ? "bg-gray-700 font-bold" : ""
                    }`}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}

      {/* Mobile 아이콘 */}
      {visibleFilters.length > 0 && (
        <div
          className="flex justify-center items-center border border-gray-200 rounded-xs md:hidden cursor-pointer"
          style={{ width: iconSize, height: iconSize }}
          onClick={() => setIsBottomSheetOpen(true)}
        >
          <GiSettingsKnobs
            className="w-5 h-5 font-bold"
            style={{ transform: "rotate(90deg)" }}
          />
        </div>
      )}

      {/* Mobile BottomSheet */}
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
