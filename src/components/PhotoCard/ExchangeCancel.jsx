"use client";

import React from "react";
import GradeTag from "../tag/GradeTag";
import Button from "../ui/Button";
import { useAlertModal } from "@/providers/AlertModalProvider";

const genreMap = {
  1: "여행",
  2: "풍경",
  3: "인물",
  4: "사물",
};
const gradeMap = {
  1: "COMMON",
  2: "RARE",
  3: "SUPER RARE",
  4: "LEGENDARY",
};

export default function ExchangeCancel({
  name,
  image,
  gradeId,
  genreId,
  nickname,
  price,
  description,
  onCancel,
}) {
  const { openModal } = useAlertModal();

  return (
    <div className="flex flex-col justify-between bg-gray-500  border-1 w-full p-2 md:p-5 lg:p-10  border-gray-800 text-white ">
      {/* 이미지 */}
      <div className=" relative mb-3 ">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full aspect-square"
        />
      </div>

      {/* 제목 */}
      <div className="flex flex-col justify-baseline ">
        <h3 className="text-700-14 truncate mb-1">{name}</h3>

        <div>
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
          <div className="mt-1 flex justify-between items-center text-400-10  md:text-400-16">
            <span>
              <span className="text-white font-semibold ">{price} P</span>
              <span className="text-gray-300"> 에 구매</span>
            </span>
            <span className="underline text-brand-yellow">{nickname}</span>
          </div>
        </div>
        <div>
          {/* 구분선 */}
          <div className="border-t border-gray-700 my-2" />

          {/* 설명 */}
          <p className="text-300-10 text-gray-200 line-clamp-2 mb-3 md:text-400-18">
            {description}
          </p>
        </div>
      </div>
      {/* 버튼들 */}
      <div className="w-full">
        <Button
          type="reject"
          onClick={() =>
            openModal("교환 취소", {
              grade: gradeMap[gradeId],
              name,
            }, onCancel)
          }
        >
          취소하기
        </Button>
      </div>
    </div>
  );
}
