"use client";

import React, { useState } from "react";
import example from "@/assets/example.svg";
import CardBuyer from "../CardBuyer/CardBuyer";
import { Title } from "../ui/Title";
import { storeService } from "@/lib/api/api-store";

export default function PhotoBuyerSection({ photo }) {
  const genreMap = {
    1: "여행",
    2: "풍경",
    3: "인물",
    4: "사물",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [remaining, setRemaining] = useState(photo.saleQuantity);

  const handleBuy = (data) => {
    // 여기서 result는 storeService가 반환한 응답 데이터
    // data.purchasedQuantity가 있다고 가정할 때
    const purchased = data?.purchasedQuantity || 1; // fallback
    setRemaining((prev) => prev - purchased);
  };

  const imageUrl = photo?.photoCard?.imageUrl || example;
  const name = photo?.photoCard?.name || "제목 없음";

  return (
    <section className="w-full">
      <Title title={name} font="titleLg_Noto" />
      <div className="md:py-5 lg:py-7 md:grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-10">
        <div className="relative py-4 md:py-0 lg:col-span-2">
          <img
            src={imageUrl}
            alt={name}
            className="aspect-square w-full h-full"
            style={{ objectFit: "cover" }}
          />
        </div>

        <CardBuyer
          cardName={photo.photoCard?.name}
          cardId={photo.id}
          tier={photo?.photoCard?.gradeId}
          subLabel={genreMap[photo?.photoCard?.genreId]}
          creator={photo?.photoCard?.creator?.nickname || "익명"}
          description={photo?.photoCard?.description}
          pricePerCard={photo?.price}
          remaining={remaining}
          total={photo?.photoCard?.totalQuantity}
          onSuccess={handleBuy}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
