"use client";

import React from "react";
import GalleryTitle from "./_components/GalleryTitle";
import MyCard from "@/components/PhotoCard/MyCard";
import { useQuery } from "@tanstack/react-query";
import { getCardsCount, getMyCards } from "@/lib/api/api-users";
import OwnedCards from "./_components/OwnedCards";

export default function MyPage() {
  // 카드 데이터 불러오기
  const { data, isPending, isError } = useQuery({
    queryKey: ["myGalleryCards_v2"],
    queryFn: getMyCards,
  });

  // 카드 개수 불러오기 (전체 + 등급별)
  const { data: count } = useQuery({
    queryKey: ["cardsCount"],
    queryFn: getCardsCount,
  });

  const isDisabled = data?.count !== 0;

  return (
    <>
      <GalleryTitle creationNumber={data?.count ?? 0} disabled={isDisabled} />
      {console.log(data)}
      <OwnedCards
        name={data?.owner?.nickname}
        totalCards={count?.active.total}
        countsByGrade={count?.active.byGrade}
      />
      {/* 카드 렌더링 ↓ */}
      <section>
        {data?.map((card) => (
          <MyCard
            key={card.id}
            name={card.photoCard.name}
            image={card.photoCard.imageUrl}
            nickname={card.owner?.nickname || "나"}
            genre={card.photoCard?.genre?.name}
            gradeId={card.photoCard?.gradeId}
            initialPrice={card.price}
            totalQuantity={card.photoCard.totalQuantity}
          />
        ))}
      </section>
    </>
  );
}
