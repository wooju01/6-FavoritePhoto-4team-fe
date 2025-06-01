"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";

import FilterTab from "./FilterTab";
import FilterPanelGrade from "./FilterPanelGrade";
import FilterPanelGenre from "./FilterPanelGenre";
import FilterPanelSale from "./FilterPanelSale";
import FilterPanelSaleType from "./FilterPanelSaleType"; // ⬅️ 새로 만든 컴포넌트

export default function BottomSheet({
  filters = ["grade", "genre", "saleType", "sale"],
  counts = { grade: [], genre: [], saleType: [], sale: [] },
  loading = false,
  filteredCount,
  onClose,
  onFilterChange,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedTab, setSelectedTab] = useState("grade");

  const getInitialValues = (key) => {
    const val = searchParams.get(key);
    if (!val) return [];
    return val
      .split(",")
      .map((v) => (key === "sale" || key === "saleType" ? v : Number(v)));
  };

  const [selectedGrade, setSelectedGrade] = useState(getInitialValues("grade"));
  const [selectedGenre, setSelectedGenre] = useState(getInitialValues("genre"));
  const [selectedSale, setSelectedSale] = useState(getInitialValues("sale"));
  const [selectedSaleTypes, setSelectedSaleTypes] = useState(getInitialValues("saleType"));

  useEffect(() => {
    const filters = {};
    if (selectedGrade.length) filters.grade = selectedGrade.join(",");
    if (selectedGenre.length) filters.genre = selectedGenre.join(",");
    if (selectedSale.length) filters.sale = selectedSale.join(",");
    if (selectedSaleTypes.length) filters.saleType = selectedSaleTypes.join(",");

    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [selectedGrade, selectedGenre, selectedSale, selectedSaleTypes]);

  const handleReset = () => {
    setSelectedGrade([]);
    setSelectedGenre([]);
    setSelectedSale([]);
    setSelectedSaleTypes([]);
  };

  const handleApply = () => {
    const params = new URLSearchParams(searchParams);

    selectedGrade.length ? params.set("grade", selectedGrade.join(",")) : params.delete("grade");
    selectedGenre.length ? params.set("genre", selectedGenre.join(",")) : params.delete("genre");
    selectedSale.length ? params.set("sale", selectedSale.join(",")) : params.delete("sale");
    selectedSaleTypes.length
      ? params.set("saleType", selectedSaleTypes.join(","))
      : params.delete("saleType");

    router.push(`${pathname}?${params.toString()}`);
    if (onClose) onClose();
  };

  const gradeOptions = [
    { label: "COMMON", value: 1 },
    { label: "RARE", value: 2 },
    { label: "SUPER RARE", value: 3 },
    { label: "LEGENDARY", value: 4 },
  ];

  const genreOptions = [
    { label: "여행", value: 1 },
    { label: "풍경", value: 2 },
    { label: "인물", value: 3 },
    { label: "사물", value: 4 },
  ];

  const normalizedGrades = Array.isArray(counts.grade)
    ? counts.grade.reduce((acc, item) => {
        const option = gradeOptions.find((opt) => opt.value === item.gradeId);
        if (option) acc[option.label] = item.count;
        return acc;
      }, {})
    : counts.grade;

  const normalizedGenres = Array.isArray(counts.genre)
    ? counts.genre.reduce((acc, item) => {
        const option = genreOptions.find((opt) => opt.value === item.genreId);
        if (option) acc[option.value] = item.count;
        return acc;
      }, {})
    : counts.genre;

  const normalizedSales = Array.isArray(counts.sale)
    ? counts.sale.reduce((acc, item) => {
        acc[item.status] = item.count;
        return acc;
      }, {})
    : counts.sale;

  const normalizedSaleTypes = Array.isArray(counts.saleType)
    ? counts.saleType.reduce((acc, item) => {
        acc[item.status] = item.count;
        return acc;
      }, {})
    : counts.saleType;

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
            grades={normalizedGrades}
            selectedGrade={selectedGrade}
            onSelectGrade={setSelectedGrade}
          />
        )}

        {selectedTab === "genre" && filters.includes("genre") && (
          <FilterPanelGenre
            counts={normalizedGenres}
            selectedGenres={selectedGenre}
            onSelectGenres={setSelectedGenre}
          />
        )}

        {selectedTab === "sale" && filters.includes("sale") && (
          <FilterPanelSale
            sales={normalizedSales}
            selectedSale={selectedSale}
            onSelectSale={setSelectedSale}
          />
        )}

        {selectedTab === "saleType" && filters.includes("saleType") && (
          <FilterPanelSaleType
            saleTypes={normalizedSaleTypes}
            selectedSaleTypes={selectedSaleTypes}
            onSelectSaleTypes={setSelectedSaleTypes}
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
            : selectedGrade.length ||
              selectedGenre.length ||
              selectedSale.length ||
              selectedSaleTypes.length
            ? `${filteredCount}개 포토보기`
            : "포토보기"}
        </button>
      </div>
    </div>
  );
}
