"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PhotoBuyerSection from "./PhotoBuyerSection";
import ExchangeCard from "./ExchangeCard";
import ExchangeCancel from "../PhotoCard/ExchangeCancel";
import { Title } from "../ui/Title";
import { storeService } from "@/lib/api/api-store";

export default function PhotoBuyerDetail({ id }) {
  const [photo, setPhoto] = useState(null);
  const [tradeRequests, setTradeRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 데이터 불러오기
  const loadData = async () => {
    try {
      const photoData = await storeService.getStoreCardDetail(id);
      if (!photoData) {
        router.push("/login");
        return;
      }
      setPhoto(photoData);

      const tradeReqs = await storeService.getTradeRequests(id);
      setTradeRequests(tradeReqs);
    } catch (err) {
      console.error("데이터 로딩 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  // 취소 핸들러
  const handleCancel = async (tradeRequestId) => {
    try {
      await storeService.cancelTradeRequest(id, tradeRequestId);
      await loadData();
    } catch (err) {
      console.error("교환 요청 취소 실패:", err);
    }
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  if (loading) return <p>로딩 중...</p>;
  if (!photo) return null;

  return (
    <section>
      <PhotoBuyerSection photo={photo} />
      <ExchangeCard
        desiredDescription={photo.desiredDescription}
        cardGradeId={photo.cardGradeId}
        cardGenreId={photo.cardGenreId}
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
