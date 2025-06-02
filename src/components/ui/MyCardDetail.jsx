"use client";

import React from "react";
import GradeTag from "../tag/GradeTag";

export default function MyCardDetail({
  card,
  count,
  setCount,
  price,
  setPrice,
  isEditMode = false,
}) {
  // 현재 보유 중인 ACTIVE 카드 수
  const baseCount = card?.photoCard?.userCards?.length ?? 0;

  // 수정 모드 - 기존 보유 카드 + 판매 중인 카드
  const saleQuantity = card?.saleQuantity ?? 0;
  const availableCount = isEditMode ? baseCount + saleQuantity : baseCount;

  // 수정 모드 - 닉네임은 판매자 기준으로
  const nickname = isEditMode
    ? card?.seller?.nickname
    : card.userCard?.owner?.nickname;

  const handleDecrease = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleIncrease = () => {
    if (count < availableCount) setCount(count + 1);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPrice(value);
    }
  };

  return (
    <div className="w-full bg-gray-500 text-white py-1 border-none text-sm lg:text-base">
      {/* 상단 정보 */}
      <div className="flex items-center gap-2 text-sm lg:text-[16px] mb-3">
        <span className="[&_*]:text-700-18">
          <GradeTag grade={card?.photoCard?.grade?.id} />
        </span>
        <span className="text-gray-400">|</span>
        <span className="text-gray-300 text-700-18">
          {card?.photoCard?.genre?.name || "-"}
        </span>
        <div className="ml-auto text-700-18 underline">{nickname || "나"}</div>
      </div>

      <div className="w-full h-[1px] bg-gray-400 my-6" />

      <div className="flex flex-col gap-5">
        {/* 총 판매 수량 */}
        <div className="flex items-center gap-6">
          <span className="text-400-18 lg:text-base">총 판매 수량</span>

          <div className="flex items-center gap-2 flex-1">
            <div className="flex items-center justify-between w-full ml-auto max-w-[144px] h-[45px] border border-white px-4">
              <button onClick={handleDecrease} className="text-xl">
                -
              </button>
              <span className="text-lg">{count}</span>
              <button onClick={handleIncrease} className="text-xl">
                +
              </button>
            </div>
            <div className="flex flex-col justify-center text-[10px] lg:text-sm text-gray-300 leading-tight pt-[3px]">
              <div className="text-white text-base lg:text-lg font-bold">
                / {availableCount}
              </div>
              <div className="pl-[1px]">최대 {availableCount}장</div>
            </div>
          </div>
        </div>

        {/* 장당 가격 */}
        <div className="flex items-center gap-7">
          <span className="text-400-18 lg:text-base">장당 가격</span>

          <div className="relative w-full ml-auto max-w-[190px] h-[45px] border border-white flex items-center px-4">
            <input
              type="text"
              placeholder="숫자만 입력"
              value={price}
              onChange={handlePriceChange}
              className="w-full bg-transparent text-white outline-none placeholder:text-gray-400 pr-6"
            />
            <span className="absolute right-4 font-bold">P</span>
          </div>
        </div>
      </div>
    </div>
  );
}
