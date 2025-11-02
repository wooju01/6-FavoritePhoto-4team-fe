"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CardSeller from "../ui/CardSeller";
import Exchange from "../PhotoCard/Exchange";
import {
  approveTradeRequest,
  getTradeRequestsBySaleId,
  rejectTradeRequest,
} from "@/lib/api/api-trade";

export default function SellerPage({ sale: initialSale }) {
  const router = useRouter();
  const [sale, setSale] = useState(initialSale);
  const { photoCard } = sale;
  const { imageUrl, name } = photoCard;
  const isSoldOut = sale.saleQuantity === 0;

  const [tradeRequests, setTradeRequests] = useState([]);

  const fetchTradeRequests = async () => {
    try {
      const data = await getTradeRequestsBySaleId(sale.id);
      setTradeRequests(data);
    } catch (err) {
      console.error("교환 제시 가져오기 실패:", err);
      alert("교환 제시 데이터를 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    fetchTradeRequests();
  }, [sale.id]);

  const handleApprove = async (tradeId) => {
    try {
      await approveTradeRequest(tradeId);
      alert("교환이 승인되었습니다.");
      router.push("/my-gallery");
    } catch (err) {
      console.error("승인 실패:", err);
      const msg = err.message.includes("사용 가능한 카드가 없습니다")
        ? "판매 가능한 카드가 없습니다. 이미 교환되었거나 판매가 취소되었을 수 있습니다."
        : "교환 승인에 실패했습니다.";
      alert(msg);
    }
  };

  const handleReject = async (tradeId) => {
    try {
      await rejectTradeRequest(tradeId);
      alert("교환이 거절되었습니다.");
      fetchTradeRequests(); // 리스트 갱신
    } catch (err) {
      console.error("거절 실패:", err);
      alert("교환 거절에 실패했습니다.");
    }
  };

  const handleEditSuccess = (updatedSale) => {
    setSale(updatedSale); // CardSeller에서 넘겨준 최신 sale 데이터로 반영
  };

  return (
    <div className="bg-my-black text-white min-h-screen">
      {/* 카드 제목 */}
      <div className="text-700-24 mb-2 md:text-700-32 lg:text-700-40">
        {photoCard.name}
      </div>
      <div className="w-full h-[1.5px] bg-gray-200 mb-5" />

      {/* 카드 이미지 */}
      <div className="md:grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 py-3 md:py-5 lg:py-7">
        <div className="lg:col-span-2 mb-4 w-full">
          <div className="relative w-full h-auto aspect-[4/3] md:aspect-[4/3] lg:aspect-[3/2] max-w-full">
            <img
              src={
                imageUrl?.startsWith("http")
                  ? imageUrl
                  : `https://six-favoritephoto-4team-be-distribute.onrender.com${imageUrl}`
              }
              alt={name}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* 카드 상세 정보 */}
        <CardSeller sale={initialSale} onEditSuccess={handleEditSuccess} />
      </div>

      {/* 교환 제시 목록 */}
      <div className="text-700-24 mb-3 md:text-700-32 lg:text-700-40">
        교환 제시 목록
      </div>
      <div className="w-full h-[2px] bg-gray-200 mb-10" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 lg:gap-10">
        {tradeRequests.map((trade) => {
          const userCard = trade.tradeRequestUserCards[0]?.userCard;
          const photoCard = userCard?.photoCard;

          if (!photoCard) return null;

          return (
            <Exchange
              key={trade.id}
              trade={trade}
              onApprove={handleApprove}
              onReject={handleReject}
              isSoldOut={isSoldOut}
            />
          );
        })}
      </div>
    </div>
  );
}
