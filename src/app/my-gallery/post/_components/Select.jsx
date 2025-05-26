"use client";

import React from "react";
import { MdArrowDropDown } from "react-icons/md";
import clsx from "clsx";
import useDropdown from "@/hooks/useDrowdown";
import ErrorText from "./ErrorText";

export default function Select({ type, options, onChange, error }) {
  const { isOpen, selected, dropdownRef, toggle, handleSelect } =
    useDropdown("");

  const handleToggle = () => {
    toggle();
  };

  const handleOptionClick = (option) => {
    handleSelect(option);
    if (onChange) onChange(option);
  };

  const isPlaceholder = !selected;

  return (
    <div
      ref={dropdownRef}
      className="bg-transparent flex flex-col gap-1 w-full"
    >
      <label className="text-700-16 lg:text-700-20 mb-2.5">{type}</label>

      <button
        type="button"
        onClick={handleToggle}
        className={clsx(
          error ? "border-my-red" : "border-gray-200",
          "focus:outline-none border  rounded-[2px] px-5 py-[18px] w-full text-400-14 lg:text-400-16 cursor-pointer h-[55px] lg:h-15 relative flex justify-between items-center mb-2"
        )}
      >
        <div
          className={clsx(
            isPlaceholder && "text-gray-200 text-300-14 lg:text-300-16"
          )}
        >
          {isPlaceholder
            ? `${type}${type === "등급" ? "을" : "를"} 선택해 주세요`
            : selected}
        </div>
        <MdArrowDropDown
          className={clsx(
            isOpen && "rotate-180 duration-200",
            "w-6 h-6 lg:w-7 lg:h-7"
          )}
        />
      </button>

      <ErrorText error={error} />

      {isOpen && (
        <div className="border border-gray-200 rounded-[2px] px-5 flex flex-col gap-5 h-[192px] justify-center text-400-14 lg:text-400-16">
          {options.map((opt) => (
            <div
              key={opt.id}
              onClick={() => handleOptionClick(opt.name)}
              className="cursor-pointer"
            >
              {opt.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
