"use client";

import { useState, useEffect } from "react";
import { useFilterSheet } from "@/hooks/useFilterSheet";
import { getMyCardsOnSale } from "@/lib/api/api-users";
import BottomSheet from "./BottomSheet";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

export default function SaleGalleryFilter() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    counts,
    filteredCount,
    loading,
    fetchCounts,
    fetchFilteredCount,
  } = useFilterSheet(getMyCardsOnSale);

  useEffect(() => {
    if (isOpen) {
      fetchCounts();
    }
  }, [isOpen]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 744 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex justify-center items-end"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(3px)",
          }}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md">
            <BottomSheet
              filters={["grade", "genre", "saleType", "sale"]}
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
