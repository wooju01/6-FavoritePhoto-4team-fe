import { cookieFetch } from "./fetch-client";

// 장르 + 등급 get
export async function getCardMeta() {
  return await cookieFetch("/api/users/card-meta");
}

// 월별 생성 횟수 get
export async function getMonthlyCardCount() {
  return await cookieFetch("/api/users/monthly-post-count");
}

// 예시: /lib/api/api-users.js
export async function postCard(data) {
  return await cookieFetch("/api/users/post", {
    method: "POST",
    body: data,
  });
}

export const userService = {
  getMe: () => cookieFetch("/api/users"),
};

// GET: 마이 갤러리
export async function getMyCards({
  grade,
  genre,
  keyword,
  page = 1,
  size = "md",
}) {
  const queryParams = new URLSearchParams();

  if (grade && grade !== 0) queryParams.append("grade", grade.toString());
  if (genre && genre !== 0) queryParams.append("genre", genre.toString());
  if (keyword) queryParams.append("keyword", keyword);
  if (page) queryParams.append("page", page.toString() || "1");
  if (size) queryParams.append("size", size || "md");

  const queryString = queryParams.toString();
  return await cookieFetch(
    `/api/users/gallery${queryString && `?${queryString}`}`
  );
}

// GET: 나의 판매 포토카드
export async function getMyCardsOnSale({
  grade,
  genre,
  keyword,
  saleType, // 판매, 교환 (품절x)
  saleStatus, // '판매 중', '판매 완료' (교환x)
  page = 1,
  size = "md",
}) {
  const queryParams = new URLSearchParams();

  if (grade && grade !== 0) queryParams.append("grade", grade.toString());
  if (genre && genre !== 0) queryParams.append("genre", genre.toString());
  if (keyword) queryParams.append("keyword", keyword);
  if (saleType) queryParams.append("saleType", saleType);
  if (saleStatus) queryParams.append("saleStatus", saleStatus);
  if (page) queryParams.append("page", page.toString() || "1");
  if (size) queryParams.append("size", size || "md");

  const queryString = queryParams.toString();
  return await cookieFetch(
    `/api/users/cards-on-sale${queryString && `?${queryString}`}`
  );
}

// GET: 카드 개수
export async function getCardsCount() {
  return await cookieFetch("/api/users/cards-count");
}
