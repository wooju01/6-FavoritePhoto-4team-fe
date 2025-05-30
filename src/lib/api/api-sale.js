import { cookieFetch } from "./fetch-client";

// 판매 등록
export async function postCardSale(payload) {
  return await cookieFetch("/api/store/cards", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// 판매 상세 조회
export async function getSaleDetail(saleId) {
  return await cookieFetch(`/api/store/cards/${saleId}`);
}

// 판매 수정 등록
export async function patchCardSale(saleId, payload) {
  return await cookieFetch(`/api/store/cards/${saleId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// 판매 내리기
export async function cancelSaleById(saleId) {
  return await cookieFetch(`/api/store/cards/${saleId}`, {
    method: "DELETE",
  });
}
