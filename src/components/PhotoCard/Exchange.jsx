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

export default function Exchange({ trade, onApprove, onReject, isSoldOut }) {
  const userCard = trade.tradeRequestUserCards[0]?.userCard;
  const photoCard = userCard?.photoCard;

  return (
    <div className="bg-gray-500 w-full p-2 md:p-5 lg:p-10 border border-gray-800 text-white rounded-xs">
      {/* 이미지 */}
      <div className="relative mb-3">
        {/* 여기 로직 이상한거 압니다..근데 이상하게 이미지가 잘 떠서 그냥 두시길 바랍니다.. */}
        <img
          src={
            photoCard?.imageUrl?.startsWith("http")
              ? photoCard.imageUrl
              : `https://six-favoritephoto-4team-be.onrender.com${
                  photoCard?.imageUrl || ""
                }`
          }
          alt={photoCard?.name || "카드 이미지"}
          className="object-cover w-full h-full aspect-square"
        />
      </div>

      {/* 제목 */}
      <h3 className="text-700-14 md:text-700-22 truncate mb-1">
        {photoCard?.name}
      </h3>

      {/* 등급 · 장르 · 작성자 */}
      <div className="flex justify-between items-center text-400-10">
        <div className="flex items-center gap-1.5">
          <p className="[&>span]:text-300-10 md:[&>span]:text-300-16">
            <GradeTag grade={photoCard?.gradeId} />
          </p>
          <span className="text-gray-400 md:text-400-16">|</span>
          <span className="text-gray-300 md:text-400-16">
            {genreMap[photoCard?.genreId]}
          </span>
        </div>
      </div>

      {/* 구매 가격 */}
      <div className="mt-1 flex justify-between items-center text-400-10">
        <span>
          <span className="text-white font-semibold md:text-400-16">
            {userCard?.price ?? 0} P
          </span>
          <span className="text-gray-300 md:text-400-16"> 에 구매</span>
        </span>
        <span className="underline text-brand-yellow md:text-400-16">
          {trade?.applicant?.nickname}
        </span>
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-700 my-2" />

      {/* 설명 */}
      <p className="text-300-10 md:text-400-16 text-gray-200 line-clamp-2 mb-3">
        {trade?.description}
      </p>

      {/* 버튼들 */}
      <div className="flex justify-between gap-2 md:gap-5 md:[&>button]:h-14">
        {isSoldOut ? (
          <Button type="exchangeGreen" disabled={true} className="w-full">
            거절 및 승인 불가
          </Button>
        ) : (
          <>
            <Button type="reject" onClick={() => onReject(trade.id)}>
              <span className="text-700-12 md:hidden">거절</span>
              <span className="hidden md:block text-400-16 font-medium">
                거절하기
              </span>
            </Button>
            <Button type="approve" onClick={() => onApprove(trade.id)}>
              <span className="text-700-12 md:hidden">승인</span>
              <span className="hidden md:block text-700-16">승인하기</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
