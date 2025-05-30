import { defaultFetch, cookieFetch } from "@/lib/api/fetch-client";

export const storeService = {
  //스토어의 모든 카드 데이터를 가져옵니다.
  getAllStoreCards: (filters) => {
    const query = new URLSearchParams();

    for (const [key, value] of Object.entries(filters)) {
      if (value) query.set(key, value);
    }

    const url = `/api/store?${query.toString()}`;
    console.log(url);
    return defaultFetch(url);
  },

  getStoreCardDetail: (id) => cookieFetch(`/api/store/cards/${id}`),

  getTradeRequests: (id) => cookieFetch(`/api/store/cards/${id}/exchange`),
  //교환 요청 취소
  cancelTradeRequest: (listedCardId, tradeRequestId) =>
    cookieFetch(
      `/api/store/cards/${listedCardId}/exchange/${tradeRequestId}/cancel`,
      {
        method: "PATCH",
      }
    ),

  //구매 요청
  purchaseCard: (id, quantity) =>
    cookieFetch(`/api/store/cards/${id}/purchase`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    }),
  //마이갤러시 상세 조회회
  getUserGalleryCardDetail: (id) => cookieFetch(`/api/users/gallery/${id}`),
  //교환
  createTradeRequest: (saleId, offeredUserCardIds, description) =>
    cookieFetch(`/api/store/cards/${saleId}/exchange`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ offeredUserCardIds, description }),
    }),
};
