"use client";

import React from "react";
import example from "@/assets/example.svg";
import ForSale from "@/components/PhotoCard/ForSale";

export default function ForSalePage() {
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
    <main className="md:p-4 lg:p-10">
      <h1 className="text-2xl font-bold mb-6">판매 중인 카드</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-10">
        {cards.map((card) => (
          <ForSale key={card.id} {...card} />
        ))}
      </div>
    </main>
  );
}
