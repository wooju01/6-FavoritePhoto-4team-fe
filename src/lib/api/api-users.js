import { cookieFetch } from "./fetch-client";

// ✅ 장르 + 등급 get
export async function getCardMeta() {
  return await cookieFetch("/api/users/card-meta");
}

// ✅ 월별 생성 횟수 get
export async function getMonthlyCardCount() {
  return await cookieFetch("/api/users/monthly-post-count");
}

// ✅ 카드 생성
export async function postCard(data) {
  return await cookieFetch("/api/users/post", {
    method: "POST",
    body: data,
  });
}

// ✅ 사용자 1인 조회
export async function getMe() {
  return await cookieFetch("/api/users");
}

// ✅ GET: 카드 개수
export async function getCardsCount() {
  return await cookieFetch("/api/users/cards-count");
}

// ✅ GET: 마이 갤러리
export async function getMyCards(query) {
  // 쿼리 문자열 처리
  const params = new URLSearchParams();

  // refactor: 객체 구조로 받게 함
  const cleaned = { ...query, withCounts: true }; // 쿼리를 그대로 넣되, mobile 크기일 때는 count를 넣음

  Object.entries(cleaned).forEach(([key, value]) => {
    if (value && value !== 0 && value !== "") {
      params.set(key, String(value));
    }
  });

  // 반환
  const queryString = params.toString();
  return await cookieFetch(
    `/api/users/gallery${queryString && `?${queryString}`}`
  );
}

// ✅ GET: 나의 판매 포토카드
export async function getMyCardsOnSale(query) {
  const params = new URLSearchParams();

  // refactor: 객체 구조로 받게 함
  const cleaned = { ...query, withCounts: true }; // 쿼리를 그대로 넣되, mobile 크기일 때는 count를 넣음

  Object.entries(cleaned).forEach(([key, value]) => {
    if (value && value !== 0 && value !== "") {
      params.set(key, String(value));
    }
  });

  // 반환
  const queryString = params.toString();
  return await cookieFetch(
    `/api/users/cards-on-sale${queryString && `?${queryString}`}`
  );
}
