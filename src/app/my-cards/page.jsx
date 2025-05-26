"use client";
import React from "react";
import example from "@/assets/example.svg";
import MyCard from "@/components/PhotoCard/MyCard";

export default function MyCardsPage() {
  // 예시 데이터
  const cards = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: "How Far I’ll Go",
    image: example,
    gradeId: 2, // GradeTag에서 이미 숫자로 설정
    genreId: 2,
    nickname: "랍스타",
    initialPrice: 4,
    totalQuantity: 1,
  }));

  return (
    <main className="md:p-4 lg:p-10">
      <h1 className="text-2xl font-bold mb-6">나의 카드</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-15">
        {cards.map((card) => (
          <MyCard key={card.id} {...card} />
        ))}
      </div>
    </main>
  );
}
