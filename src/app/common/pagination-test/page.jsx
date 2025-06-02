"use client";

import { useState, useEffect } from "react";
import Pagination from "@/components/ui/Pagination";
import { getMyCards } from "@/lib/api/api-users";
import MyCard from "@/components/PhotoCard/MyCard"; // MyCard 컴포넌트 임포트
import { useQuery } from "@tanstack/react-query";

// 테마에서 제공된 브레이크포인트 값
const BREAKPOINT_SM = 375;

const BREAKPOINT_LG = 1480;

const getPageSizeIdentifier = (width) => {
  if (width <= BREAKPOINT_SM) {
    // 375px 이하일 때
    return "sm";
  } else if (width < BREAKPOINT_LG) {
    // 375px 초과, 1480px 미만일 때
    return "md";
  } else {
    // 1480px 이상일 때
    return "lg";
  }
};

export default function PaginationTestPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const [pageSize, setPageSize] = useState(() => {
    if (typeof window !== "undefined") {
      return getPageSizeIdentifier(window.innerWidth);
    }
    return "lg"; // SSR 또는 window 객체 접근 불가능 시 기본값 "lg" (또는 "md" 등 적절한 값으로 설정 가능)
  });

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSizeIdentifier(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    data: galleryData,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["myGallery", currentPage, pageSize],
    queryFn: () => getMyCards({ page: currentPage, size: pageSize }),
    keepPreviousData: true,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const items = galleryData?.items || [];
  const totalPages = galleryData?.pagination?.totalPages || 1;

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">
        갤러리 페이지네이션 테스트 (현재 pageSize: {pageSize}){" "}
      </h1>

      {isLoading && !isFetching && (
        <p className="text-center py-10">갤러리 로딩 중...</p>
      )}
      {isFetching && (
        <p className="text-center py-10">다음 페이지 로딩 중...</p>
      )}
      {error && (
        <p className="text-center text-red-500 py-10">에러: {error.message}</p>
      )}

      {!isLoading && !error && (
        <>
          {items.length === 0 && !isLoading && !isFetching ? (
            <p className="col-span-full text-center py-10 text-gray-500">
              표시할 아이템이 없습니다.
            </p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-15">
              {items.map((item) => (
                <MyCard
                  key={item.id}
                  name={item.photoCard?.name || "이름 없음"}
                  gradeId={item.photoCard?.gradeId}
                  genreId={item.photoCard?.genreId}
                  nickname={
                    item.photoCard?.creator?.nickname || "아티스트 정보 없음"
                  }
                  totalQuantity={item.photoCard?.totalQuantity}
                  initialPrice={item.price}
                />
              ))}
            </div>
          )}
          <div className="my-8 flex flex-col items-center">
            <p className="text-center mb-4 text-gray-400">
              {" "}
              현재 페이지: {currentPage} / 총 페이지: {totalPages}
              {items.length > 0 && ` (현재 페이지에 ${items.length}개 표시)`}
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}
