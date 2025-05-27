"use client";

import { countByKey, formatCountedData } from "@/lib/countByFilter";
import { useSearchParams } from "next/navigation";

export default function useFilter(data) {
  const searchParams = useSearchParams();

  const selectedGrade = searchParams.get("grade");
  const selectedGenre = searchParams.get("genre");

  if (!data || !Array.isArray(data)) {
    // 깨져서 나오지 않게 방어
    return {
      filteredData: [],
      gradeForFilter: [],
      genreForFilter: [],
    };
  }

  const filteredData = data?.filter((card) => {
    const grade =
      selectedGrade && selectedGrade !== "0"
        ? card.photoCard.gradeId === Number(selectedGrade)
        : true;

    const genre =
      selectedGenre && selectedGenre !== "0"
        ? card.photoCard.genreId === Number(selectedGenre)
        : true;

    return grade && genre;
  });

  // 등급/장르 필터링
  const gradeForFilter = formatCountedData(
    countByKey(data || [], "gradeId"),
    "gradeId"
  );
  const genreForFilter = formatCountedData(
    countByKey(data || [], "genreId"),
    "genreId"
  );

  return { filteredData, gradeForFilter, genreForFilter };
}
