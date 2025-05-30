"use client";

import React from "react";
import Image from "next/image";
import GradeTag from "../tag/GradeTag";
import Button from "../ui/Button";

const genreMap = {
  1: "여행",
  2: "풍경",
  3: "인물",
  4: "사물",
};

export default function Exchange({ trade, onApprove, onReject }) {
  const userCard = trade.tradeRequestUserCards[0]?.userCard;
  const photoCard = userCard?.photoCard;

  return (
    <div className="bg-my-black w-full px-2 py-2 border border-gray-800 text-white">
      {/* 이미지 */}
      <div className="w-full aspect-[4/3] relative mb-3">
        <Image
          src={
            photoCard?.imageUrl?.startsWith("http")
              ? photoCard.imageUrl
              : `https://six-favoritephoto-4team-be.onrender.com${
                  photoCard?.imageUrl || ""
                }`
          }
          alt={photoCard?.name || "카드 이미지"}
          fill
          className="object-cover"
        />
      </div>

      {/* 제목 */}
      <h3 className="text-700-14 truncate mb-1">{photoCard?.name}</h3>

      {/* 등급 · 장르 · 작성자 */}
      <div className="flex justify-between items-center text-400-10">
        <div className="flex items-center gap-1.5">
          <p className="[&_*]:text-300-10">
            <GradeTag grade={gradeId} />
          </p>
          <span className="text-gray-400">|</span>
          <span className="text-gray-300">{genreMap[photoCard?.genreId]}</span>
        </div>
      </div>

      {/* 구매 가격 */}
      <div className="mt-1 flex justify-between items-center text-400-10">
        <span>
          <span className="text-white font-semibold">
            {userCard?.price ?? 0} P
          </span>
          <span className="text-gray-300"> 에 구매</span>
        </span>
        <span className="underline text-brand-yellow">
          {trade?.applicant?.nickname}
        </span>
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-700 my-2" />

      {/* 설명 */}
      <p className="text-300-10 text-gray-200 line-clamp-2 mb-3">
        {trade?.description}
      </p>

      {/* 버튼들 */}
      <div className="flex justify-between gap-2">
        <Button type="reject" onClick={onReject}>
          거절
        </Button>
        <Button type="approve" onClick={onApprove}>
          승인
        </Button>
      </div>
    </div>
  );
}
