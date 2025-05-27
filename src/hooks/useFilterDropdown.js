"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SM_WIDTH = 744;

export function useFilterDropdown(counts) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [openFilter, setOpenFilter] = useState(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isSmOrLarger, setIsSmOrLarger] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      const isSm = window.innerWidth >= SM_WIDTH;
      setIsSmOrLarger(isSm);
      if (isSm) {
        setIsBottomSheetOpen(false);
      } else {
        setOpenFilter(null);
      }
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
    if (id === 0) return 0;

    const map = {
      grade: counts.grade,
      genre: counts.genre,
      sale: counts.sale,
      method: counts.method,
    };

    const matchKey = `${type}Id`;
    const matched = map[type]?.find((item) => item[matchKey] === id);

    return matched?.count || 0;
  };

  const handleSelect = (filterType, value) => {
    const params = new URLSearchParams(searchParams);

    if (value === 0) {
      params.delete(filterType);
    } else {
      params.set(filterType, String(value));
    }

    setOpenFilter(null);
    setIsBottomSheetOpen(false);
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    dropdownRef,
    openFilter,
    setOpenFilter,
    isBottomSheetOpen,
    setIsBottomSheetOpen,
    isSmOrLarger,
    getFilterValue,
    getCount,
    handleSelect,
  };
}
