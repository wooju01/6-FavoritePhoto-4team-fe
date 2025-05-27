"use client";

import React from "react";
import { MdArrowDropDown } from "react-icons/md";
import clsx from "clsx";
import useSort from "@/hooks/useSort";

const options = ["낮은 가격순", "높은 가격순", "최신순"]; // 정렬 옵션

export default function Sort() {
  const { isOpen, order, sortRef, toggle, handleSelect } = useSort(); // hooks에서 만든 함수들 가져옴

  return (
    <div ref={sortRef} className="relative z-20">
      <button
        onClick={toggle}
        className="w-32 md:w-[140px] lg:w-44 lg:h-12 h-9 md:h-11 px-3.5 lg:px-5 py-2.5 lg:py-3 flex items-center justify-between border border-grey-200 rounded-xs cursor-pointer"
      >
        <span className="text-400-12 md:text-400-14 lg:text-400-16 text-nowrap">
          {order}
        </span>
        <MdArrowDropDown
          className={clsx(isOpen && "rotate-180", "duration-200")}
        />
      </button>

      {isOpen && (
        <div className="rounded-[2px] w-32 md:w-[140px] lg:w-44 border-1 flex flex-col bg-my-black200 gap-[15px] py-[15px] text-400-12 md:text-400-14 lg:text-400-16 absolute left-0 mt-2 bg-my-black">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => handleSelect(opt)}
              className="px-[20px] cursor-pointer"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
