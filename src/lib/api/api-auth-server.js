// 서버컴포전용 getMe (안쓴다면 지울 예정)
import { cookies } from "next/headers";
const API_BASE_URL = "https://six-favoritephoto-4team-be-distribute.onrender.com";

export async function getMe() {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get("accessToken");

  if (!tokenCookie?.value) return null;

  const res = await fetch(`${API_BASE_URL}/api/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenCookie.value}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  return await res.json();
}
