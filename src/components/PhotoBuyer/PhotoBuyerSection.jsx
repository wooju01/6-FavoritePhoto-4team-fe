"use client";

import React from "react";
import example from "@/assets/example.svg";
import CardBuyer from "../CardBuyer/CardBuyer";
import { Title } from "../ui/Title";

export default function PhotoBuyerSection({ photo }) {
  const genreMap = {
    1: "여행",
    2: "풍경",
    3: "인물",
    4: "사물",
  };

  const handleBuy = (quantity) => {
    alert(`${quantity}장 구매 요청`);
  };

  const imageUrl = photo?.photoCard?.imageUrl || example;
  const name = photo?.photoCard?.name || "제목 없음";
  return (
    <section className="w-full">
      <Title title={name} font="titleLg_Noto" />

      <div className="md:flex">
        <div className="w-full h-[260px] lg:h-[720px] overflow-hidden rounded-md mb-4 relative">
          <img
            src={`https://six-favoritephoto-4team-be.onrender.com${imageUrl}`}
            alt={name}
            className="object-cover w-full h-full"
            style={{ objectFit: "cover" }}
          />
        </div>

        <CardBuyer
          tier={photo?.photoCard?.gradeId}
          subLabel={genreMap[photo?.photoCard?.genreId]}
          creator={photo?.photoCard?.creator?.nickname || "익명"}
          description={photo?.photoCard?.description}
          pricePerCard={photo?.price}
          remaining={photo?.saleQuantity}
          total={photo?.photoCard?.totalQuantity}
          onBuy={handleBuy}
        />
      </div>
    </section>
  );
}
