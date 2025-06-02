"use client";

import React, { useEffect, useState } from "react";
import { Title } from "../ui/Title";
import GradeTag from "../tag/GradeTag";
import MyTradeCard from "../CardTrade/MyTradeCard";

function ExchangeCard({
  desiredDescription,
  cardGradeId,
  cardGenreId,
  saleId,
  refetchTradeRequests
}) {
  const [isMd, setIsMd] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function onResize() {
      setIsMd(window.innerWidth >= 744);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const genreMap = {
    1: "여행",
    2: "풍경",
    3: "인물",
    4: "사물",
  };
  const genreText = genreMap[cardGenreId] || "알 수 없음";

  return (
    <div className="mt-20 md:mt-32">
      <Title
        title="교환 희망 정보"
        buttonText={isMd ? "포토카드 교환하기" : undefined}
        font="titleLg_Noto"
        onButtonClick={() => setIsOpen(true)}
      />
      <div className="py-7 flex flex-col gap-4">
        <p className="text-white text-700-18 lg:text-700-22">{desiredDescription}</p>
        <div className="flex items-center gap-2.5">
          <p className=" text-sm text-gray-500 lg:[&>span]:text-700-22">
            <GradeTag grade={cardGradeId} />
          </p>
          <span className="text-gray-300 lg:text-700-22">|</span>
          <p className=" text-gray-300 text-700-18 lg:text-700-22">{genreText}</p>
        </div>
        <button
        onClick={() => setIsOpen(true)}
        className="md:hidden w-full h-14 text-700-16 bg-main text-my-black rounded-xs"
        >
          포토카드 교환하기
        </button>
      </div>

      <MyTradeCard
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        saleId={saleId}
        refetchTradeRequests={refetchTradeRequests}
      />
    </div>
  );
}

export default ExchangeCard;
