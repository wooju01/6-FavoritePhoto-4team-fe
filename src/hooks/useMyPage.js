"use client";

import { useQuery } from "@tanstack/react-query";
import { getCardsCount, getMyCards } from "@/lib/api/api-users";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useMyPage() {
  // ✅ hook 가져옴
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // ✅ 쿼리 문자열 처리
  const grade = Number(searchParams.get("grade")) || 0;
  const genre = Number(searchParams.get("genre")) || 0;
  const keyword = searchParams.get("keyword") || "";
  const page = Number(searchParams.get("page") || 1);
  const size = searchParams.get("size") || "md";

  // 데이터 가져오기
  const { data, isPending, isError } = useQuery({
    queryKey: ["myGalleryCards_v8", grade, genre, keyword, page, size],
    queryFn: () => getMyCards({ grade, genre, keyword, page, size }),
  });

  // 카드 개수 가져오기 (전체 + 등급별)
  const { data: count } = useQuery({
    queryKey: ["countedCards"],
    queryFn: getCardsCount,
  });

  // ✅ 필터 변경 함수
  const onFilterChange = (type, value) => {
    const params = new URLSearchParams(searchParams.toString());

    // 전체 선택 시 필터 제거
    value === 0 ? params.delete(type) : params.set(type, value.toString());
  };

  // ✅ 페이지 변경 함수
  const onPageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    data,
    count,
    isPending,
    isError,
    page, // 다른 건 data로 받으면 되는데 page는 따로 계산해야 함
    onFilterChange,
    onPageChange,
  };
}
