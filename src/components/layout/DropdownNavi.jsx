"use client";
import React, { useRef, useEffect } from "react";
import Link from "next/link";

const menuItems = [
  { href: "/home", label: "마켓플레이스" },
  { href: "/my-gallery", label: "마이갤러리" },
  { href: "/for-my-sales", label: "판매 중인 포토카드" },
];

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

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

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
          <span className="text-main">
            {(user.point ?? 0).toLocaleString()} P
          </span>
        </div>
      </div>
      <hr className="border-gray-400 mb-4 w-full" />
      <nav className="flex flex-col gap-4 ml-5 mb-6">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-700-14 text-white hover:text-main"
            onClick={handleLinkClick}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default DropdownNavi;

//개선 사항
//1. 메뉴 항목을 배열로 관리 map으로 렌더링
//2. Link 클릭 시 onClose 호출
//3. user.point 안전하게 처리 (null/undefined 방지)
