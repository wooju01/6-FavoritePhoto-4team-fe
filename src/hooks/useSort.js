"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function useSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState("낮은 가격순"); // 정렬 옵션

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const sort = searchParams.get("orderBy");

    switch (sort) {
      case "price_desc":
        setOrder("높은 가격순");
        break;
      case "created_desc":
        setOrder("최신순");
        break;
      default:
        setOrder("낮은 가격순");
    }
  }, [searchParams]);

  const handleSelect = (option) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    const paramValue = getSortParam(option);

    if (paramValue === "price_asc") {
      currentParams.delete("orderBy"); // ✅ 기본값이므로 제거
    } else {
      currentParams.set("orderBy", paramValue);
    }

    router.replace(`?${currentParams.toString()}`, { scroll: false });

    close();
  };
  
  // orderBy param 변환
  function getSortParam(label = order) {
    switch (label) {
      case "낮은 가격순":
        return "price_asc";
      case "높은 가격순":
        return "price_desc";
      case "최신순":
        return "created_desc";
      default:
        return "price_asc";
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return { isOpen, order, sortRef, toggle, handleSelect, getSortParam };
}
