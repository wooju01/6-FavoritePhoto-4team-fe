"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";

import FilterTab from "./FilterTab";
import FilterPanelGrade from "./FilterPanelGrade";
import FilterPanelGenre from "./FilterPanelGenre";
import FilterPanelSale from "./FilterPanelSale";
import FilterPanelStatus from "./FilterPanelStatus";

export default function BottomSheet({
  filters = ["grade", "genre", "sale", "method"],
  counts = { grade: [], genre: [], sale: [], method: [] },
  loading = false,
  filteredCount,
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
    return val.split(",").map((v) => {
      // sale 필터는 문자값도 올 수 있으니 일단 그대로 반환
      if (key === "sale") return v;
      return Number(v);
    });
  };

  const [selectedGrade, setSelectedGrade] = useState(getInitialValues("grade"));
  const [selectedGenre, setSelectedGenre] = useState(getInitialValues("genre"));
  const [selectedSale, setSelectedSale] = useState(getInitialValues("sale"));
  const [selectedStatuses, setSelectedStatuses] = useState(
    getInitialValues("status")
  );

  // 필터 활성 여부
  const isFilterActive =
    selectedGrade.length > 0 ||
    selectedGenre.length > 0 ||
    selectedSale.length > 0 ||
    selectedStatuses.length > 0;

  // 리셋: 모두 빈 배열로 초기화
  const handleReset = () => {
    setSelectedGrade([]);
    setSelectedGenre([]);
    setSelectedSale([]);
    setSelectedStatuses([]);
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
    if (selectedStatuses.length > 0) {
      params.set("status", selectedStatuses.join(","));
    } else {
      params.delete("status");
    }

    router.push(`${pathname}?${params.toString()}`);
    if (onClose) onClose();
  };

  // 등급 옵션과 counts 매칭
  const gradeOptions = [
    { label: "COMMON", value: 1 },
    { label: "RARE", value: 2 },
    { label: "SUPER RARE", value: 3 },
    { label: "LEGENDARY", value: 4 },
  ];
  const normalizedGrades = Array.isArray(counts.grade)
    ? counts.grade.reduce((acc, item) => {
        const option = gradeOptions.find((opt) => opt.value === item.gradeId);
        if (option) acc[option.label] = item.count;
        return acc;
      }, {})
    : counts.grade;

  // 장르 옵션과 counts 매칭
  const genreOptions = [
    { label: "여행", value: 1 },
    { label: "풍경", value: 2 },
    { label: "인물", value: 3 },
    { label: "사물", value: 4 },
  ];
  const normalizedGenres = Array.isArray(counts.genre)
    ? counts.genre.reduce((acc, item) => {
        const option = genreOptions.find((opt) => opt.value === item.genreId);
        if (option) acc[option.value] = item.count;
        return acc;
      }, {})
    : counts.genre;
  console.log("BottomSheet counts prop:", counts);

  // 판매 상태 옵션과 counts 매칭 (status 문자열 매핑)
  const saleOptions = [
    { label: "AVAILABLE", value: "AVAILABLE" },
    { label: "SOLDOUT", value: "SOLDOUT" },
  ];
  const normalizedSales = Array.isArray(counts.sale)
    ? counts.sale.reduce((acc, item) => {
        acc[item.status] = item.count;
        return acc;
      }, {})
    : counts.sale;

  // selectedGrade, selectedGenre ... 은 이미 state에 있음

  const calcFilteredCount = () => {
    if (!counts) return 0;

    // grade 선택된 것들의 총합
    const gradeCountSum = selectedGrade.length
      ? selectedGrade.reduce((acc, val) => {
          const found = counts.grade?.find((g) => g.gradeId === val);
          return acc + (found?.count ?? 0);
        }, 0)
      : 0;

    // genre 선택된 것들의 총합
    const genreCountSum = selectedGenre.length
      ? selectedGenre.reduce((acc, val) => {
          const found = counts.genre?.find((g) => g.genreId === val);
          return acc + (found?.count ?? 0);
        }, 0)
      : 0;

    // sale 선택된 것들의 총합
    const saleCountSum = selectedSale.length
      ? selectedSale.reduce((acc, val) => {
          const foundCount =
            counts.sale?.find((s) => s.status === val)?.count ?? 0;
          return acc + foundCount;
        }, 0)
      : 0;

    // status 선택된 것들의 총합
    const statusCountSum = selectedStatuses.length
      ? selectedStatuses.reduce((acc, val) => {
          const foundCount = counts.status?.[val] ?? 0;
          return acc + foundCount;
        }, 0)
      : 0;

    // 필터별로 선택된 것들의 총합 배열 (0인 필터는 제외)
    const sums = [
      gradeCountSum,
      genreCountSum,
      saleCountSum,
      statusCountSum,
    ].filter((sum) => sum > 0);

    if (sums.length === 0) {
      // 아무 필터도 선택 안했으면 전체 카드 수 (예: sale 전체 합)
      return counts.sale?.reduce((acc, item) => acc + item.count, 0) ?? 0;
    }

    // 여러 필터가 선택된 경우, 교집합 추정값으로 최소값 반환
    return Math.min(...sums);
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

        <FilterTab
          selected={selectedTab}
          onChange={setSelectedTab}
          filters={filters}
        />

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

        {selectedTab === "status" && filters.includes("status") && (
          <FilterPanelStatus
            statuses={counts.status}
            selectedStatuses={selectedStatuses}
            onSelectStatuses={setSelectedStatuses}
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
            ? `${calcFilteredCount()}개 포토보기`
            : "포토보기"}
        </button>
      </div>
    </div>
  );
}
