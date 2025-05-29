"use client";

import React, { useEffect, useState } from "react";
import MyCard from "@/components/PhotoCard/MyCard";
import FilterDropdown from "@/components/FllterDropdown/FilterDropdown";
import Pagination from "@/components/ui/Pagination";
import Search from "@/components/ui/Search";
import { useQuery } from "@tanstack/react-query";
import { getCardsCount, getMyCards } from "@/lib/api/api-users";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GalleryTitle from "./GalleryTitle";
import OwnedCards from "./OwnedCards";

export default function MyPage() {
  // 쿼리 문자열 처리
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState({
    gradeId: 0, // 전체
    genreId: 0, // 전체22
    keyword: "",
    page: 1,
    size: "md",
  });

  useEffect(() => {
    const newFilters = {
      gradeId: Number(searchParams.get("gradeId")) || 0,
      genreId: Number(searchParams.get("genreId")) || 0,
      keyword: searchParams.get("keyword") || "",
      page: Number(searchParams.get("page") || 1),
      size: searchParams.get("size") || "md",
    };

    setFilters(newFilters);
    console.log("Current filters:", newFilters); // 디버깅용
  }, [searchParams]);

  // 카드 데이터 불러오기
  const { data, isPending, isError } = useQuery({
    queryKey: [
      "myGalleryCards_v8",
      filters.gradeId,
      filters.genreId,
      filters.keyword,
      filters.page,
      filters.size,
    ],
    queryFn: async () => {
      console.log("🔥 fetching with filters", filters);
      const result = await getMyCards(filters);
      console.log("📦 response data", result);
      return result;
    },
    enabled: true, // 항상 실행
  });

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

  // 필터 변경
  const onFilterChange = (type, value) => {
    const params = new URLSearchParams(searchParams.toString());

    // 전체 선택: 필터 제거
    if (value === 0) {
      params.delete(type);
    } else {
      params.set(type, value.toString());
    }

    // 페이지 초기화하고 이동
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  if (isPending) return <p>로딩 중...</p>;
  if (isError) return <p>오류 발생</p>;

  return (
    <>
      <GalleryTitle />
      <OwnedCards
        name={data?.owner?.nickname}
        totalCards={count?.active.total}
        countsByGrade={count?.active.byGrade}
      />
      <section className="mb-15">
        <div className="flex items-center mb-5">
          <div>
            <Search />
          </div>
          {/* <FilterDropdown visibleFilters={["grade", "genre"]} /> */}
        </div>
        {/* 카드 렌더링 ↓ */}
        <section className="grid grid-cols-2 lg:grid-cols-3">
          {/* {filteredData.length > 0 && */}
          {data?.items.map((card) => (
            <MyCard
              key={card.id}
              name={card.name}
              image={card.imageUrl}
              nickname={card.creator?.nickname || "나"}
              genre={card.genre?.name}
              gradeId={card.gradeId}
              initialPrice={card.userCards?.[0]?.price}
              totalQuantity={card.userCards?.length}
            />
          ))}
        </section>
      </section>
      <div className="flex justify-center mb-20">
        <Pagination
          totalPages={data?.pagination.totalPages}
          currentPage={filters.page}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}
