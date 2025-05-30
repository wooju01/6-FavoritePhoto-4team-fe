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

  const handleBuy = async (quantity) => {
    if (quantity <= 0) {
      alert("구매 수량을 선택해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await storeService.purchaseCard(photo.id, quantity);
      alert(`구매 성공! ${result.purchasedQuantity}장 구매되었습니다.`);

      setRemaining((prev) => prev - quantity);
    } catch (error) {
      alert(`구매 실패: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const imageUrl = photo?.photoCard?.imageUrl || example;
  const name = photo?.photoCard?.name || "제목 없음";

  return (
    <section className="w-full">
      <Title title={name} font="titleLg_Noto" />
      <div className="md:flex">
        <div className="w-full h-[260px] lg:h-[720px] overflow-hidden rounded-md mb-4 relative">
          <img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full"
            style={{ objectFit: "cover" }}
          />
        </div>

        <CardBuyer
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
