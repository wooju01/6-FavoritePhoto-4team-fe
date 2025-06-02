"use client";

import React from "react";
import Image from "next/image";
import GradeTag from "../tag/GradeTag";
import example from "@/assets/example.svg";
import favicon from "@/assets/favicon.svg";

const baseUrls = {
  local: "http://localhost:3002",
  production: "https://six-favoritephoto-4team-be.onrender.com",
};

const baseUrl =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? baseUrls.local
    : baseUrls.production;

export default function MyCard({
  name,
  image,
  gradeId,
  genre,
  nickname,
  totalQuantity,
  initialPrice,
}) {
  const getImageUrl = (image) => {
    if (!image) return example;
    if (image.startsWith("http")) return image;
    return `${baseUrl}${image}`;
  };

  return (
    <div className="bg-gray-500 w-full px-2 py-2 md:px-4 md:py-4 lg:px-10 lg:py-10 border border-gray-800 rounded-xs">
      {/* 이미지 */}
      <div className="w-full aspect-[4/3] relative mb-3 md:mb-5">
        <Image
          src={getImageUrl(image)}
          alt="마이 갤러리 이미지"
          fill
          className="object-cover"
        />
      </div>

      {/* 제목 */}
      <h3 className="text-700-14 md:text-700-22 truncate mb-1 md:mb-2">
        {name}
      </h3>

      {/* 등급 · 장르 · 아티스트 */}
      <div className="flex justify-between items-center text-400-10 md:text-400-16">
        {/* 왼쪽: 등급 + 장르 */}
        <div className="flex items-center gap-1.5">
          <p className="[&_*]:text-300-10 md:[&_*]:text-300-16">
            <GradeTag grade={gradeId} />
          </p>
          <span className="text-gray-400">|</span>
          <span className="text-gray-300">{genre || "-"}</span>
        </div>

        {/* 오른쪽: 아티스트 */}
        <div className="underline text-right">{nickname}</div>
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-700 my-2 md:my-4" />

      {/* 가격 · 수량 */}
      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-300 text-300-10 md:text-300-16">가격</span>
          <span className="text-400-10 md:text-400-18">{initialPrice} P</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300 text-300-10 md:text-300-16">수량</span>
          <span className="text-400-10 md:text-400-18">{totalQuantity}</span>
        </div>
      </div>

      {/* 로고 이미지 */}
      <div className="hidden md:flex justify-center mt-4">
        <Image src={favicon} alt="최애" width={85} height={85} />
      </div>
    </div>
  );
}
