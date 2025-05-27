import BaseCardList from "../ui/BaseCardList";
import FilterDropdown from "../FllterDropdown/FilterDropdown";
import Search from "../ui/Search";
import Sort from "../ui/Sort";
import { Suspense } from "react";
import HomeFallbackCount from "../skeletons/HomeFallbackCount";
import NoResultMessage from "../ui/NoResultsMessage";

export default async function BaseCardsSection({ grade, genre, sale }) {
  const API_BASE_URL = "https://six-favoritephoto-4team-be.onrender.com";
  
  const res = await fetch(`${API_BASE_URL}/api/store`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("카드 데이터를 불러오는데 실패했습니다.");
  }
  const data = await res.json();
  // 다중 선택 가능하도록 파싱 함수 (빈 배열 반환)
  function parseFilterValue(value) {
    if (!value) return [];
    if (value.includes(",")) {
      return value.split(",").map((v) => Number(v));
    }
    return [Number(value)];
  }

  const gradesArray = parseFilterValue(grade);
  const genresArray = parseFilterValue(genre);

  // 응답 객체에서 배열 꺼내기
  const cardsArray = Array.isArray(data.sales) ? data.sales : [];

  // 필터 카운트들
  const gradeCounts = data.counts?.grade || [];
  const genreCounts = data.counts?.genre || [];
  const saleCounts = data.counts?.sale || [];

  const filtered = cardsArray.filter((card) => {
    const matchGrade =
      !gradesArray.length || gradesArray.includes(card.cardGrade?.id);

    const matchGenre =
      !genresArray.length || genresArray.includes(card.cardGenre?.id);

    const matchSale = !sale
      ? true
      : sale === "판매중"
      ? card.status === "AVAILABLE"
      : card.status !== "AVAILABLE";

    return matchGrade && matchGenre && matchSale;
  });

  return (
    <>
      <div className="py-5 md:pb-7 lg:pb-14">
        <div className="flex flex-col gap-4">
          <div className="md:hidden">
            <Search />
          </div>
          <div className="md:hidden w-full h-[1px] bg-gray-400" />
        </div>
        <div className="flex items-center justify-between md:justify-start my-4 md:my-0">
          <div className="hidden md:block">
            <Search />
          </div>
          <FilterDropdown
            visibleFilters={["grade", "genre", "sale"]}
            filteredCount={filtered.length}
            gradeCounts={gradeCounts}
            genreCounts={genreCounts}
            saleCounts={saleCounts}
          />
          <Sort />
        </div>
      </div>
      {filtered.length === 0 ? (
        <NoResultMessage message={"필터링 결과가 존재하지 않습니다."} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-20">
          <Suspense fallback={<HomeFallbackCount count={12} />}>
            <BaseCardList cards={filtered} />
          </Suspense>
        </div>
      )}
    </>
  );
}
