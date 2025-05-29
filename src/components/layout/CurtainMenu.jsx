"use client";
import React from "react";
import Link from "next/link";

const CurtainMenu = ({ user, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/80 flex">
    <div className="w-[260px] h-full bg-gray-500 shadow-lg flex flex-col animate-slideInLeft">
      <div className="mb-6 mt-[40px] ml-5">
        <div className="text-700-18 text-white mb-[20px] ">
          안녕하세요, {user.nickname}님!
        </div>
        <div className="flex justify-between text-300-12 text-gray-200 w-[200px]">
          <span className="text-gray-300">보유 포인트</span>
          <span className="text-main">{user.point.toLocaleString()} P</span>
        </div>
      </div>
      <hr className="border-gray-400 mb-4 w-full" />
      <nav className="flex flex-col gap-4 ml-5">
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
          href="/for-my-sales"
          className="text-700-14 text-white hover:text-main"
        >
          판매 중인 포토카드
        </Link>
      </nav>
      <Link
        href="/logout"
        className="text-400-14 text-gray-400  ml-5 mt-auto mb-[43px]"
        style={{ display: "block" }}
      >
        로그아웃
      </Link>
    </div>
    <div className="flex-1 cursor-pointer" onClick={onClose}></div>
  </div>
);

export default CurtainMenu;
