"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import exchangeIcon from "@/assets/exchange.svg";
import Button from "./Button";
import GradeTag from "../tag/GradeTag";
import CardSellDetail from "../CardSeller/CardSellDetail";
import { useRouter } from "next/navigation";
import { cancelSaleById } from "@/lib/api/api-sale";
import { getMyCards } from "@/lib/api/api-users";

const genreMap = {
  1: "여행",
  2: "풍경",
  3: "인물",
  4: "사물",
};

export default function CardSeller({ sale }) {
  const router = useRouter();

  const [editModeOpen, setEditModeOpen] = useState(false);

  const [availableCards, setAvailableCards] = useState([]);

  // 수정하기 모드에서도 현 보유수량 데이터 호출
  useEffect(() => {
    async function fetchAvailableCards() {
      const res = await getMyCards({});
      const matchedCard = res.items.find(
        (item) => item.id === sale.photoCard.id
      );
      setAvailableCards(matchedCard?.userCards || []);
    }

    if (editModeOpen) fetchAvailableCards();
  }, [editModeOpen, sale.photoCard.id]);

  const handleCancelSale = async () => {
    const confirmCancel = window.confirm("정말로 판매를 중단하시겠습니까?");
    if (!confirmCancel) return;

    try {
      await cancelSaleById(sale.id);
      alert("판매가 성공적으로 중단되었습니다.");
      router.push("/home");
    } catch (err) {
      alert(err.message || "판매 중단에 실패했습니다.");
    }
  };

  const {
    photoCard,
    seller,
    price,
    saleQuantity,
    cardGradeId,
    cardGenreId,
    desiredDescription,
  } = sale;

  return (
    <>
      <div className="w-full bg-my-black text-white lg:p-5 flex flex-col justify-between text-sm lg:text-base">
        {/* 상단 정보 */}
        <div className="flex items-center font-bold gap-2 mb-2 text-sm lg:text-[15px]">
          <GradeTag grade={photoCard.gradeId} />
          <span className="text-gray-400 text-700-18">|</span>
          <span className="text-gray-300 text-700-18">
            {genreMap[photoCard.genreId]}
          </span>
          <div className="ml-auto text-700-18 underline">{seller.nickname}</div>
        </div>

        <div className="w-full h-[1.5px] bg-gray-400 my-5" />

        {/* 설명 */}
        <p className="leading-relaxed text-400-16 lg:text-sm">
          {photoCard.description}
        </p>

        <div className="w-full h-[2px] bg-gray-400 my-5" />

        {/* 가격/잔여 */}
        <div className="flex flex-col gap-2 mb-18">
          <div className="flex justify-between">
            <span className="text-gray-300 text-400-18">가격</span>
            <span className="text-700-20">{price} P</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300 text-400-18">잔여</span>
            <span className="text-700-20">{saleQuantity} / 10</span>
          </div>
        </div>

        {/* 교환 희망 정보 */}
        <div className="flex items-center gap-2 mb-1">
          <Image src={exchangeIcon} alt="교환" width={20} height={20} />
          <span className="text-700-22">교환 희망 정보</span>
        </div>
        <div className="w-full h-[1.5px] bg-gray-100" />

        {/* 희망 카테고리 */}
        <div className="flex items-center font-bold gap-2 my-6.5 text-sm lg:text-base">
          <GradeTag grade={cardGradeId} />
          <span className="text-gray-400 text-700-18">|</span>
          <span className="text-gray-300 text-700-18">
            {genreMap[cardGenreId]}
          </span>
        </div>

        <div className="w-full h-[1.5px] bg-gray-400 mb-6" />

        <p className="text-gray-200 mb-12 text-400-16">{desiredDescription}</p>

        {/* 버튼 영역 */}
        <div className="flex flex-col gap-3">
          <Button type="purchase" onClick={() => setEditModeOpen(true)}>
            수정하기
          </Button>
          <Button type="sellDown" onClick={handleCancelSale} />
        </div>
      </div>
      {editModeOpen && (
        <CardSellDetail
          card={{
            ...sale,
            photoCard: {
              ...sale.photoCard,
              userCards: availableCards || [], // sale 데이터 이외의 데이터 연결
            },
          }}
          availableCards={availableCards}
          onClose={() => setEditModeOpen(false)}
          isEditMode={true}
        />
      )}
    </>
  );
}
