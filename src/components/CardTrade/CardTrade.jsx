"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeService } from "@/lib/api/api-store";
import MyCard from "../PhotoCard/MyCard";
import { Title } from "../ui/Title";
import { useStateModal } from "@/providers/StateModalProvider";

export default function CardTrade({
  selectedCard,
  onClose,
  saleId,
  refetchTradeRequests,
}) {
  const [message, setMessage] = useState("");
  const { openModal } = useStateModal();
  if (!selectedCard) {
    return <div className="text-white p-4">선택된 카드가 없습니다.</div>;
  }

  const { photoCard, userCard } = selectedCard;

  const mutation = useMutation({
    mutationFn: ({ saleId, offeredUserCardId, message }) =>
      storeService.createTradeRequest(saleId, [offeredUserCardId], message),

    onSuccess: (data, variables) => {
      openModal(200, "교환", {
        grade: photoCard.grade?.name || "등급없음",
        name: photoCard.name,
      });
      if (refetchTradeRequests) refetchTradeRequests();
      if (onClose) onClose();
    },

    onError: (error, variables) => {
      openModal(error?.response?.status || 500, "교환 제시", {
        grade: photoCard.grade?.name || "등급없음",
        name: photoCard.name,
      });
    },
  });

  const handleTrade = () => {
    mutation.mutate({
      saleId,
      offeredUserCardId: userCard.id,
      message,
    });
  };

  const handleCancel = () => {
    if (onClose) onClose();
  };

  return (
    <div className="text-white p-4">
      <Title title={photoCard.name} font="titleLg_Noto" />

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* 왼쪽: 카드 */}
        <div className="md:w-1/2">
          <MyCard
            key={photoCard.id}
            name={photoCard.name}
            image={photoCard.imageUrl}
            gradeId={photoCard.grade?.id}
            genre={photoCard.genre?.name}
            nickname={photoCard.creator?.nickname}
            totalQuantity={photoCard.userCards?.length}
            initialPrice={photoCard.userCards?.[0]?.price}
          />
        </div>

        {/* 오른쪽: 교환 내용 입력 & 버튼 */}
        <div className="md:w-1/2 flex flex-col">
          <div>
            <section className="text-700-16">교환 제시 내용</section>
            <textarea
              className="w-full mt-4 p-2 border border-gray-200 rounded resize-none bg-black text-white"
              placeholder="내용을 입력해 주세요"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="flex w-full space-x-2 mt-4 md:mt-10">
            <button
              onClick={handleCancel}
              className="w-full px-4 py-2 border border-white text-white rounded hover:bg-gray-700"
            >
              취소하기
            </button>

            <button
              onClick={handleTrade}
              className="w-full px-4 py-2 bg-main text-black rounded hover:bg-yellow-300"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "요청 중..." : "교환하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
