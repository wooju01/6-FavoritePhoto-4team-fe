import { cookieFetch } from "./fetch-client";

export async function getTradeRequestsBySaleId(saleId) {
  try {
    return await cookieFetch(`/api/store/cards/${saleId}/trade-requests`);
  } catch (e) {
    console.error("교환 제시 요청 실패:", e.message);
    throw new Error("교환 제시 데이터를 불러오지 못했습니다.");
  }
}

export async function approveTradeRequest(tradeRequestId) {
  return await cookieFetch(`/api/store/trade/${tradeRequestId}/accept`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });
}

export async function rejectTradeRequest(tradeRequestId) {
  return await cookieFetch(`/api/store/trade/${tradeRequestId}/reject`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });
}
