import { cookieFetch } from "./fetch-client";

export async function postCardSale(payload) {
  return await cookieFetch("/api/store/cards", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
