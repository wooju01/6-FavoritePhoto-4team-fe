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

  const getQueryString = () => window.location.search;

  const fetchFilterData = async () => {
    setLoading(true);
    try {
      // window.location.search 쿼리 파싱
      const params = new URLSearchParams(getQueryString());
      const filters = {};

      for (const [key, value] of params.entries()) {
        filters[key] = value;
      }

      // storeService의 getAllStoreCards 호출 (withCounts=true)
      const data = await storeService.getAllStoreCards(filters, true);

      console.log("API response data:", data);
      setCounts(data.counts ?? {});
      setFilteredCount(
        data.counts?.sale?.reduce((acc, item) => acc + item.count, 0) ?? 0
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchFilterData();
    }

    const onPopState = () => {
      if (isOpen) fetchFilterData();
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
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
        />
      )}
    </>
  );
}
