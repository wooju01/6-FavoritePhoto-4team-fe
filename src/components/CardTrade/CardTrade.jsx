"use client";

import React, { useEffect, useState } from "react";
import { storeService } from "@/lib/api/api-store";
import MyCard from "../PhotoCard/MyCard";


export default function CardTradePage({ cardId }) {
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const fetchCardDetail = async () => {
      try {
        const data = await storeService.getUserGalleryCardDetail(cardId);
        setCardData(data[0]); 
      } catch (error) {
        console.error("카드 상세 조회 실패:", error);
      }
    };

    fetchCardDetail();
  }, [cardId]);

  if (!cardData) {
    return <div className="text-white p-4">로딩 중...</div>;
  }

  const { photoCard } = cardData;

  return (
    <div className="text-white p-4">
      <MyCard
        name={photoCard.name}
        image={photoCard.imageUrl}
        gradeId={photoCard.gradeId}
        genre={photoCard.genre?.name}
        nickname={photoCard.creator?.nickname}
        totalQuantity={photoCard.totalQuantity}
        initialPrice={photoCard.initialPrice}
      />
    </div>
  );
}
