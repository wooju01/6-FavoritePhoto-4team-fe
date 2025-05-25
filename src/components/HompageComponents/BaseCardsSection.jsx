import BaseCardList from "../ui/BaseCardList";
import FilterDropdown from "../FllterDropdown/FilterDropdown";
import Search from "../ui/Search";
import Sort from "../ui/Sort";
import { Suspense } from "react";
import HomeFallbackCount from "../skeletons/HomeFallbackCount";
import NoResultMessage from "../ui/NoResultsMessage";


export default async function BaseCardsSection({ grade, genre, sale }) {
  const API_BASE_URL = "https://six-favoritephoto-4team-be.onrender.com";

  const res = await fetch(`${API_BASE_URL}/api/store`, { next: { revalidate: 60 } }); // 데이터 타임 설정
  if (!res.ok) {
    throw new Error("카드 데이터를 불러오는데 실패했습니다.");
  }
  const data = await res.json();

  // 필터링 : grade, genre는 id 값으로 필터링 (문자면 숫자 변환 필요)
  const filtered = data.filter((card) => {
    const matchGrade = !grade || card.gradeId === Number(grade);
    const matchGenre = !genre || card.genreId === Number(genre);
    const matchSale = !sale || (sale === "판매중" ? card.sale === "판매중" : card.sale === "판매완료");

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
          <FilterDropdown visibleFilters={["grade", "genre", "sale"]} />
          <Sort />
        </div>
      </div>
      {
        filtered.length === 0 ? (
          <NoResultMessage message={"필터링 결과가 존재하지 않습니다."}/>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-20">
            {/* 서스펜스 스켈레톤 동작 */}
            <Suspense key={filtered} fallback={<HomeFallbackCount count={12} />}>
              <BaseCardList cards={filtered} />
            </Suspense>
          </div>
        )
      }

    </>
  );
}
