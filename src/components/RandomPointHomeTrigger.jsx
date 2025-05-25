"use client";
import { useEffect, useState } from "react";

export default function RandomPointHomeTrigger({ children }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastClaimed, setLastClaimed] = useState(null);
  const [todayClaimCount, setTodayClaimCount] = useState(0);

  // AccessToken 가져오는 함수
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
    return null;
  };

  // 내 포인트 정보 조회
  const fetchMyPoints = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3002/api/points/me", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLastClaimed(data.lastClaimed);
      setTodayClaimCount(data.todayClaimCount);
      // 1시간 지났거나 오늘 3회 미만이면 show
      if (
        (!data.lastClaimed ||
          new Date() - new Date(data.lastClaimed) >= 60 * 60 * 1000) &&
        data.todayClaimCount < 3
      ) {
        setShow(true);
      }
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
    <div style={{ zIndex: 99999, position: "fixed", inset: 0 }}>{children}</div>
  );
}
