"use client";

import { useState, useEffect } from "react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import BottomSheet from "./BottomSheet";
import { storeService } from "@/lib/api/api-store";

export default function FilterSheetControls() {
  const [isOpen, setIsOpen] = useState(false);
  const [counts, setCounts] = useState({
    grade: [],
    genre: [],
    sale: [],
    method: [],
  });
  const [filteredCount, setFilteredCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    grade: [],
    genre: [],
    sale: [],
    status: [],
  });

  // 필터 문자열을 숫자 배열 등으로 파싱
  const parseFilters = (filtersObj) => {
    const parsed = {};
    if (filtersObj.grade) parsed.grade = filtersObj.grade.split(",").map(Number);
    if (filtersObj.genre) parsed.genre = filtersObj.genre.split(",").map(Number);
    if (filtersObj.sale) parsed.sale = filtersObj.sale.split(",");
    if (filtersObj.status) parsed.status = filtersObj.status.split(",");
    return parsed;
  };

  // 1. counts 초기 데이터만 가져오는 함수
  const fetchCountsData = async () => {
    setLoading(true);
    try {
      // 필터 없이 전체 counts 정보만 불러오기
      const data = await storeService.getAllStoreCards({}, true);
      setCounts(data.counts ?? {});
      // 전체 필터 적용 전 사진 개수도 세팅
      const totalCount = data.counts?.sale?.reduce((acc, item) => acc + item.count, 0) ?? 0;
      setFilteredCount(totalCount);
    } catch (err) {
      console.error("초기 counts 데이터 불러오기 오류:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. 필터 조건에 맞는 filteredCount만 가져오는 함수
  const fetchFilteredCount = async (rawFilters) => {
    setLoading(true);
    try {
      const finalFilters =
        typeof rawFilters.grade === "string" || typeof rawFilters.sale === "string"
          ? parseFilters(rawFilters)
          : rawFilters;

      const query = {};
      if (finalFilters.grade?.length) query.grade = finalFilters.grade.join(",");
      if (finalFilters.genre?.length) query.genre = finalFilters.genre.join(",");
      if (finalFilters.sale?.length) query.sale = finalFilters.sale.join(",");
      if (finalFilters.status?.length) query.status = finalFilters.status.join(",");

      const data = await storeService.getAllStoreCards(query, true);
      // counts는 업데이트하지 않고 filteredCount만 업데이트
      const totalCount = data.counts?.sale?.reduce((acc, item) => acc + item.count, 0) ?? 0;
      setFilteredCount(totalCount);
    } catch (err) {
      console.error("필터링된 개수 불러오기 오류:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCountsData();  // BottomSheet 열 때 counts 초기 세팅
    }

    const onPopState = () => {
      if (isOpen) fetchCountsData();
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [isOpen]);

  return (
    <>
      {!isOpen && (
        <button
          className="md:hidden h-9 w-9 flex justify-center items-center border rounded-xs"
          onClick={() => setIsOpen(true)}
          aria-label="필터 열기"
        >
          <HiAdjustmentsHorizontal className="w-5 h-5" />
        </button>
      )}

      {isOpen && (
        <BottomSheet
          counts={counts} 
          filteredCount={filteredCount} 
          loading={loading}
          onClose={() => setIsOpen(false)}
          onFilterChange={(newFilters) => {
            const parsed = parseFilters(newFilters);
            setFilters(parsed);
            fetchFilteredCount(parsed);  
          }}
        />
      )}
    </>
  );
}
