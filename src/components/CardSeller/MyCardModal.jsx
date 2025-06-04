"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import MyCard from "../PhotoCard/MyCard";
import CardSellDetail from "./CardSellDetail";
import closeIcon from "@/assets/close.svg";
import { getMyCards } from "@/lib/api/api-users";
import SearchModalOnly from "../ModalOnly/SearchModalOnly";
import FilterControlsModalOnly from "../ModalOnly/FilterControlsModalOnly";
import MyGalleryFilter from "../BottomSheet/Mygalleryfilter";

export default function MyCardModal({ isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const startY = useRef(null);

  const [keyword, setKeyword] = useState("");
  const [grade, setGrade] = useState("");
  const [genre, setGenre] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["myGalleryForModal", grade, genre, keyword],
    queryFn: () => getMyCards({ grade, genre, keyword, size: "sm" }),
    enabled: isOpen,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setShowDetail(false);
      setSelectedCard(null);
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

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  if (!isOpen && !isVisible) return null;

  return (
    <>
      {/* 헤더 포함 전체를 덮는 배경 클릭 레이어 */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-brightness-75 z-[8000]"
        onClick={handleBackgroundClick}
      />

      {/* 실제 모달 컨테이너 */}
      <div
        className={`fixed inset-0 z-[8001] ${
          isDesktop ? "flex items-center justify-center" : "flex items-end"
        }`}
      >
        <div
          className={`relative
    ${
      isDesktop
        ? "rounded-sm w-[1160px] max-h-[920px]"
        : "w-full h-[90%] rounded-t-sm"
    }
    bg-gray-500 p-4 md:p-6 lg:px-30 lg:pb-20 lg:pt-13
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
              onCloseDetail={() => {
                setSelectedCard(null);
                setShowDetail(false);
              }} // CardSellDetail만 닫는 함수
              {...(isDesktop && { onCloseModal: handleClose })}
              onCloseModal={handleClose}
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

              <div className="flex items-center gap-3 mb-2 space-y-4 md:flex md:items-center md:gap-7 lg:gap-15 md:space-y-0">
                <MyGalleryFilter buttonSize="w-[55px] h-[44px]" />
                <SearchModalOnly
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onSearch={() => refetch()}
                  placeholder="검색어 입력"
                />
                <div className="gap-7 hidden md:flex">
                  <FilterControlsModalOnly
                    onChange={(key, id) => {
                      if (key === "grade") setGrade(id);
                      if (key === "genre") setGenre(id);
                    }}
                  />
                </div>
              </div>

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
                          nickname={
                            representativeUserCard?.owner?.nickname || "Unknown"
                          }
                          totalQuantity={card.userCards?.length}
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
    </>
  );
}
