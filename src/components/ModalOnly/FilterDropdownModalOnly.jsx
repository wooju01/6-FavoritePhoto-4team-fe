"use client";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState, useEffect } from "react";

export default function FilterDropdownModalOnly({
  option,
  isOpen,
  onToggle,
  onClose,
  onSelect,
  selectedId,
}) {
  const { key, label, options } = option;

  const selectedOption = options.find(
    (opt) => String(opt.id) === String(selectedId)
  );
  const value =
    selectedOption && selectedOption.label !== "전체"
      ? selectedOption.label
      : label;

  const handleChoice = (opt) => {
    onSelect?.(opt.label === "전체" ? null : opt.id); // 상위에서 상태 변경
    onClose?.();
  };

  return (
    <div className="relative z-30">
      <button onClick={onToggle} className="flex items-center gap-2.5">
        <span className="text-700-14">{value}</span>
        <IoMdArrowDropdown />
      </button>

      {isOpen && (
        <div className="absolute flex flex-col mt-2 border border-white bg-my-black z-50">
          {options.map((opt, index) => (
            <button
              key={index}
              onClick={() => handleChoice(opt)}
              className="text-400-16 text-start text-nowrap px-4 py-2 hover:bg-gray-700"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
