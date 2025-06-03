"use client";

import React, { useEffect, useState } from "react";
import CardSellDetail from "./CardSellDetail";

export default function EditCardModal({
  card,
  availableCards,
  onCloseModal,
  onCloseDetail,
  isEditMode,
  onEditSuccess,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    if (typeof window !== "undefined") {
      setIsDesktop(window.innerWidth >= 1024);
    }
  }, []);

  const handleClose = () => {
    if (isDesktop) {
      setIsVisible(false);
      onCloseModal?.();
    } else {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setIsVisible(false);
        onCloseDetail?.();
      }, 300);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* 배경 덮개 */}
      <div
        className="fixed inset-0 bg-black/40 z-[8000]"
        onClick={handleClose}
      />

      {/* 실제 모달 컨테이너 */}
      <div
        className={`fixed inset-0 z-[8001] ${
          isDesktop ? "flex justify-center" : "flex items-end"
        }`}
        onClick={handleClose}
      >
        <div
          className={`bg-gray-500 w-full ${
            isDesktop
              ? "rounded-sm max-w-[1160px] max-h-[1020px] p-20"
              : "h-[90%] rounded-t-sm"
          } ${isClosing ? "animate-slide-down" : "animate-slide-up"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <CardSellDetail
            card={card}
            availableCards={availableCards}
            onCloseModal={handleClose}
            onCloseDetail={handleClose}
            isEditMode={true}
            onEditSuccess={onEditSuccess}
          />
        </div>
      </div>
    </>
  );
}
