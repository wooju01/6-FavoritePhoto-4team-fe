"use client";

import React from "react";
import { getCardsCount, getMyCardsOnSale } from "@/lib/api/api-users";
import { useQuery } from "@tanstack/react-query";
import { Title } from "@/components/ui/Title";
import ForSale from "@/components/PhotoCard/ForSale";
import OwnedCards from "../my-gallery/_components/OwnedCards";
import Search from "@/components/ui/Search";
import example from "@/assets/example.svg";

export default function ForSalePage() {
  // const { data, isPending, isError } = useQuery({
  //   queryKey: ["mysales"],
  //   queryFn: getMyCardsOnSale,
  // });

  // 카드 개수 불러오기 (전체 + 등급별)
  const { data: count } = useQuery({
    queryKey: ["countedCards"],
    queryFn: getCardsCount,
  });

  const cards = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: "How Far I’ll Go",
    image: example,
    gradeId: 1,
    genreId: 2,
    nickname: "랍스타",
    initialPrice: 4,
    remainingQuantity: 1,
    status: i === 0 ? "SOLDOUT" : i % 2 === 0 ? "AVAILABLE" : "PENDING", // 그냥 모두 한번에 보이게 하려고 넣음
  }));

  return (
    <>
      <header className="hidden md:block my-10">
        <Title title="나의 판매 포토카드" font="titleLg_Bk" />
      </header>
      <OwnedCards
        totalCards={count?.inactive.total}
        countsByGrade={count?.inactive.byGrade}
      />
      <section className="mb-15">
        <div className="flex items-center mb-5">
          {/* <Search /> */}
          {/*<FilterDropdown
            visibleFilters={["grade", "genre"]}
            gradeCounts={gradeForFilter}
            genreCounts={genreForFilter}
          /> */}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-10">
          {cards.map((card) => (
            <ForSale key={card.id} {...card} />
          ))}
        </div>
      </section>
    </>
  );
}