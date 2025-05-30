"use client";

import React from "react";
import Image from "next/image";
import example from "@/assets/example.svg";
import favicon from "@/assets/favicon.svg";
import StatusTag from "../tag/StatusTag";
import GradeTag from "../tag/GradeTag";
import soldout from "@/assets/soldout.svg";

const genreMap = {
  1: "여행",
  2: "풍경",
  3: "인물",
  4: "사물",
};

export default function ForSale({
  name,
  image,
  gradeId,
  genre,
  nickname,
  remainingQuantity,
  initialPrice,
  status, // 'AVAILABLE' | 'PENDING' | 'SOLDOUT'
}) {
  const getStatusType = (status) => {
    if (status === "AVAILABLE") return "sale";
    if (status === "PENDING") return "pending";
    return null;
  };

  const isSoldOut = status === "SOLDOUT";
  const statusType = getStatusType(status);

  return (
    <div className="bg-my-black w-full px-2 py-2 md:px-4 md:py-4 lg:px-10 lg:py-10 border border-gray-800">
      {/* 이미지 */}
      <div className="w-full aspect-[4/3] relative mb-3 md:mb-5">
        <Image
          src={image || example}
          alt="나의 판매 카드 이미지"
          fill
          className={`object-cover transition-all duration-300 ${
            isSoldOut ? "brightness-[0.4]" : ""
          }`}
        />
        {/* 상태 태그 (AVAILABLE, PENDING)*/}
        {statusType && (
          <>
            <div className="absolute top-1 left-1 block md:hidden">
              <StatusTag type={statusType} size="sm" />
            </div>
            <div className="absolute top-2 left-2 hidden md:block lg:hidden">
              <StatusTag type={statusType} size="md" />
            </div>
            <div className="absolute top-2 left-2 hidden lg:block">
              <StatusTag type={statusType} size="lg" />
            </div>
          </>
        )}

        {/* SOLDOUT  */}
        {isSoldOut && (
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-[112px] md:w-[200px] lg:w-[230px]">
              <Image
                src={soldout}
                alt="SOLD OUT"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* 제목 */}
      <h3 className="text-700-14 md:text-700-22 truncate mb-1 md:mb-2">
        {name}
      </h3>

      {/* 등급 · 장르 · 아티스트 */}
      <div className="flex justify-between items-center text-400-10 md:text-400-16">
        <div className="flex items-center gap-1.5">
          <p className="[&_*]:text-300-10 md:[&_*]:text-300-16">
            <GradeTag grade={gradeId} />
          </p>
          <span className="text-gray-400">|</span>
          <span className="text-gray-300">{genre || "-"}</span>
        </div>
        <div className="underline text-right">{nickname}</div>
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-700 my-2 md:my-4" />

      {/* 가격 · 잔여 */}
      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-300 text-300-10 md:text-300-16">가격</span>
          <span className="text-400-10 md:text-400-18">{initialPrice} P</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300 text-300-10 md:text-300-16">잔여</span>
          <span className="text-400-10 md:text-400-18">
            {remainingQuantity}
          </span>
        </div>
      </div>

      {/* 로고 이미지 */}
      <div className="hidden md:flex justify-center mt-4">
        <Image src={favicon} alt="최애" width={85} height={85} />
      </div>
    </div>
  );
}
