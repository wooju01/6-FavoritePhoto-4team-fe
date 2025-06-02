import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getSocket, disconnectSocket } from "@/lib/socket";

// 알림 UI 관련 상수 분리
const NOTI_HEIGHT = 107;
const NOTI_MAX_HEIGHT = 535;

function Notification({ className = "" }) {
  const [open, setOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);
  const hasUnread = notifications.some((n) => !n.read);
  const router = useRouter();
  const pathname = usePathname();

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
      console.log("[알림 fetch] API 응답 데이터:", data);
      setNotifications(Array.isArray(data) ? data : []);
    } catch (e) {
      setNotifications([]);
      console.error("알림 fetch 에러:", e);
    }
  };

  // 알림 읽음 처리
  const handleNotificationClick = async (id) => {
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

  // 웹소켓 알림 실시간 수신
  React.useEffect(() => {
    const token = getToken();
    if (!token) return;
    let userId = null;
    // JWT 파싱 실패 시 경고 추가
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userId = payload.userId || payload.user_id || payload.id || payload.sub;
    } catch (e) {
      console.warn("JWT 파싱 실패", e);
    }
    if (!userId) return;
    // socket, reconnectTimeout useRef로 관리
    const socketRef = { current: null };
    const reconnectTimeoutRef = { current: null };
    const connectSocket = () => {
      socketRef.current = getSocket(
        token,
        "https://six-favoritephoto-4team-be.onrender.com"
      );
      socketRef.current.on("connect", () => {
        socketRef.current.emit("join", userId);
      });
      socketRef.current.on("notification", (data) => {
        setNotifications((prev) => [data, ...prev]);
      });
      socketRef.current.on("disconnect", () => {
        reconnectTimeoutRef.current = setTimeout(() => {
          connectSocket();
        }, 1000);
      });
    };
    connectSocket();
    fetchNotifications();
    return () => {
      if (socketRef.current) {
        socketRef.current.off("notification");
        socketRef.current.off("disconnect");
        socketRef.current.off("connect");
        disconnectSocket();
      }
      if (reconnectTimeoutRef.current)
        clearTimeout(reconnectTimeoutRef.current);
    };
  }, [pathname]);

  // 바깥 클릭 시 드롭다운 닫기
  React.useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (!e.target.closest(".notification-dropdown-root")) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // 모바일 환경 감지 (resize 이벤트로 반응형 처리)
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" && window.innerWidth < 744
  );
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 744);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleIconClick = () => {
    if (isMobile) {
      router.push("/notification");
    } else {
      setOpen((prev) => !prev);
    }
  };

  return (
    <div className="w-6 h-6 relative notification-dropdown-root">
      {/* 알림 아이콘 버튼 */}
      <button
        className="relative focus:outline-none cursor-pointer"
        onClick={handleIconClick}
        aria-label="알림 열기"
      >
        <Image
          src={
            hasUnread
              ? require("@/assets/icom_alrma_active.svg")
              : require("@/assets/icon_alarm.svg")
          }
          alt="알림"
          width={24}
          height={24}
        />
      </button>

      {/* 드롭다운: md 이상에서만 보임 */}
      {open && (
        <div
          className="hidden md:block absolute top-full right-0 mt-0 w-[300px] rounded-xs z-20 bg-black text-white"
          style={{
            minHeight: notifications.length === 0 ? NOTI_HEIGHT : undefined,
            maxHeight: NOTI_MAX_HEIGHT,
            height:
              notifications.length === 0
                ? NOTI_HEIGHT
                : notifications.length * NOTI_HEIGHT > NOTI_MAX_HEIGHT
                ? NOTI_MAX_HEIGHT
                : notifications.length * NOTI_HEIGHT,
          }}
        >
          <ul
            className="h-full max-h-full overflow-y-auto divide-y divide-gray-600"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(120,120,120,0.3) transparent",
            }}
          >
            {notifications.length === 0 ? (
              <li className="p-5 text-center text-gray-400">
                알림이 없습니다.
              </li>
            ) : (
              notifications.map((n) => (
                <li
                  key={n.id}
                  className={`w-full h-[${NOTI_HEIGHT}px] p-5 text-sm ${
                    n.read ? "bg-gray-500" : "bg-[#242424] text-white"
                  } cursor-pointer`}
                  onClick={() => {
                    if (!n.read) handleNotificationClick(n.id);
                    if (isMobile) router.push("/notification");
                  }}
                >
                  <div className="block h-full w-full">
                    <div className="flex flex-col justify-between h-full">
                      <span
                        className={`text-400-14 ${
                          n.read ? "opacity-70" : "font-semibold"
                        }`}
                      >
                        {n.message}
                      </span>
                      <div className="text-xs text-gray-300 mt-2.5">
                        {getTimeAgo(n.createdAt)}
                      </div>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

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

export default Notification;

// 개선 사항
// 1. loading 제거
// 2. 반복되는 숫자(107, 535) 상수(NOTI_HEIGHT, NOTI_MAX_HEIGHT)로 분리
// 3. JWT 파싱 실패 시 콘솔 경고
// 4. socket, reconnectTimeout을 useRef로 관리
// 5. 모바일 감지를 resize 이벤트로 반응형 처리
