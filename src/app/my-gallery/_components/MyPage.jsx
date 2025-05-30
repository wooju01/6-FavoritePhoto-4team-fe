"use client";

import React from "react";
import MyCard from "@/components/PhotoCard/MyCard";
// import FilterDropdown from "@/components/FllterDropdown/FilterDropdown";
import Pagination from "@/components/ui/Pagination";
import Search from "@/components/ui/Search";
import { useQuery } from "@tanstack/react-query";
import { getCardsCount, getMyCards } from "@/lib/api/api-users";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GalleryTitle from "./GalleryTitle";
import OwnedCards from "./OwnedCards";
import { useGalleryFilter } from "@/hooks/useFilter";

export default function MyPage() {
  // 쿼리 문자열 처리
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { isOpen, toggle, close, filterOptions } = useGalleryFilter();

  const grade = Number(searchParams.get("grade")) || 0;
  const genre = Number(searchParams.get("genre")) || 0;
  const keyword = searchParams.get("keyword") || "";
  const page = Number(searchParams.get("page") || 1);
  const size = searchParams.get("size") || "md";

  // 카드 데이터 불러오기
  const { data, isPending, isError } = useQuery({
    queryKey: ["myGalleryCards_v8", grade, genre, keyword, page, size],
    queryFn: () => getMyCards({ grade, genre, keyword, page, size }),
    enabled: true, // 항상 실행
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
  if (isError) return <p>오류 발생</p>;

  return (
    <>
      <GalleryTitle />
      <OwnedCards
        totalCards={count?.active.total}
        countsByGrade={count?.active.byGrade}
      />
      <section className="mb-15">
        <div className="flex items-center mb-5 gap-7 lg:gap-10">
          <div>
            <Search />
          </div>
          <div className="flex gap-6">
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
        </div>
        {/* 카드 렌더링 ↓ */}
        <section className="grid grid-cols-2 lg:grid-cols-3">
          {data?.items.map((card) => (
            <MyCard
              key={card.id}
              name={card.name}
              image={card.imageUrl}
              nickname={card.userCards?.owner?.nickname}
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