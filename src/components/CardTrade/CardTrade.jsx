"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeService } from "@/lib/api/api-store";
import MyCard from "../PhotoCard/MyCard";

export default function CardTrade({ selectedCard, onClose, saleId, refetchTradeRequests}) {
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  if (!selectedCard) {
    return <div className="text-white p-4">선택된 카드가 없습니다.</div>;
  }

  const { photoCard, userCard } = selectedCard;

  const mutation = useMutation({
    mutationFn: ({ saleId, offeredUserCardId, message }) =>
      storeService.createTradeRequest(saleId, [offeredUserCardId], message),

    onSuccess: () => {
      alert("교환 요청이 성공적으로 전송되었습니다!");
      if (refetchTradeRequests) refetchTradeRequests();
      if (onClose) onClose();
    },

    onError: (error) => {
      console.error("교환 요청 실패:", error);
      alert("교환 요청에 실패했습니다. 다시 시도해주세요.");
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
      <div className="w-[440px]">
        <MyCard
          name={photoCard.name}
          image={photoCard.imageUrl}
          gradeId={photoCard.gradeId}
          genre={photoCard.genre?.name}
          nickname={photoCard.creator?.nickname}
          totalQuantity={photoCard.userCards?.length}
          initialPrice={photoCard.initialPrice}
        />
      </div>

      <textarea
        className="w-full mt-4 p-2 border border-gray-200 rounded resize-none"
        placeholder="내용을 입력하세요"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-500 border border-gray-100 rounded hover:bg-gray-700"
        >
          취소하기
        </button>

        <button
          onClick={handleTrade}
          className="px-4 py-2 bg-main text-black rounded hover:bg-blue-700"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "요청 중..." : "교환하기"}
        </button>
      </div>
    </div>
  );
}
