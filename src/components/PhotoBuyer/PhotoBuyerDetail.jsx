"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PhotoBuyerSection from "./PhotoBuyerSection";
import ExchangeCard from "./ExchangeCard";
import ExchangeCancel from "../PhotoCard/ExchangeCancel";
import { Title } from "../ui/Title";
import { storeService } from "@/lib/api/api-store";

export default function PhotoBuyerDetail({ sale }) {
  const id = sale.id;
  const [tradeRequests, setTradeRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 교환 요청 목록만 불러옴
  const loadTradeRequests = async () => {
    try {
      const tradeReqs = await storeService.getTradeRequests(id);
      setTradeRequests(tradeReqs);
    } catch (err) {
      console.error("교환 요청 로딩 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  // 교환 제시 취소
  const handleCancel = async (tradeRequestId) => {
    try {
      await storeService.cancelTradeRequest(id, tradeRequestId);
      await loadTradeRequests();
    } catch (err) {
      console.error("교환 요청 취소 실패:", err);
    }
  };

  useEffect(() => {
    if (id) loadTradeRequests();
  }, [id]);

  if (loading) return <p>로딩 중...</p>;

  return (
    <section>
      <PhotoBuyerSection photo={sale} />
      <ExchangeCard
        saleId={sale.id}
        desiredDescription={sale.desiredDescription}
        cardGradeId={sale.cardGradeId}
        cardGenreId={sale.cardGenreId}
        refetchTradeRequests={loadTradeRequests}
      />
      <Title title="내가 제시한 교환 목록" font="titleLg_Noto" />
      {tradeRequests.length === 0 ? (
        <p>거래 요청이 없습니다.</p>
      ) : (
        tradeRequests.map((req) =>
          req.tradeRequestUserCards.map(({ userCard }) => (
            <ExchangeCancel
              key={userCard.id}
              name={userCard.photoCard?.name || "제목 없음"}
              image={userCard.photoCard?.imageUrl}
              gradeId={userCard.photoCard?.gradeId}
              genreId={userCard.photoCard?.genreId}
              nickname={userCard.photoCard?.creator?.nickname || "익명"}
              price={userCard.price}
              description={req.description || ""}
              onCancel={() => handleCancel(req.id)}
            />
          ))
        )
      )}
    </section>
  );
}
