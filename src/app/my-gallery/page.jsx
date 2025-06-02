"use client";

import React from "react";
import MyCard from "@/components/PhotoCard/MyCard";
import GalleryTitle from "./_components/GalleryTitle";
import OwnedCards from "./_components/OwnedCards";

import { use2Filter } from "@/hooks/useFilter";
import { useMyPage } from "@/hooks/useMyPage";

import FilterDropdown from "@/components/FllterDropdown/FilterDropdown";
import Pagination from "@/components/ui/Pagination";
import Search from "@/components/ui/Search";
import MyGalleryFilter from "@/components/BottomSheet/Mygalleryfilter";

export default function MyPage() {
  // ✅ 쿼리 문자열 처리
  const {
    data,
    count,
    isPending,
    isError,
    page,
    onFilterChange,
    onPageChange,
  } = useMyPage();

  // ✅ 필터 관련 정보 가져옴
  const { isOpen, toggle, close, filterOptions } = use2Filter();

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
  if (isError) return <p>데이터를 불러오는 데 실패했습니다.</p>;

  return (
    <>
      <GalleryTitle />
      <OwnedCards
        totalCards={count?.active.total}
        countsByGrade={count?.active.byGrade}
      />
      <section className="mb-15">
        <div className="flex items-center mb-5 md:mb-10 lg:mb-12 gap-7 lg:gap-10">
          <div className="order-2 md:order-1 w-full md:w-52 lg:w-[320px]">
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
          <MyGalleryFilter />
        </div>
        {/* 카드 렌더링 ↓ */}
        <section className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-5">
          {data?.items.map((card) => (
            <MyCard
              key={card.id}
              name={card.name}
              image={card.imageUrl}
              nickname={card.creator?.nickname || "나"}
              genre={card.genre?.name}
              gradeId={card.grade?.id}
              initialPrice={card.userCards?.[0]?.price}
              totalQuantity={card.userCards?.length}
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
    </>
  );
}
