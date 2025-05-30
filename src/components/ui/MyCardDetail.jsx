"use client";

import React from "react";
import GradeTag from "../tag/GradeTag";

export default function MyCardDetail({
  card,
  count,
  setCount,
  price,
  setPrice,
}) {
  const handleDecrease = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleIncrease = () => {
    if (count < card?.photoCard?.totalQuantity) setCount(count + 1);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPrice(value);
    }
  };

  return (
    <div className="w-full bg-my-black text-white py-1 border-none text-sm lg:text-base">
      {/* 상단 정보 */}
      <div className="flex items-center gap-2 text-sm lg:text-[16px] mb-3">
        <span className="[&_*]:text-700-18">
          <GradeTag grade={card?.photoCard?.grade?.id} />
        </span>
        <span className="text-gray-400">|</span>
        <span className="text-gray-300 text-700-18">
          {card?.photoCard?.genre?.name || "-"}
        </span>
        <div className="ml-auto text-700-18 underline">
          {card?.photoCard?.creator?.nickname || "나"}
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-400 my-6" />

      <div className="flex flex-col gap-5">
        {/* 총 판매 수량 */}
        <div className="flex items-center gap-12.5">
          <span className="text-400-18 lg:text-base">총 판매 수량</span>

          <div className="flex items-center gap-4.5 flex-1">
            <div className="flex items-center justify-between w-full max-w-[144px] h-[45px] border border-white px-4">
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
                / {card?.photoCard?.totalQuantity ?? 0}
              </div>
              <div className="pl-[1px]">
                최대 {card?.photoCard?.totalQuantity ?? 0}장
              </div>
            </div>
          </div>
        </div>

        {/* 장당 가격 */}
        <div className="flex items-center gap-18">
          <span className="text-400-18 lg:text-base">장당 가격</span>

          <div className="relative flex-1 w-full max-w-[200px] h-[45px] border border-white flex items-center px-4">
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
