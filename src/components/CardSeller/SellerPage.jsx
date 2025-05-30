"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import backIcon from "@/assets/back.svg";
import CardSeller from "../ui/CardSeller";
import Exchange from "../PhotoCard/Exchange";
import {
  approveTradeRequest,
  getTradeRequestsBySaleId,
  rejectTradeRequest,
} from "@/lib/api/api-trade";

export default function SellerPage({ sale }) {
  const router = useRouter();
  const { photoCard } = sale;
  const { imageUrl, name } = photoCard;

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
    if (!confirm("이 교환 제시를 승인하시겠습니까?")) return;
    try {
      await approveTradeRequest(tradeId);
      alert("교환이 승인되었습니다.");
      fetchTradeRequests(); // 리스트 갱신
    } catch (err) {
      console.error("승인 실패:", err);
      alert("교환 승인에 실패했습니다.");
    }
  };

  const handleReject = async (tradeId) => {
    if (!confirm("이 교환 제시를 거절하시겠습니까?")) return;
    try {
      await rejectTradeRequest(tradeId);
      alert("교환이 거절되었습니다.");
      fetchTradeRequests(); // 리스트 갱신
    } catch (err) {
      console.error("거절 실패:", err);
      alert("교환 거절에 실패했습니다.");
    }
  };

  return (
    <div className="bg-my-black text-white min-h-screen">
      {/* 헤더 */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center"
        >
          <Image src={backIcon} alt="뒤로가기" width={24} height={24} />
        </button>
        <div className="flex-1 text-center title-16 font-bold">
          마켓플레이스
        </div>
      </div>

      {/* 카드 제목 */}
      <div className="text-700-24 mb-2">{photoCard.name}</div>
      <div className="w-full h-[1.5px] bg-gray-200 mb-5" />

      {/* 카드 이미지 */}
      <div className="w-full aspect-[4/3] relative mb-4">
        <img
          src={
            imageUrl?.startsWith("http")
              ? imageUrl
              : `https://six-favoritephoto-4team-be.onrender.com${imageUrl}`
          }
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* 카드 상세 정보 */}
      <CardSeller sale={sale} onSellDown={() => console.log("판매 중단")} />

      {/* 교환 제시 목록 */}
      <div className="mt-20 mb-2 text-700-24">교환 제시 목록</div>
      <div className="w-full h-[1.5px] bg-gray-200 mb-10" />
      <div className="grid grid-cols-2 gap-2">
        {tradeRequests.map((trade) => {
          const userCard = trade.tradeRequestUserCards[0]?.userCard;
          const photoCard = userCard?.photoCard;

          if (!photoCard) return null;

          return (
            <Exchange
              key={trade.id}
              trade={trade}
              onApprove={() => handleApprove(trade.id)}
              onReject={() => handleReject(trade.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
