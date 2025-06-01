"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { getMyCardsOnSale } from "@/lib/api/api-users";
import BottomSheet from "./BottomSheet";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

// 프론트 키 → 서버 키
const filterKeyMap = {
  sale: "saleType",
  status: "saleStatus",
  grade: "grade",
  genre: "genre",
};


export default function SaleGalleryFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [counts, setCounts] = useState({
    grade: [],
    genre: [],
    sale: [],
    status: [],
  });
  const [filteredCount, setFilteredCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  const parseFiltersFromSearch = () => {
    const result = {};
    for (const [key, value] of searchParams.entries()) {
      result[key] = value.split(",");
    }
    return result;
  };

  const fetchCounts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMyCardsOnSale({}, true);

      setCounts({
        grade: data.counts?.grade || [],
        genre: data.counts?.genre || [],
        sale: data.counts?.saleType || [],
        status: data.counts?.saleStatus || [],
      });

      const totalFromSale = (data.counts?.saleType || []).reduce((acc, item) => acc + item.count, 0);
      setFilteredCount(
        totalFromSale ||
          data.pagination?.totalItems ||
          data.totalItems ||
          0
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFilteredCount = useCallback(async (rawFilters) => {
    setLoading(true);
    try {
      const filters =
        typeof rawFilters.grade === "string"
          ? {
              grade: rawFilters.grade?.split(",").map(Number) || [],
              genre: rawFilters.genre?.split(",").map(Number) || [],
              sale: rawFilters.sale?.split(",") || [],
              status: rawFilters.status?.split(",") || [],
            }
          : rawFilters;

      const query = {};
      for (const key in filters) {
        if (Array.isArray(filters[key]) && filters[key].length > 0) {
          const backendKey = filterKeyMap[key] || key;
          query[backendKey] = filters[key].join(",");
        }
      }

      const data = await getMyCardsOnSale(query, true);

      const totalFromSale = (data.counts?.saleType || []).reduce((acc, item) => acc + item.count, 0);
      setFilteredCount(
        totalFromSale ||
          data.pagination?.totalItems ||
          data.totalItems ||
          0
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchCounts();

      const filtersFromURL = parseFiltersFromSearch();
      if (Object.keys(filtersFromURL).length > 0) {
        fetchFilteredCount(filtersFromURL);
      }
    }
  }, [isOpen, fetchCounts, fetchFilteredCount]);

  return (
    <>
      {!isOpen && (
        <button
          className="md:hidden h-9 w-9 flex justify-center items-center border rounded-xs"
          onClick={() => setIsOpen(true)}
          aria-label="판매 필터 열기"
        >
          <HiAdjustmentsHorizontal className="w-5 h-5" />
        </button>
      )}

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex justify-center items-end bg-black/40 backdrop-blur-sm"
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md">
            <BottomSheet
              filters={["grade", "genre", "sale", "status"]}
              counts={counts}
              filteredCount={filteredCount}
              loading={loading}
              onClose={() => setIsOpen(false)}
              onFilterChange={fetchFilteredCount}
            />
          </div>
        </div>
      )}
    </>
  );
}
