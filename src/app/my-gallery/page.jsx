"use client";

import React, { useState } from "react";
import GalleryTitle from "./_components/GalleryTitle";
import MyCard from "@/components/PhotoCard/MyCard";
import { useQuery } from "@tanstack/react-query";
import { getCardsCount, getMyCards } from "@/lib/api/api-users";
import OwnedCards from "./_components/OwnedCards";
import Search from "@/components/ui/Search";
import FilterDropdown from "@/components/FllterDropdown/FilterDropdown";
import useFilter from "@/hooks/useFilter";
import Pagination from "@/components/ui/Pagination";

export default function MyPage() {
  const [page, setPage] = useState(1);

  const grade = null;
  const genre = null;
  const search = null;
  const size = 16;

  // 카드 데이터 불러오기
  const { data, isPending, isError } = useQuery({
    queryKey: ["myGalleryCards_v5", grade, genre, search, page, size],
    queryFn: () => getMyCards({ grade, genre, search, page, size }),
    keepPreviousData: true,
  });

  // 카드 개수 불러오기 (전체 + 등급별)
  const { data: count } = useQuery({
    queryKey: ["countedCards"],
    queryFn: getCardsCount,
  });

  console.log("전체 data", data);
  // const { filteredData, gradeForFilter, genreForFilter } = useFilter(
  //   data || []
  // );

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
        <div className="flex items-center">
          {/* <Search />
          <FilterDropdown
            visibleFilters={["grade", "genre"]}
            gradeCounts={gradeForFilter}
            genreCounts={genreForFilter}
          /> */}
        </div>
        {/* 카드 렌더링 ↓ */}
        <section className="grid grid-cols-2 lg:grid-cols-3">
          {/* {filteredData.length > 0 && */}
          {data?.items.map((card) => {
            console.log(card);
            return (
              <MyCard
                key={card.id}
                name={card.name}
                image={card.imageUrl}
                nickname={card.creator?.nickname || "나"}
                genre={card.genre?.name}
                gradeId={card.gradeId}
                initialPrice={card.userCards?.[0]?.price}
                totalQuantity={card.totalQuantity}
              />
            );
          })}
        </section>
      </section>
      <div className="flex justify-center mb-20">
        <Pagination
          totalPages={data?.pagination.totalPages}
          currentPage={data?.pagination.currentPage}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </>
  );
}
