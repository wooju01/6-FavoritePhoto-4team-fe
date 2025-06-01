// FilterDropdown 쓰려고 만듦 - by. 성경

"use client";

import { useState } from "react";

// 필터 2개
export function use2Filter() {
  const [isOpen, setIsOpen] = useState(null);

  const toggle = (key) => {
    setIsOpen((prev) => (prev === key ? null : key));
  };

  const close = () => setIsOpen(null);

  const filterOptions = {
    등급: {
      key: "grade",
      label: "등급",
      options: [
        { id: 0, label: "전체" },
        { id: 1, label: "COMMON" },
        { id: 2, label: "RARE" },
        { id: 3, label: "SUPER RARE" },
        { id: 4, label: "LEGENDARY" },
      ],
    },
    장르: {
      key: "genre",
      label: "장르",
      options: [
        { id: 0, label: "전체" },
        { id: 1, label: "풍경" },
        { id: 2, label: "여행" },
        { id: 3, label: "인물" },
        { id: 4, label: "사물" },
      ],
    },
  };

  return { isOpen, toggle, close, filterOptions };
}

// 필터 4개
export function use4Filter() {
  const [isOpen, setIsOpen] = useState(null);

  const toggle = (key) => {
    setIsOpen((prev) => (prev === key ? null : key));
  };

  const close = () => setIsOpen(null);

  const filterOptions = {
    등급: {
      key: "grade",
      label: "등급",
      options: [
        { id: 0, label: "전체" },
        { id: 1, label: "COMMON" },
        { id: 2, label: "RARE" },
        { id: 3, label: "SUPER RARE" },
        { id: 4, label: "LEGENDARY" },
      ],
    },
    장르: {
      key: "genre",
      label: "장르",
      options: [
        { id: 0, label: "전체" },
        { id: 1, label: "풍경" },
        { id: 2, label: "여행" },
        { id: 3, label: "인물" },
        { id: 4, label: "사물" },
      ],
    },
    판매방법: {
      key: "saleType",
      label: "판매방법",
      options: [
        { id: 0, label: "전체" },
        { id: "AVAILABLE", label: "판매" },
        { id: "PENDING", label: "교환" },
      ],
    },
    매진여부: {
      key: "sale",
      label: "매진 여부",
      options: [
        { id: 0, label: "전체" },
        { id: "AVAILABLE", label: "판매 중" },
        { id: "SOLDOUT", label: "판매 완료" },
      ],
    },
  };

  return { isOpen, toggle, close, filterOptions };
}
