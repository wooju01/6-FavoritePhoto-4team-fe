"use client";
import React from "react";
import Image from "next/image";
import favicon from "@/assets/favicon.svg";
import GradeTag from "../tag/GradeTag";
import example from "@/assets/example.svg";
import Link from "next/link";
import NotiClickHandler from "@/components/HompageComponents/NotiClickHandler";

const genreMap = {
  1: "여행",
  2: "풍경",
  3: "인물",
  4: "사물",
};

export default function BaseCard({
  id,
  photoCard,
  price,
  saleQuantity,
  seller,
}) {
  return (
    <NotiClickHandler>
      <Link href={`/home/${id}`}>
        <div className="flex flex-col gap-2.5 md:gap-5 p-[15px] md:p-5 lg:p-10 border-1 border-white/10 rounded-xs bg-gray-500">
          <img
            src={photoCard.imageUrl}
            alt="photo-img"
            className="aspect-square"
          />
          <div className="flex flex-col gap-2.5 md:gap-5">
            <div>
              <h2 className="text-700-14 md:text-700-22 mb-1.5 md:mb-2.5">
                {photoCard.name}
              </h2>
              <div className="flex items-center justify-between gap-1 md:gap-0">
                <div className="flex items-center justify-between">
                  <div className="flex [&_*]:flex ">
                    <div className="items-center justify-center gap-1 md:gap-2.5">
                      <p className="[&_*]:text-300-10 md:[&_*]:text-300-16">
                        <GradeTag grade={photoCard.gradeId} />
                      </p>
                      <span className="h-3 md:h-5 w-[1px] bg-gray-400 md:"></span>
                      <span className="text-nowrap text-400-10 md:text-400-16 text-gray-300">
                        {genreMap[photoCard.genreId]}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  {/* 닉네임 */}
                  <span className="text-400-10 md:text-400-16 underline line-clamp-1">
                    {seller.nickname}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-400">{/* LINE */}</div>
            <div
              className="
          flex flex-col gap-[5px] md:gap-2.5 [&>div]:flex [&>div]:justify-between
            [&_p]:text-300-10 md:[&_p]:text-300-16 [&_p]:text-gray-300
            [&_span]:text-400-10 md:[&_span]:text-400-16 
          "
            >
              <div>
                <p>가격</p>
                <span>{price} P</span>
              </div>
              <div>
                <p>잔여</p>
                <span>
                  {saleQuantity} / <span className="text-gray-300">10</span>
                </span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <Image src={favicon} alt="logo" className="w-24 h-4" />
          </div>
        </div>
      </Link>
    </NotiClickHandler>
  );
}
