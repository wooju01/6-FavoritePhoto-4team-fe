//  fetch-client 간단 사용법 await fetch(); 형태 말고 import { defaultFetch, cookieFetch } from "./fetch-client"; 한다음
//  인증이 필요없으면 await defaultFetch(); 인증이 필요하면 await cookieFetch();

//  AuthProvider 실시간 인증 상태 관리 사용법
//  import { useAuth } from "@/providers/AuthProvider"; 이후에
//  const { user, isLoading } = useAuth(); 하고 if (user) 면 로그인 상태 if (!user)면 로그아웃 상태

const API_BASE_URL = "https://six-favoritephoto-4team-be.onrender.com";

export const authUtils = {
  setAccessToken: (accessToken) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("accessToken", accessToken);
      } catch (e) {}
    }
  },
  getAccessToken: () => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem("accessToken");
      } catch (e) {
        return null;
      }
    }
    return null;
  },
  clearAccessToken: () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("accessToken");
      } catch (e) {}
    }
  },
  refreshAccessToken: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
        headers: {},
      });

      if (!response.ok) {
        throw new Error("토큰 갱신 API 호출 실패");
      }

      const responseText = await response.text();
      if (!responseText) {
        throw new Error("토큰 갱신 응답 비어있음");
      }

      const refreshData = JSON.parse(responseText);
      if (!refreshData || !refreshData.accessToken) {
        throw new Error("갱신 응답에 accessToken 없음");
      }

      authUtils.setAccessToken(refreshData.accessToken);
      return refreshData.accessToken;
    } catch (error) {
      authUtils.clearAccessToken();
      throw new Error(`토큰 갱신 중 오류: ${error.message}`);
    }
  },
};

export const defaultFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const requestHeaders = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  let processedBody = options.body;

  if (
    processedBody &&
    typeof processedBody === "object" &&
    !(processedBody instanceof FormData) &&
    (requestHeaders["Content-Type"] || "")
      .toLowerCase()
      .includes("application/json")
  ) {
    try {
      processedBody = JSON.stringify(processedBody);
    } catch (e) {
      throw new Error("요청 데이터 JSON 변환 실패");
    }
  } else if (processedBody instanceof FormData) {
    delete requestHeaders["Content-Type"];
  }

  const config = { ...options, headers: requestHeaders, body: processedBody };
  const response = await fetch(url, config);

  if (response.status === 204) {
    return null;
  }

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `API 오류 ${response.status}${
        responseText ? `: ${responseText.substring(0, 100)}` : ""
      }`
    );
  }

  if (!responseText) {
    return null;
  }

  try {
    return JSON.parse(responseText);
  } catch (e) {
    throw new Error("API 응답 JSON 파싱 실패");
  }
};

export const cookieFetch = async (endpoint, options = {}) => {
  let accessToken = authUtils.getAccessToken();
  const url = `${API_BASE_URL}${endpoint}`;

  const performFetchWithToken = async (token) => {
    const requestHeaders = {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
    let processedBody = options.body;

    if (
      processedBody &&
      typeof processedBody === "object" &&
      !(processedBody instanceof FormData) &&
      (requestHeaders["Content-Type"] || "")
        .toLowerCase()
        .includes("application/json")
    ) {
      try {
        processedBody = JSON.stringify(processedBody);
      } catch (e) {
        throw new Error("요청 데이터 JSON 변환 실패");
      }
    } else if (processedBody instanceof FormData) {
      delete requestHeaders["Content-Type"];
    }
    const config = { ...options, headers: requestHeaders, body: processedBody };
    return fetch(url, config);
  };

  if (!accessToken) {
    try {
      accessToken = await authUtils.refreshAccessToken();
    } catch (refreshError) {
      throw new Error(`초기 토큰 갱신 실패: ${refreshError.message}`);
    }
  }

  let response = await performFetchWithToken(accessToken);

  if (response.status === 401) {
    try {
      accessToken = await authUtils.refreshAccessToken();
      response = await performFetchWithToken(accessToken);
    } catch (refreshError) {
      throw new Error(`401 후 토큰 갱신 실패: ${refreshError.message}`);
    }
  }

  if (response.status === 204) {
    return null;
  }

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `API 오류 ${response.status}${
        responseText ? `: ${responseText.substring(0, 100)}` : ""
      }`
    );
  }

  if (!responseText) {
    return null;
  }

  try {
    return JSON.parse(responseText);
  } catch (e) {
    throw new Error("API 응답 JSON 파싱 실패");
  }
};
