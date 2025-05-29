"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react"; // React 18 이상에서 지원하는 훅
import PhotoBuyerSection from "@/components/PhotoBuyer/PhotoBuyerSection";
import ExchangeCard from "@/components/PhotoBuyer/ExchangeCard";
import ExchangeCancel from "@/components/PhotoCard/ExchangeCancel";
import { Title } from "@/components/ui/Title";
import { storeService } from "@/lib/api/api-store";

// 포토카드 상세 정보 불러오기
async function fetchPhotoDetail(id) {

  try {
    const photoData = await storeService.getStoreCardDetail(id);
    
    return photoData;
  } catch (err) {
    console.error("사진 상세 정보 로딩 실패:", err);
    return null;
  }
}

// 거래 요청 정보 불러오기
async function fetchTradeRequest(listedCardId) {
  try {
    const res = await storeService.getTradeRequests(listedCardId);
    return res;
  } catch (err) {
    console.error("거래 요청 정보 로딩 실패:", err);
    return [];
  }
}

// 교환 요청 취소 함수
async function cancelTradeRequest(listedCardId, tradeRequestId) {
  try {
    await storeService.cancelTradeRequest(listedCardId, tradeRequestId);
  } catch (err) {
    console.error("교환 요청 취소 실패:", err);
  }
}

export default function PhotoDetailPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [photo, setPhoto] = useState(null);
  const [tradeRequests, setTradeRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadData = async () => {
    const photoData = await fetchPhotoDetail(id);
    if (!photoData) {
      router.push("/login");
      return;
    }
    setPhoto(photoData);

    const tradeReqs = await fetchTradeRequest(id);
    setTradeRequests(tradeReqs);
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    loadData().finally(() => setLoading(false));
  }, [id]);

  const handleCancel = async (tradeRequestId) => {
    await cancelTradeRequest(id, tradeRequestId);
    await loadData();
  };
  

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
