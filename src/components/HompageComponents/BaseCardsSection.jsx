import BaseCardList from "../ui/BaseCardList";
import FilterDropdown from "../FllterDropdown/FilterDropdown";
import Search from "../ui/Search";
import Sort from "../ui/Sort";
import { Suspense } from "react";
import HomeFallbackCount from "../skeletons/HomeFallbackCount";
import NoResultMessage from "../ui/NoResultsMessage";
import { storeService } from "@/lib/api/api-store";

export default async function BaseCardsSection({ grade, genre, sale }) {
let data;
try {
  data = await storeService.getAllStoreCards(); 
} catch (error) {
  throw new Error("카드 데이터를 불러오는데 실패했습니다.");
}


  function parseFilterValue(value) {
    if (!value) return [];
    if (value.includes(",")) {
      return value.split(",").map((v) => Number(v));
    }
    return [Number(value)];
  }

  const gradesArray = parseFilterValue(grade);
  const genresArray = parseFilterValue(genre);

  const cardsArray = Array.isArray(data.sales) ? data.sales : [];

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
