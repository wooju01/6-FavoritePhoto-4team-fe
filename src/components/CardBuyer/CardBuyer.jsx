"use client";

import { useEffect, useState } from "react";
import GradeTag from "../tag/GradeTag";
import { FaPlus, FaMinus } from "react-icons/fa6";
import Button from "../ui/Button.jsx";

const FIXED_LABELS = ["여행", "풍경", "인물", "사물"];

export default function CardBuyer({
  tier,
  subLabel = "",
  creator,
  description = "",
  pricePerCard,
  remaining,
  total,
  onBuy,
  isLoading = false,
}) {
  const [quantity, setQuantity] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(null);

  const safeSubLabel = FIXED_LABELS.includes(subLabel) ? subLabel : "풍경";

  const handleQuantity = (amount) => {
    const next = Math.max(1, Math.min(quantity + amount, remaining));
    setQuantity(next);
  };

  const totalPrice = pricePerCard * quantity;

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1480);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const gradeSize = isLargeScreen ? "xl" : "lg";

  return (
    <div className=" p-4 flex flex-col gap-4  text-white w-full h-[529px] lg:h-[612px]">
      <div className="flex items-center gap-2 text-sm">
        {isLargeScreen !== null && <GradeTag grade={tier} size={gradeSize} />}
        <span className="text-700-18 text-gray-300 lg:text-700-24">
          | {safeSubLabel}
        </span>
        {creator && (
          <span className="ml-auto text-700-18 lg:text-700-24">{creator}</span>
        )}
      </div>

      <hr className="border-gray-400" />

      <p className="text-400-16 h-[46px] leading-snug  lg:text-400-18">
        {description}
      </p>
      <hr className="border-gray-400" />

      <div className="flex flex-col h-[68px] gap-[10px] text-400-18 lg:text-400-20">
        <div className="flex justify-between">
          <span className="text-gray-300">가격</span>
          <span className="font-semibold">{pricePerCard}P</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">잔여</span>
          <span className="font-semibold">
            {remaining}
            <span className="text-gray-300"> / 10</span>
          </span>
        </div>
      </div>
      <hr className="border-gray-400" />

      <div className="flex items-center justify-between">
        <div className="flex w-full h-[45px] justify-between items-center gap-2">
          <span className="text-400-18 lg:text-400-20">구매수량</span>
          <div className="w-[144px] text-400-18 h-full items-center flex justify-between border lg:text-400-20">
            <button
              onClick={() => handleQuantity(-1)}
              disabled={quantity <= 1}
              className="px-2 disabled:opacity-50"
            >
              <FaMinus />
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => handleQuantity(1)}
              disabled={quantity >= remaining}
              className="px-2 disabled:opacity-50"
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-400-18 lg:text-400-20">
        <span>총 가격</span>
        <div>
          <strong>{totalPrice} P</strong>
          <span className="ml-1 text-gray-300">({quantity}장)</span>
        </div>
      </div>

      <Button
        type="purchase"
        onClick={() => onBuy(quantity)}
        disabled={remaining === 0 || isLoading}
        className="h-[75px]  lg:h-[80px]"
      >
        {remaining === 0
          ? "품절되었습니다"
          : isLoading
          ? "구매 중..."
          : "포토카드 구매하기"}
      </Button>
    </div>
  );
}
