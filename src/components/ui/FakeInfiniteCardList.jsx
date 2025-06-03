"use client";

import { useEffect, useRef, useState } from "react";
import NoResultMessage from "./NoResultsMessage";
import BaseCardList from "./BaseCardList";

export default function FakeInfiniteCardList({ allCards }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const observerRef = useRef(null);

  const visibleCards = allCards.slice(0, page * itemsPerPage);
  const hasMore = visibleCards.length < allCards.length;

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((prev) => {
            if (visibleCards.length >= allCards.length) return prev;
            return prev + 1;
          });
        }
      },
      {
        rootMargin: "100px", // 스크롤 여유 줘서 자동 반복 방지
        threshold: 1.0,
      }
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [page, hasMore]);

  if (!allCards || allCards.length === 0) {
    return <NoResultMessage message="필터링 결과가 존재하지 않습니다." />;
  }

  return (
  <>
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-20">
      <BaseCardList cards={visibleCards} />
    </div>
    {hasMore && (
      <div
        ref={observerRef}
        className="h-40 w-full bg-red-200 opacity-20" // 일단 보이게 해둬
      />
    )}
  </>
);

}
