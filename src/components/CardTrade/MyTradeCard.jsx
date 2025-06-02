"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Search from "../ui/Search";
import FilterDropdown from "../FllterDropdown/FilterDropdown";
import MyCard from "../PhotoCard/MyCard";
import CardTrade from "./CardTrade.jsx";
import closeIcon from "@/assets/close.svg";
import { getMyCards } from "@/lib/api/api-users";
import { use2Filter } from "@/hooks/useFilter";
import MyGalleryFilter from "../BottomSheet/Mygalleryfilter";

export default function MyTradeCard({
  isOpen,
  onClose,
  currentUserId,
  saleId,
  refetchTradeRequests,
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // URL 쿼리에서 필터값 읽기 (없으면 기본값)
  const grade = Number(searchParams.get("grade")) || 0;
  const genre = Number(searchParams.get("genre")) || 0;
  const keyword = searchParams.get("keyword") || "";

  // 필터 변경 시 URL 쿼리 업데이트
  const onFilterChange = (type, value) => {
    const params = new URLSearchParams(searchParams.toString());

    // value가 0, "", undefined, null일 때는 쿼리에서 제거
    if (
      value === 0 ||
      value === "" ||
      value === undefined ||
      value === null ||
      value === "undefined"
    ) {
      params.delete(type);
    } else {
      params.set(type, value.toString());
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  // use2Filter 훅에서 필터 옵션과 UI 상태 가져오기
  const { isOpen: openDropdown, toggle, close, filterOptions } = use2Filter();

  // 카드 데이터 fetch - 필터가 바뀔 때마다 재실행
  const { data, isLoading, isError } = useQuery({
    queryKey: ["myGalleryForModal", grade, genre, keyword],
    queryFn: () =>
      getMyCards({
        grade,
        genre,
        keyword,
        size: "sm",
      }),
    enabled: isOpen, // 모달 열릴 때만 실행
    keepPreviousData: true,
  });

  // 모달 열릴 때 초기 상태 세팅 (선택 카드, 디테일 뷰 등)
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const startY = useRef(null);

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

  const handleBackgroundClick = () => {
    if (!isClosing) handleClose();
  };

  const stopPropagation = (e) => e.stopPropagation();

  const handleSlideBarClick = () => handleClose();

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
        className={`relative ${
          isDesktop
            ? "rounded-sm w-[1160px] max-h-[920px]"
            : "w-full h-[90%] rounded-t-sm"
        } bg-my-black p-4 md:p-6 lg:px-30 lg:pb-20 lg:pt-13 ${
          isDesktop ? "" : isClosing ? "animate-slide-down" : "animate-slide-up"
        } flex flex-col`}
        onClick={stopPropagation}
      >
        <button
          onClick={handleClose}
          className="hidden lg:block absolute top-8 right-8 z-50"
        >
          <Image src={closeIcon} alt="닫기" width={17} height={17} />
        </button>

        {!isDesktop && (
          <div
            className="w-10 h-1 bg-gray-600 rounded-full mx-auto mb-3"
            onClick={handleSlideBarClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          />
        )}

        {showDetail && selectedCard ? (
          <CardTrade
            selectedCard={selectedCard}
            onClose={handleClose}
            saleId={saleId}
            refetchTradeRequests={refetchTradeRequests}
          />
        ) : (
          <>
            <div className="text-start text-gray-300 mb-2 md:mb-8 md:mt-6 lg:mt-0.5 title-14 md:title-18 lg:title-24">
              마이갤러리
            </div>
            <div className="text-start text-white mb-4 title-24 md:title-40-1 lg:title-46-1">
              포토카드 교환하기
            </div>
            <div className="hidden md:block w-full h-[2px] bg-gray-200 mb-4" />

            {/* 검색 및 필터 */}
            <div className="flex items-center mb-4 gap-4 space-y-4 md:flex md:items-center md:gap-4 md:space-y-0">
              <MyGalleryFilter buttonSize="w-[45px] h-[45px]"/>
              <Search
                value={keyword}
                onChange={(e) => onFilterChange("keyword", e.target.value)}
                placeholder="검색어 입력"
              />
              {Object.values(filterOptions).map((option) => (
                <div className="hidden md:flex ">
                <FilterDropdown
                  key={option.key}
                  option={option}
                  isOpen={openDropdown === option.key}
                  onToggle={() => toggle(option.key)}
                  onClose={close}
                />
                </div>
              ))}
            </div>

            {/* 카드 목록 */}
            <div
              className={`grid grid-cols-2 gap-4 ${
                isDesktop ? "overflow-y-auto" : "overflow-y-auto h-[75%]"
              } pb-10 flex-1`}
            >
              {isLoading ? (
                <div className="text-white">로딩 중...</div>
              ) : isError ? (
                <div className="text-white">오류 발생</div>
              ) : (
                data?.items?.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => {
                      setSelectedCard({
                        photoCard: card,
                        userCard: card.userCards[0],
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
                        card.creator?.id === currentUserId
                          ? "나"
                          : card.creator?.nickname || "Unknown"
                      }
                      totalQuantity={card.userCards?.length}
                      initialPrice={card.userCards[0]?.price}
                    />
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
