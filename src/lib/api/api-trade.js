import { cookieFetch } from "./fetch-client";

export async function getTradeRequestsBySaleId(saleId) {
  const res = await cookieFetch(`/api/store/cards/${saleId}/trade-requests`);
  if (!res.ok) throw new Error("교환 제시 데이터를 불러오지 못했습니다.");
  return res.json();
}
