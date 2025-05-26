import { cookieFetch } from "./fetch-client";

// 장르 + 등급 get
export async function getCardMeta() {
  return await cookieFetch("/api/users/card-meta");
}

// 월별 생성 횟수 get
export async function getMonthlyCardCount() {
  return await cookieFetch("/api/users/monthly-post-count");
}

// POST
export async function postCard(formData) {
  return await cookieFetch("/api/users/post", {
    method: "POST",
    body: formData,
  });
}

export const userService = {
  getMe: () => cookieFetch("/api/users"),
};

// GET: 마이 갤러리
export async function getMyCards() {
  return await cookieFetch("/api/users/gallery");
}
