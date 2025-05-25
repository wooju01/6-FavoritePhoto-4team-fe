"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";

import FilterTab from "./FilterTab";
import FilterPanelGrade from "./FilterPanelGrade";
import FilterPanelGenre from "./FilterPanelGenre";
import FilterPanelSale from "./FilterPanelSale";
import FilterPanelMethod from "./FilterPanelMethod";

export default function BottomSheet({
  filters = ["grade", "genre", "sale", "method"],
  counts = { grade: {}, genre: {}, sale: {}, method: {} },
  filteredCount = 0,
  loading = false,
  onClose,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedTab, setSelectedTab] = useState("grade");

  // 초기값을 쿼리에서 배열로 가져오기 (없으면 빈 배열)
const getInitialValues = (key) => {
  const val = searchParams.get(key);
  if (!val) return [];
  return val.split(",").map(Number);
};



  const [selectedGrade, setSelectedGrade] = useState(getInitialValues("grade"));
  const [selectedGenre, setSelectedGenre] = useState(getInitialValues("genre"));
  const [selectedSale, setSelectedSale] = useState(getInitialValues("sale"));
  const [selectedMethod, setSelectedMethod] = useState(getInitialValues("method"));

  // 필터 활성 여부 (빈 배열이면 비활성)
  const isFilterActive =
    selectedGrade.length > 0 ||
    selectedGenre.length > 0 ||
    selectedSale.length > 0 ||
    selectedMethod.length > 0;

  // 리셋: 모두 빈 배열로 초기화
  const handleReset = () => {
    setSelectedGrade([]);
    setSelectedGenre([]);
    setSelectedSale([]);
    setSelectedMethod([]);
  };

  // 적용: 쿼리스트링 업데이트
  const handleApply = () => {
    const params = new URLSearchParams(searchParams);

    if (selectedGrade.length > 0) {
      params.set("grade", selectedGrade.join(","));
    } else {
      params.delete("grade");
    }

    if (selectedGenre.length > 0) {
      params.set("genre", selectedGenre.join(","));
    } else {
      params.delete("genre");
    }

    if (selectedSale.length > 0) {
      params.set("sale", selectedSale.join(","));
    } else {
      params.delete("sale");
    }

    if (selectedMethod.length > 0) {
      params.set("method", selectedMethod.join(","));
    } else {
      params.delete("method");
    }

    router.push(`${pathname}?${params.toString()}`);
    if (onClose) onClose();
  };

  return (
    <div className="fixed flex flex-col justify-between bottom-0 left-0 w-full h-120 bg-[#1B1B1B] text-white p-4 z-9000 border-t border-gray-700 rounded-t-2xl max-h-[70vh] overflow-auto">
      <div>
        <div className="relative text-center">
          <p className="text-lg font-bold text-400-16 text-gray-400">필터</p>
          <button
            onClick={onClose}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl text-gray-400 font-light cursor-pointer"
          >
            <IoClose />
          </button>
        </div>

        <FilterTab selected={selectedTab} onChange={setSelectedTab} filters={filters} />

        {selectedTab === "grade" && filters.includes("grade") && (
          <FilterPanelGrade
            grades={counts.grade}
            selectedGrade={selectedGrade}
            onSelectGrade={setSelectedGrade}
          />
        )}

        {selectedTab === "genre" && filters.includes("genre") && (
          <FilterPanelGenre
            counts={counts.genre}
            selectedGenres={selectedGenre}
            onSelectGenres={setSelectedGenre}
          />
        )}

        {selectedTab === "sale" && filters.includes("sale") && (
          <FilterPanelSale
            sales={counts.sale}
            selectedSale={selectedSale}
            onSelectSale={setSelectedSale}
          />
        )}

        {selectedTab === "method" && filters.includes("method") && (
          <FilterPanelMethod
            counts={counts.method}
            selectedMethods={selectedMethod}
            onSelectMethods={setSelectedMethod}
          />
        )}
      </div>

      <div className="flex items-center">
        <div
          className="flex items-center justify-center w-[54px] h-[54px] cursor-pointer"
          onClick={handleReset}
        >
          <RiResetLeftFill className="w-[21px] h-[21px]" />
        </div>

        <button
          className="w-full bg-yellow-400 text-black py-3 font-bold rounded disabled:opacity-50 cursor-pointer"
          onClick={handleApply}
          disabled={loading}
        >
          {loading
            ? "불러오는 중..."
            : isFilterActive
            ? `${filteredCount}개 포토보기`
            : "포토보기"}
        </button>
      </div>
    </div>
  );
}
