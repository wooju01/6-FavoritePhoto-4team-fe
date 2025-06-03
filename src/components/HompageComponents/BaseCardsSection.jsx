"use client";

import { useEffect, useRef, useState } from "react";
import Search from "../ui/Search";
import FilterControls from "../ui/FilterControls";
import FilterSheetControls from "../BottomSheet/FilterSheetControls";
import Sort from "../ui/Sort";
import BaseCardList from "../ui/BaseCardList";
import NoResultMessage from "../ui/NoResultsMessage";
import HomeFallbackCount from "../skeletons/HomeFallbackCount"; // 스켈레톤 import
import { storeService } from "@/lib/api/api-store";

export default function BaseCardsSection({ grade, genre, sale, keyword, orderBy }) {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  const orderByMap = {
    price_asc: "낮은 가격순",
    price_desc: "높은 가격순",
    created_desc: "최신순",
  };

  const filters = {
    grade: grade ?? null,
    genre: genre ?? null,
    sale: sale ?? null,
    keyword: keyword ?? null,
    orderBy: orderByMap[orderBy] ?? "낮은 가격순",
  };

  // 🔁 필터 변경 시 카드 초기화 + 첫 페이지 fetch
  useEffect(() => {
    const fetchInitialCards = async () => {
      setLoading(true);
      const res = await storeService.getAllStoreCards({ ...filters, page: 1, limit: 12 });
      setCards(res.sales);
      setHasMore(res.sales.length === 12);
      setLoading(false);
    };

    setPage(1);
    setHasMore(true);
    fetchInitialCards();
  }, [grade, genre, sale, keyword, orderBy]);

  // 📦 page 증가 시 추가 데이터 fetch
  useEffect(() => {
    if (page === 1) return;

    const fetchMoreCards = async () => {
      setLoading(true);
      const res = await storeService.getAllStoreCards({ ...filters, page, limit: 12 });
      setCards((prev) => [...prev, ...res.sales]);
      if (res.sales.length < 12) setHasMore(false);
      setLoading(false);
    };

    fetchMoreCards();
  }, [page]);

  // 👁️ observer (무한 스크롤)
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    }, { rootMargin: "100px" });

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasMore]);

  return (
    <>
      <div className="py-5 md:pb-7 lg:pb-14">
        <div className="flex flex-col gap-4">
          <div className="md:hidden"><Search /></div>
          <div className="md:hidden w-full h-[1px] bg-gray-400" />
        </div>

        <div className="flex items-center justify-between md:justify-start my-4 md:my-0">
          <div className="hidden md:block"><Search /></div>
          <div className="hidden md:flex items-center gap-7 flex-1 ml-10">
            <FilterControls />
          </div>
          <FilterSheetControls />
          <Sort />
        </div>
      </div>

      {loading && page === 1 ? (
        // 초기 로딩 스켈레톤
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-14">
          <HomeFallbackCount count={12} />
        </div>
      ) : !loading && cards.length === 0 && page === 1 ? (
        // 로딩이 끝났고, 결과가 정말 없을 때
        <NoResultMessage message="필터링 결과가 존재하지 않습니다." />
      ) : (
        // 정상 데이터 렌더링
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-14">
          <BaseCardList cards={cards} />
        </div>
      )}

      <div ref={observerRef} className="w-full h-[1px]" />
    </>
  );
}
