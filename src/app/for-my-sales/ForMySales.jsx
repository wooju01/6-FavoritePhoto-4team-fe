"use client";

import React from "react";
import { Title } from "@/components/ui/Title";
import ForSale from "@/components/PhotoCard/ForSale";
import OwnedCards from "../my-gallery/_components/OwnedCards";
import Search from "@/components/ui/Search";
import Pagination from "@/components/ui/Pagination";
import FilterDropdown from "@/components/FllterDropdown/FilterDropdown";
import SaleGalleryFilter from "@/components/BottomSheet/SaleGaileryFilter";
import useMySales from "@/hooks/useMySales";
import { use4Filter } from "@/hooks/useFilter";

export default function ForMySales() {
  // ✅ 페이지 관련 함수, 상태 등
  const {
    data,
    count,
    isPending,
    isError,
    error,
    page, // 다른 건 data로 받으면 되는데 page는 따로 계산해야 함
    onFilterChange,
    onPageChange,
  } = useMySales();

  // ✅ 필터 관련 정보 가져옴
  const { isOpen, toggle, close, filterOptions } = use4Filter();

  // ✅ 로딩 중 + 오류 났을 때 디자인
  if (isPending)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>로딩 중입니다...</p>
        <svg
          className="ml-3 size-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );
  if (isError) console.error(error);

  return (
    <div className="my-5">
      <header className="hidden md:block my-10">
        <Title title="나의 판매 포토카드" font="titleLg_Bk" />
      </header>
      <OwnedCards
        totalCards={count?.active.total}
        countsByGrade={count?.active.byGrade}
      />
      <section className="mb-15">
        <div className="flex items-center mb-5 md:mb-10 lg:mb-12 gap-7 lg:gap-10">
          <div className="order-2 md:order-1">
            <Search />
          </div>
          {/* filter */}
          <div className="hidden md:flex items-center gap-6 flex-1 order-1 md:order-2">
            {Object.values(filterOptions).map((option) => (
              <FilterDropdown
                key={option.key}
                option={option}
                isOpen={isOpen === option.key}
                onToggle={() => toggle(option.key)}
                onClose={close}
                onSelect={(value) => onFilterChange(option.key, value)}
              />
            ))}
          </div>
          {/* 모바일 filter 버튼 */}
          <SaleGalleryFilter />
        </div>
        {/* 카드 렌더링 ↓ */}
        <section className="py-4 md:py-6 lg:py-8 grid grid-cols-2 gap-2 md:gap-4 lg:gap-14 lg:grid-cols-3">
          {data?.items.map((card) => (
            <ForSale
              key={card.id}
              name={card?.photoCard.name}
              image={card?.photoCard.imageUrl}
              nickname={card?.photoCard.creator?.nickname || "나"}
              genre={card?.photoCard.genre?.name}
              gradeId={card?.photoCard.grade?.id}
              initialPrice={
                card.price ? card.price : card?.photoCard.initialPrice
              }
              remainingQuantity={card.saleQuantity}
              status={card.status}
            />
          ))}
        </section>
      </section>
      <div className="flex justify-center mb-20">
        <Pagination
          totalPages={data?.pagination.totalPages}
          currentPage={page}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
