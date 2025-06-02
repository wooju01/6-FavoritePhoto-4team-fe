// ✅ 쿼리 문자열 처리
export default function parseParams(searchParams) {
  return {
    grade: Number(searchParams.get("grade")) || 0,
    genre: Number(searchParams.get("genre")) || 0,
    keyword: searchParams.get("keyword") || "",
    page: Number(searchParams.get("page")) || 1,
    size: searchParams.get("size") || "md",
  };
}
