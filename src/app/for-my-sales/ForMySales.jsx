"use client";

import React from "react";
import { getCardsCount, getMyCardsOnSale } from "@/lib/api/api-users";
import { useQuery } from "@tanstack/react-query";
import { Title } from "@/components/ui/Title";
import ForSale from "@/components/PhotoCard/ForSale";
import OwnedCards from "../my-gallery/_components/OwnedCards";
import Search from "@/components/ui/Search";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { use4Filter } from "@/hooks/useFilter";
import Pagination from "@/components/ui/Pagination";
import FilterDropdown from "@/components/FllterDropdown/FilterDropdown";
import SaleGalleryFilter from "@/components/BottomSheet/SaleGaileryFilter";

export default function ForMySales() {
  // 쿼리 문자열 처리
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { isOpen, toggle, close, filterOptions } = use4Filter();

  const grade = Number(searchParams.get("grade")) || 0;
  const genre = Number(searchParams.get("genre")) || 0;
  const keyword = searchParams.get("keyword") || "";
  const page = Number(searchParams.get("page") || 1);
  const size = searchParams.get("size") || "md";
  const saleType = searchParams.get("saleType") || "";
  const sale = searchParams.get("sale") || "";

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["mysales_v2", grade, genre, keyword, saleType, sale, page, size],
    queryFn: () =>
      getMyCardsOnSale({
        grade,
        genre,
        keyword,
        saleType,
        sale,
        page,
        size,
      }),
  });

  // 필터 변경
  const onFilterChange = (type, value) => {
    const params = new URLSearchParams(searchParams.toString());

    // 전체 선택: 필터 제거
    value === 0 ? params.delete(type) : params.set(type, value.toString());
  };

  // 카드 개수 불러오기 (전체 + 등급별)
  const { data: count } = useQuery({
    queryKey: ["countedCards"],
    queryFn: getCardsCount,
  });

  // 페이지 바꾸는 함수
  const onPageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isPending) return <p>로딩 중...</p>;
  if (isError) console.error(error);

  return (
    <>
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
    </>
  );
}
