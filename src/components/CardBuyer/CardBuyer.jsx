"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FaPlus, FaMinus } from "react-icons/fa6";
import Button from "../ui/Button.jsx";
import GradeTag from "../tag/GradeTag";
import { storeService } from "@/lib/api/api-store";
import { useAlertModal } from "@/providers/AlertModalProvider";
import { useStateModal } from "@/providers/StateModalProvider";
import NotiModal from "@/components/modal/NotiModal";
import StateModal from "@/components/modal/StateModal";

const FIXED_LABELS = ["여행", "풍경", "인물", "사물"];

const tierToGradeName = {
  1: "COMMON",
  2: "RARE",
  3: "SUPER RARE",
  4: "LEGENDARY",
};

export default function CardBuyer({
  cardId,
  tier,
  subLabel = "",
  creator,
  description = "",
  pricePerCard,
  remaining,
  total,
  onSuccess,
  cardName, // 카드 제목 전달 추가가
}) {
  const [quantity, setQuantity] = useState(1);
  const [localRemaining, setLocalRemaining] = useState(remaining);
  const [isLargeScreen, setIsLargeScreen] = useState(null);

  const safeSubLabel = FIXED_LABELS.includes(subLabel) ? subLabel : "풍경";

  const totalPrice = pricePerCard * quantity;

  const { openModal: openNotiModal } = useAlertModal();
  const { openModal: openStateModal } = useStateModal();

  const { mutate, isPending } = useMutation({
    mutationFn: () => storeService.purchaseCard(cardId, quantity),
    onSuccess: (data) => {
      const gradeName = tierToGradeName[tier];
      setLocalRemaining((prev) => prev - quantity);
      if (onSuccess) onSuccess(data);
      openStateModal(200, "구매", {
        grade: gradeName,
        name: cardName,
        count: quantity,
      });
    },
    onError: (err) => {
      const status = err.response?.status || 400;
      openStateModal(status, "구매", {
        grade: gradeName,
        name: cardName,
        count: quantity,
      });
      console.error("구매 실패:", err.message || err);
    },
  });

  useEffect(() => {
    const checkScreenSize = () => setIsLargeScreen(window.innerWidth >= 1480);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleQuantity = (amount) => {
    const next = Math.max(1, Math.min(quantity + amount, localRemaining));
    setQuantity(next);
  };

  const gradeSize = isLargeScreen ? "xl" : "lg";

  const handlePurchaseButtonClick = () => {
    const gradeName = tierToGradeName[tier];
    openNotiModal(
      "구매",
      { grade: gradeName, name: cardName, count: quantity },
      () => mutate()
    );
  };

  return (
     <div className="flex flex-col gap-7 md:">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="lg:[&>span]:text-700-24">{isLargeScreen !== null && <GradeTag grade={tier} size={gradeSize} />}</span>
          <span className="text-gray-400 lg:text-700-24">|</span>
          <span className="text-700-18 text-gray-300 lg:text-700-24">{safeSubLabel}</span>
        </div>
        {creator && (
          <span className="underline text-700-18 lg:text-700-24">{creator}</span>
        )}
      </div>

      <hr className="border-gray-400" />

      <p className="text-400-16 line-clamp-2 lg:text-400-18 lg:line-clamp-5">
        {description}
      </p>

      <hr className="border-gray-400" />

      <div className="flex flex-col gap-2.5 ">
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-400-18 lg:text-400-20">가격</span>
          <span className="text-700-20 lg:text-700-24">{pricePerCard} P</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-400-18 lg:text-400-20">잔여</span>
          <span className="text-700-20 lg:text-700-24">
            {localRemaining}
            <span className="text-gray-300"> / 10</span>
          </span>
        </div>
      </div>

      <hr className="border-gray-400" />

      <div className="flex flex-col gap-5">
        <div className="">
          <div className="flex items-center justify-between">
            <span className="text-400-18 lg:text-400-20">구매수량</span>
            <div className="flex gap-8 lg:gap-10 px-3 py-2.5 border-1 border-gray-200 rounded-xs">
              <button
                onClick={() => handleQuantity(-1)}
                disabled={quantity <= 1}
                className=""
              >
                <FaMinus />
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => handleQuantity(1)}
                disabled={quantity >= localRemaining}
                className=""
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-400-18 lg:text-400-20">총 가격</span>
          <div className="flex items-center gap-2.5">
            <strong className="text-700-20 lg:text-700-24">{totalPrice} P</strong>
            <span className="text-400-18 text-gray-300 lg:text-400-20">({quantity}장)</span>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Button
          onClick={handlePurchaseButtonClick}
          disabled={localRemaining === 0 || isPending}
          className="h-[75px] lg:h-[80px]"
        >
          {localRemaining === 0
            ? "품절되었습니다"
            : isPending
              ? "구매 중..."
              : "포토카드 구매하기"}
        </Button>
        <NotiModal />
        <StateModal />
      </div>

    </div>
  );
}
