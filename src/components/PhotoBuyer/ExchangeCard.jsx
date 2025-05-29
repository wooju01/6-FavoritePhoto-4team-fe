"use client";

import React, { useEffect, useState } from "react";
import { Title } from "../ui/Title";
import GradeTag from "../tag/GradeTag";
import MyTradeCard from "../CardSeller/MyTradeCard";

function ExchangeCard({ desiredDescription, cardGradeId, cardGenreId }) {
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
    <div>
      <Title
        title="교환 희망 정보"
        buttonText={isMd ? "포토카드 교환하기" : undefined}
        font="titleLg_Noto"
        onButtonClick={() => setIsOpen(true)}
      />
      <p className="mt-2 text-sm text-gray-700">{desiredDescription}</p>
      <p className="mt-1 text-sm text-gray-500">
        카드 등급: <GradeTag grade={cardGradeId} />
      </p>
      <p className="mt-1 text-sm text-gray-500">카드 장르: {genreText}</p>

      <MyTradeCard isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default ExchangeCard;
