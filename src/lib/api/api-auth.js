import { defaultFetch, authUtils } from "./fetch-client";

export const authService = {
  signUp: (nickname, email, password, passwordConfirmation) =>
    defaultFetch("/api/auth/signup", {
      method: "POST",
      body: { nickname, email, password, passwordConfirmation },
    }),

  signIn: async (email, password) => {
    try {
      const response = await defaultFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        credentials: "include",
        cache: "no-store",
      });

      if (response && response.accessToken) {
        authUtils.setAccessToken(response.accessToken);
      }
      return response;
    } catch (error) {
      console.error("로그인 실패", error);
      authUtils.clearAccessToken();
      throw error;
    }
  },

  signOut: async () => {
    try {
      await defaultFetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("서버 로그아웃 요청 실패:", error);
    } finally {
      authUtils.clearAccessToken();
      window.location.href = "/home";
    }
  },
};
