import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import BaseCardList from "../ui/BaseCardList";
import Search from "../ui/Search";
// import Sort from "../ui/Sort";
import { Suspense } from "react";
import HomeFallbackCount from "../skeletons/HomeFallbackCount";
import NoResultMessage from "../ui/NoResultsMessage";
import { storeService } from "@/lib/api/api-store";
import FilterControls from "../ui/FilterControls";
import Sort from "../ui/Sort";
import FilterSheetControls from "../BottomSheet/FilterSheetControls";

export default async function BaseCardsSection({
  grade,
  genre,
  sale,
  keyword,
  orderBy,
}) {
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

  const data = await storeService.getAllStoreCards(filters, true); 

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
          <div className="hidden md:flex items-center gap-7 flex-1 ml-10">
            <FilterControls />
          </div>
          {/* 모바일 filter 버튼 */}
          <FilterSheetControls/>
          <Sort />
        </div>
      </div>
      {data.sales.length === 0 ? (
        <NoResultMessage message={"필터링 결과가 존재하지 않습니다."} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-20">
          <Suspense
            key={
              data.sales || data.photoCard || data.cardGrade || data.cardGenre
            }
            fallback={<HomeFallbackCount count={12} />}
          >
            <BaseCardList cards={data.sales} />
          </Suspense>
        </div>
      )}
    </>
  );
}
