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

  const parseFilters = (filtersObj) => {
    const parsed = {};
    if (filtersObj.grade)
      parsed.grade = filtersObj.grade.split(",").map(Number);
    if (filtersObj.genre)
      parsed.genre = filtersObj.genre.split(",").map(Number);
    if (filtersObj.sale) parsed.sale = filtersObj.sale.split(",");
    if (filtersObj.status) parsed.status = filtersObj.status.split(",");
    return parsed;
  };

  const fetchCountsData = async () => {
    setLoading(true);
    try {
      const data = await storeService.getAllStoreCards({}, true);
      setCounts(data.counts ?? {});
      const totalCount =
        data.counts?.sale?.reduce((acc, item) => acc + item.count, 0) ?? 0;
      setFilteredCount(totalCount);
    } catch (err) {
      console.error("초기 counts 데이터 불러오기 오류:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredCount = async (rawFilters) => {
    setLoading(true);
    try {
      const finalFilters =
        typeof rawFilters.grade === "string" ||
        typeof rawFilters.sale === "string"
          ? parseFilters(rawFilters)
          : rawFilters;

      const query = {};
      if (finalFilters.grade?.length)
        query.grade = finalFilters.grade.join(",");
      if (finalFilters.genre?.length)
        query.genre = finalFilters.genre.join(",");
      if (finalFilters.sale?.length) query.sale = finalFilters.sale.join(",");
      if (finalFilters.status?.length)
        query.status = finalFilters.status.join(",");

      const data = await storeService.getAllStoreCards(query, true);
      const totalCount =
        data.counts?.sale?.reduce((acc, item) => acc + item.count, 0) ?? 0;
      setFilteredCount(totalCount);
    } catch (err) {
      console.error("필터링된 개수 불러오기 오류:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCountsData();
    }
    const onPopState = () => {
      if (isOpen) fetchCountsData();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [isOpen]);

  // 화면 크기 감지해서 744px 이상이면 자동 닫기
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 744px)");
    const handleResize = (e) => {
      if (e.matches) {
        setIsOpen(false);
      }
    };
    if (mediaQuery.matches) {
      setIsOpen(false);
    }
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleResize);
      return () => mediaQuery.removeEventListener("change", handleResize);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleResize);
      return () => mediaQuery.removeListener(handleResize);
    }
  }, []);

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
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0  z-50 flex justify-center items-end"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(3px)",
          }}
          aria-modal="true"
          role="dialog"
        >
          {/* BottomSheet 내부 클릭 시 외부로 이벤트 전달 방지 */}
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md">
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
          </div>
        </div>
      )}
    </>
  );
}
