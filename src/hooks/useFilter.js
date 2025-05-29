// FilterDropdown 쓰려고 만듦 - by. 성경

"use client";

import { useState } from "react";

export function useGalleryFilter() {
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
