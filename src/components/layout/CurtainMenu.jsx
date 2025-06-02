"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";

const menuItems = [
  { href: "/home", label: "마켓플레이스" },
  { href: "/my-gallery", label: "마이갤러리" },
  { href: "/for-my-sales", label: "판매 중인 포토카드" },
];

const CurtainMenu = ({ user, onClose }) => {
  const { logout } = useAuth();
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    if (onClose) onClose();
    // 필요시 리다이렉트 등 추가
  };

  // Link 클릭 시 메뉴 닫힘
  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex">
      <div className="w-[260px] h-full bg-gray-500 shadow-lg flex flex-col animate-slideInLeft">
        <div className="mb-6 mt-[40px] ml-5">
          <div className="text-700-18 text-white mb-[20px] ">
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
        <nav className="flex flex-col gap-4 ml-5">
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
        <button
          onClick={handleLogout}
          className="text-400-14 text-gray-400 ml-5 mt-auto mb-[43px] block text-left"
        >
          로그아웃
        </button>
      </div>
      <button
        className="flex-1 cursor-pointer bg-transparent border-0 p-0 m-0"
        aria-label="메뉴 닫기"
        tabIndex={0}
        onClick={onClose}
        style={{ outline: "none" }}
      />
    </div>
  );
};

export default CurtainMenu;
// 개선 사항:
// 1. 메뉴 항목을 배열로 관리,맵으로 렌더링
// 2. Link 클릭 시 onClose 호출, 자동으로 메뉴 닫힘
// 3. 로그아웃 후 onClose 호출 자동으로 메뉴 닫힘
// 4. user.point 안전 처리 (null/undefined 방지)
// 5. 오버레이 닫기 영역을 button으로 변경
// 6. a 태그 대신 button 추가
