"use client";

import React, { useEffect, useRef, useState } from "react";
import Search from "../ui/Search";
import closeIcon from "@/assets/close.svg";
import Image from "next/image";

import CardSellDetail from "./CardSellDetail";
import MyCard from "../PhotoCard/MyCard";
import { useQuery } from "@tanstack/react-query";
import { getMyCards } from "@/lib/api/api-users";

export default function MyCardModal({ isOpen, onClose, currentUserId }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const startY = useRef(null);

  const { data, isLoading } = useQuery({
    queryKey: ["myGalleryForModal"],
    queryFn: getMyCards,
    enabled: isOpen,
    onSuccess: (res) => {
      console.log("myGallery 응답:", res);
    },
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      if (typeof window !== "undefined") {
        setIsDesktop(window.innerWidth >= 1024);
      }
    }
  }, [isOpen]);

  // 기존 close 로직 유지
  const handleClose = () => {
    if (isDesktop) {
      setIsVisible(false);
      onClose();
    } else {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setIsVisible(false);
        onClose();
      }, 300);
    }
  };

  // 모달 닫기용 배경 클릭 처리
  const handleBackgroundClick = () => {
    if (!isClosing) handleClose();
  };

  // 모달 내부 클릭 이벤트 막기
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  // 슬라이드 바 영역 클릭 시에도 닫기
  const handleSlideBarClick = () => {
    handleClose();
  };

  // 마우스 이벤트 (PC)
  const handleMouseDown = (e) => {
    startY.current = e.clientY;
  };
  const handleMouseUp = (e) => {
    if (startY.current !== null && e.clientY - startY.current > 30) {
      handleClose();
    }
    startY.current = null;
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 backdrop-brightness-30 ${
        isDesktop ? "flex items-center justify-center" : "flex items-end"
      }`}
      onClick={handleBackgroundClick}
    >
      <div
        className={`relative
    ${
      isDesktop
        ? "rounded-sm w-[1160px] max-h-[920px]"
        : "w-full h-[90%] rounded-t-sm"
    }
    bg-my-black p-4 md:p-6 lg:px-30 lg:pb-20 lg:pt-13
    ${isDesktop ? "" : isClosing ? "animate-slide-down" : "animate-slide-up"}
    flex flex-col
  `}
        onClick={stopPropagation}
      >
        <button
          onClick={handleClose}
          className="hidden lg:block absolute top-8 right-8 z-50 "
        >
          <Image src={closeIcon} alt="닫기" width={17} height={17} />
        </button>

        {/* 슬라이드 바 */}
        {!isDesktop && (
          <div
            className="w-10 h-1 bg-gray-600 rounded-full mx-auto mb-3"
            onClick={handleSlideBarClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          />
        )}

        {showDetail && selectedCard ? (
          <CardSellDetail
            card={selectedCard}
            availableCards={
              data?.items?.find((c) => c.id === selectedCard.photoCard.id)
                ?.userCards || []
            }
            onClose={() => {
              setSelectedCard(null);
              setShowDetail(false);
            }}
          />
        ) : (
          <>
            <div className="text-start text-gray-300 mb-2 md:mb-8 md:mt-6 lg:mt-0.5 title-14 md:title-18 lg:title-24">
              마이갤러리
            </div>

            {/* Title */}
            <div className="text-start text-white mb-4 title-24 md:title-40-1 lg:title-46-1">
              나의 포토카드 판매하기
            </div>

            {/* md 이상일 때만 보이는 구분선 */}
            <div className="hidden md:block w-full h-[2px] bg-gray-200 mb-4" />

            {/* 카드 리스트 */}
            <div
              className={`grid grid-cols-2 gap-4 ${
                isDesktop ? "overflow-y-auto" : "overflow-y-auto h-[75%]"
              } pb-10 flex-1`}
            >
              {isLoading ? (
                <div className="text-white">잠시만 기다려주세요</div>
              ) : (
                data?.items?.map((card) => {
                  const representativeUserCard = card.userCards[0];

                  return (
                    <div
                      key={card.id}
                      onClick={() => {
                        setSelectedCard({
                          photoCard: card,
                          userCard: representativeUserCard,
                        });
                        setShowDetail(true);
                      }}
                    >
                      <MyCard
                        name={card.name}
                        image={card.imageUrl}
                        gradeId={card.grade?.id}
                        genre={card.genre?.name}
                        nickname={card?.creator?.nickname || "Unknown"}
                        totalQuantity={card.totalQuantity}
                        initialPrice={representativeUserCard?.price}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
