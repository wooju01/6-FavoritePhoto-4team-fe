import { defaultFetch, cookieFetch } from "@/lib/api/fetch-client";

export const storeService = {
  //스토어의 모든 카드 데이터를 가져옵니다.
  getAllStoreCards: (filters) => {
    const query = new URLSearchParams();

    for (const [key, value] of Object.entries(filters)) {
      if (value) query.set(key, value);
    }

    const url = `/api/store?${query.toString()}`;
    console.log(url)
    return defaultFetch(url);
  },


  //스토어의 특정 카드 데이터를 가져옵니다.
  getStoreCardDetail: (id) => cookieFetch(`/api/store/cards/${id}`),

  getTradeRequests: (id) => cookieFetch(`/api/store/cards/${id}/exchange`),

  cancelTradeRequest: (listedCardId, tradeRequestId) =>
    cookieFetch(`/api/store/cards/${listedCardId}/exchange/${tradeRequestId}/cancel`, {
      method: "PATCH",
    }),
  purchaseCard: (id, quantity) =>
    cookieFetch(`/api/store/cards/${id}/purchase`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    }),
};
