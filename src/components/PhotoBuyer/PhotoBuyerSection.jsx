"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CardBuyer from "../CardBuyer/CardBuyer";
import { Title } from "../ui/Title";
import example from "@/assets/example.svg";

const genreMap = {
  1: "여행",
  2: "풍경",
  3: "인물",
  4: "사물",
};

const tierMap = {
  1: "COMMON",
  2: "RARE",
  3: "SUPER RARE",
  4: "LEGENDARY",
};

export default function PhotoBuyerSection({ photo }) {
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    function onResize() {
      setIsMd(window.innerWidth >= 744);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleBuy = (quantity) => {
    alert(`${quantity}장 구매 요청`);
  };

  return (
    <section className="w-full">
      <Title title={photo.name} font="titleLg_Noto" />

      <div className="md:flex">
        <div className="w-full h-[260px]  lg:h-[720px] overflow-hidden rounded-md mb-4 relative">
          <Image src={example} alt={photo.name} fill className="object-cover" />
        </div>

        <CardBuyer
          tier={photo.gradeId}
          subLabel={genreMap[photo.genreId] || "풍경"}
          creator={photo.name}
          description={photo.description}
          pricePerCard={photo.initialPrice}
          remaining={photo.totalQuantity}
          total={photo.totalQuantity}
          onBuy={handleBuy}
        />
      </div>
      <Title
        title="교환 희망 정보"
        buttonText={isMd ? "포토카드 교환하기" : undefined}
        font="titleLg_Noto"
      />
    </section>
  );
}
