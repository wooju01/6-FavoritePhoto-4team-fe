"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Sort from "@/components/ui/Sort";

const mockdata = [
  // 가데이터 ↔ DB에 저장된 데이터 (안 씀)
  { id: "1", name: "풍경화1", price: "1", createdAt: "4" },
  { id: "2", name: "풍경화2", price: "4", createdAt: "3" },
  { id: "3", name: "풍경화3", price: "3", createdAt: "2" },
  { id: "4", name: "풍경화4", price: "2", createdAt: "1" },
  { id: "5", name: "풍경화5", price: "5", createdAt: "5" },
];

const sortMockData = (data, orderBy) => {
  // 가-api 함수 (BE에서 처리하므로 .sort 쓸 일은 없음 = 안 씀22)
  return [...data].sort((a, b) => {
    switch (orderBy) {
      case "price_asc":
        return Number(a.price) - Number(b.price);
      case "price_desc":
        return Number(b.price) - Number(a.price);
      case "created_desc":
        return Number(b.createdAt) - Number(a.createdAt);
      default:
        return 0;
    }
  });
};

export default function TempSort() {
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderBy") ?? "price_asc";

  const sortedData = useMemo(() => sortMockData(mockdata, orderBy), [orderBy]);

  return (
    <>
      <Sort />
      {sortedData?.map((data) => {
        return <div key={data.id}>{data.name}</div>;
      })}
    </>
  );
}
