"use client";
import {
  useEffect,
  useState,
  Children,
  isValidElement,
  cloneElement,
} from "react";

export default function RandomPointHomeTrigger({ children }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastClaimed, setLastClaimed] = useState(null);
  const [todayClaimCount, setTodayClaimCount] = useState(0);

  // AccessToken 가져오는 함수 (쿠키에서)
  const getToken = () => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/(?:^|; )accessToken=([^;]*)/);
      return match ? decodeURIComponent(match[1]) : null;
    }
    return null;
  };

  // 내 포인트 정보 조회
  const fetchMyPoints = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://six-favoritephoto-4team-be.onrender.com/api/points/me",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLastClaimed(data.lastClaimed);
      setTodayClaimCount(data.todayClaimCount);
      let showFlag = false;
      if (!data.lastClaimed) {
        // 기록이 없으면 무조건 show
        showFlag = true;
      } else {
        const last = new Date(data.lastClaimed);
        const now = new Date();
        const isSameDay =
          last.getFullYear() === now.getFullYear() &&
          last.getMonth() === now.getMonth() &&
          last.getDate() === now.getDate();
        const is1HourPassed = now - last >= 60 * 60 * 1000;
        if (!isSameDay) {
          // 날짜가 바뀌었으면 1시간이 지났을 때만 show
          showFlag = is1HourPassed;
        } else {
          // 오늘이면 3회 미만이고 1시간이 지났을 때만 show
          if (data.todayClaimCount < 3 && is1HourPassed) {
            showFlag = true;
          }
        }
      }
      setShow(showFlag);
    } catch {
      setShow(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPoints();
  }, []);

  if (!show || loading) return null;
  return (
    <div style={{ zIndex: 99999, position: "fixed", inset: 0 }}>
      {isValidElement(children)
        ? cloneElement(children, { onClose: () => setShow(false) })
        : children}
    </div>
  );
}
