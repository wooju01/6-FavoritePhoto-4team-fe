"use client";
import React, { useRef, useEffect } from "react";
import Link from "next/link";

const DropdownNavi = ({ user, open, onClose }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-0 w-[260px] bg-gray-500 shadow-lg z-50 py-0 px-0 min-w-[180px] "
      style={{ borderRadius: 0 }}
    >
      <div className="mb-6 mt-[20px] ml-5">
        <div className="text-700-18 text-white mb-[20px]">
          안녕하세요, {user.nickname}님!
        </div>
        <div className="flex justify-between text-300-12 text-gray-200 w-[200px]">
          <span className="text-gray-300">보유 포인트</span>
          <span className="text-main">{user.point.toLocaleString()} P</span>
        </div>
      </div>
      <hr className="border-gray-400 mb-4 w-full" />
      <nav className="flex flex-col gap-4 ml-5 mb-6">
        <Link href="/home" className="text-700-14 text-white hover:text-main">
          마켓플레이스
        </Link>
        <Link
          href="/my-gallery"
          className="text-700-14 text-white hover:text-main"
        >
          마이갤러리
        </Link>
        <Link
          href="/for-sale"
          className="text-700-14 text-white hover:text-main"
        >
          판매 중인 포토카드
        </Link>
      </nav>
    </div>
  );
};

export default DropdownNavi;
