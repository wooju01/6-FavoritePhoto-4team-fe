"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// 시간 표시 포맷 함수
function getTimeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffHour >= 1 && diffHour < 24) {
    return `${diffHour}시간 전`;
  } else if (diffDay >= 1 && diffDay < 7) {
    return `${diffDay}일 전`;
  } else if (diffWeek >= 1 && diffWeek <= 3) {
    return `${diffWeek}주일 전`;
  } else if (diffMonth >= 1 && diffMonth <= 11) {
    return `${diffMonth}개월 전`;
  } else if (diffYear >= 1) {
    return `${diffYear}년 전`;
  } else {
    // 1시간 미만은 분 단위로 표시
    return `${diffMin}분 전`;
  }
}

export default function NotificationPage() {
  const [notifications, setNotifications] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  // 토큰 가져오기 (쿠키에서)
  const getToken = () => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/(?:^|; )accessToken=([^;]*)/);
      return match ? decodeURIComponent(match[1]) : null;
    }
    return null;
  };

  // 알림 전체 조회
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://six-favoritephoto-4team-be.onrender.com/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (!res.ok) {
        const text = await res.text();
        console.error("알림 API 응답:", text);
        throw new Error("알림을 불러오지 못했습니다.");
      }
      const data = await res.json();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (e) {
      setNotifications([]);
      console.error("알림 fetch 에러:", e);
    } finally {
      setLoading(false);
    }
  };

  // 알림 읽음 처리
  const handleNotificationClick = async (id, read) => {
    if (read) return;
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    try {
      await fetch(
        `https://six-favoritephoto-4team-be.onrender.com/api/notifications/${id}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch {}
  };

  React.useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-my-black text-white flex flex-col px-0 max-w-[1480px] mx-auto">
      {/* 알림 리스트 */}
      <ul className="flex-1 overflow-y-auto divide-y divide-gray-700">
        {loading ? (
          <li className="p-8 text-center text-gray-400">
            알림을 불러오는 중...
          </li>
        ) : notifications.length === 0 ? (
          <li className="p-8 text-center text-gray-400">알림이 없습니다.</li>
        ) : (
          notifications.map((n) => (
            <li
              key={n.id}
              className={`h-[87px] p-5 text-sm cursor-pointer ${
                n.read ? "bg-gray-500" : "bg-[#242424] text-white"
              }`}
              onClick={() => handleNotificationClick(n.id, n.read)}
            >
              <div className="flex flex-col justify-center h-full">
                <span className={n.read ? "opacity-70" : "font-semibold"}>
                  {n.message}
                </span>
                <div className="text-xs text-gray-400 mt-2.5">
                  {getTimeAgo(n.createdAt)}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
