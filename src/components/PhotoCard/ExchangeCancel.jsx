"use client";

import React from "react";
import Image from "next/image";
import GradeTag from "../tag/GradeTag";
import example from "@/assets/example.svg";
import Button from "../ui/Button";

const genreMap = {
  1: "여행",
  2: "풍경",
  3: "인물",
  4: "사물",
};

export default function ExchangeCancel({
  name,
  image,
  gradeId,
  genreId,
  nickname,
  price,
  description,
  onApprove,
  onCancel,
}) {
 
  return (
    <div className="bg-my-black w-full px-2 py-2 border border-gray-800 text-white">
      {/* 이미지 */}
      <div className="w-full aspect-[4/3] relative mb-3">
        <img
          src={image}
          alt={name}
          className="object-cover"
        />
      </div>

      {/* 제목 */}
      <h3 className="text-700-14 truncate mb-1">{name}</h3>

      <div className="flex">
        {/* 등급 · 장르 · 작성자 */}
        <div className="flex justify-between items-center text-400-10">
          <div className="flex items-center gap-1.5">
            <p className="[&_*]:text-300-10">
              <GradeTag grade={gradeId} />
            </p>
            <span className="text-gray-400">|</span>
            <span className="text-gray-300">{genreMap[genreId]}</span>
          </div>
        </div>

        {/* 구매 가격 */}
        <div className="mt-1 flex justify-between items-center text-400-10">
          <span>
            <span className="text-white font-semibold">{price} P</span>
            <span className="text-gray-300"> 에 구매</span>
          </span>
          <span className="underline text-brand-yellow">{nickname}</span>
        </div>
      </div>
      {/* 구분선 */}
      <div className="border-t border-gray-700 my-2" />

      {/* 설명 */}
      <p className="text-300-10 text-gray-200 line-clamp-2 mb-3">
        {description}
      </p>

      {/* 버튼들 */}
      <div className="w-full">
        <Button type="reject" onClick={onCancel}>
          취소하기
        </Button>
      </div>
    </div>
  );
}
