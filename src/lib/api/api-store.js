import { defaultFetch, cookieFetch } from "@/lib/api/fetch-client";

export const storeService = {
  //스토어의 모든 카드 데이터를 가져옵니다.
  getAllStoreCards: () => defaultFetch("/api/store"),

  //스토어의 특정 카드 데이터를 가져옵니다.
  getStoreCardDetail: (id) => cookieFetch(`/api/store/cards/${id}`),

   getTradeRequests: (id) => cookieFetch(`/api/store/cards/${id}/exchange`),
   
 cancelTradeRequest: (listedCardId, tradeRequestId) => 
    cookieFetch(`/api/store/cards/${listedCardId}/exchange/${tradeRequestId}/cancel`, {
      method: "PATCH",
    }),

};
