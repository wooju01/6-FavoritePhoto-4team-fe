"use client";
import { useState } from "react";
import FilterDropdown from "../FllterDropdown/FilterDropdown";

const filterOptions = [
  {
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
  {
    key: "genre",
    label: "장르",
    options: [
      { id: 0, label: "전체" },
      { id: 1, label: "여행" },
      { id: 2, label: "풍경" },
      { id: 3, label: "인물" },
      { id: 4, label: "사물" },
    ],
  },
  {
    key: "sale",
    label: "판매상태",
    options: [
      { id: 0, label: "전체" },
      { id: "AVAILABLE", label: "판매중" },
      { id: "SOLDOUT", label: "판매완료" },
    ],
  },
  // {
  //   key: "method",
  //   label: "교환상태",
  //   options: [
  //     { id: 0, label: "전체" },
  //     { id: 1, label: "교환중" },
  //     { id: 2, label: "교환완료" },
  //   ],
  // },
];

export default function FilterControls() {
  const [openKey, setOpenKey] = useState(null);

  const handleToggle = (key) => {
    setOpenKey((prevKey) => (prevKey === key ? null : key));
  };

  const handleClose = () => {
    setOpenKey(null);
  };

  return (
    <>
      {filterOptions.map((option) => (
        <FilterDropdown
          key={option.key}
          option={option}
          isOpen={openKey === option.key}
          onToggle={() => handleToggle(option.key)}
          onClose={handleClose} // ✅ 드롭다운 외부에서 닫기 함수 전달
        />
      ))}
    </>
  );
}
