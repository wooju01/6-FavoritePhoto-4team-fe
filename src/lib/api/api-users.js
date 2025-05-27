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

  getMyGallery: async ({ page, size, genreId, search } = {}) => {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page.toString());
    if (size) queryParams.append("size", size.toString());
    if (genreId) queryParams.append("genreId", genreId.toString());
    if (search) queryParams.append("search", search);
    const queryString = queryParams.toString();
    return await cookieFetch(
      `/api/users/gallery${queryString ? `?${queryString}` : ""}`
    );
  },

  getMyCardsOnSale: async (params = {}) => {
    const queryParams = new URLSearchParams(params);
    const queryString = queryParams.toString();
    return await cookieFetch(
      `/api/users/cards-on-sale${queryString ? `?${queryString}` : ""}`
    );
  },
};
