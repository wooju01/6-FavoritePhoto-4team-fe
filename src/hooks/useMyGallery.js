"use client";

import { useQuery } from "@tanstack/react-query";
import { getCardsCount, getMyCards } from "@/lib/api/api-users";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import parseParams from "@/lib/utils/parse-params";

export function useMyGallery() {
  // ✅ hook 가져옴
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // ✅ 쿼리 부분 가져옴
  const { grade, genre, keyword, page, size } = parseParams(searchParams);

  // ☑️ 데이터 가져오기
  const { data, isPending, isError } = useQuery({
    queryKey: ["myGalleryCards_v8", { grade, genre, keyword, page, size }],
    queryFn: () => getMyCards({ grade, genre, keyword, page, size }),
  });

  // ☑️ 카드 개수 가져오기 (전체 + 등급별)
  const { data: count } = useQuery({
    queryKey: ["countedCards"],
    queryFn: getCardsCount,
  });

  // ✅ 필터 변경 함수
  const onFilterChange = (type, value) => {
    const params = new URLSearchParams(searchParams.toString());

    // 전체 선택 시 필터 제거
    value === 0 ? params.delete(type) : params.set(type, value.toString());
    params.set("page", "1"); // 페이지 1로 초기화

    router.replace(`${pathname}?${params.toString()}`);
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
