"use client";
import { useState } from "react";
import FilterDropdownModalOnly from "./FilterDropdownModalOnly";

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
];

export default function FilterControlsModalOnly({ onChange }) {
  const [openKey, setOpenKey] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleToggle = (key) => {
    setOpenKey((prevKey) => (prevKey === key ? null : key));
  };

  const handleClose = () => {
    setOpenKey(null);
  };

  const handleSelect = (key, id) => {
    if (key === "grade") {
      setSelectedGrade(id);
    } else if (key === "genre") {
      setSelectedGenre(id);
    }

    // 상위 컴포넌트에 알려줌
    onChange?.(key, id);
  };

  return (
    <>
      {filterOptions.map((option) => (
        <FilterDropdownModalOnly
          key={option.key}
          option={option}
          isOpen={openKey === option.key}
          onToggle={() => handleToggle(option.key)}
          onClose={handleClose}
          onSelect={(id) => handleSelect(option.key, id)}
          selectedId={
            option.key === "grade"
              ? selectedGrade
              : option.key === "genre"
              ? selectedGenre
              : null
          }
        />
      ))}
    </>
  );
}
