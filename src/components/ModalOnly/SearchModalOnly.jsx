"use client";
import React, { useState } from "react";
import Image from "next/image";
import searchIcon from "@/assets/search.svg";

export default function SearchModalOnly({
  value,
  onChange,
  onSearch,
  placeholder,
}) {
  const [keyword, setKeyword] = useState(value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(keyword);
    }
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
    onChange?.(e);
  };

  return (
    <div className="relative w-full h-11 md:w-52 md:h-11 lg:w-[320px] lg:h-12">
      <input
        type="text"
        value={keyword}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? "검색"}
        className="w-full h-full px-4 py-3 pr-10 rounded-xs border border-gray-200 bg-my-black text-white placeholder-gray-400 placeholder:text-300-14 placeholder:lg:text-300-16 outline-none"
      />
      <div className="absolute right-5 top-6 -translate-y-1/2 w-5 h-5">
        <Image src={searchIcon} alt="검색" width={20} height={20} />
      </div>
    </div>
  );
}
