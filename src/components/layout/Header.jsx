"use client";
import React, { useEffect, useState } from "react";
import mainLogoImg from "@/assets/main-logo.png";
import humbergerIconImg from "@/assets/icon-humberger.png";
import CurtainMenu from "./CurtainMenu";
import DropdownNavi from "./DropdownNavi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/providers/AuthProvider";
import Notification from "./Notification";
import { getSocket, disconnectSocket } from "@/lib/socket";

const Navbar = () => {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();
  const [point, setPoint] = useState(null);
  const [pointLoading, setPointLoading] = useState(false);
  const [pointError, setPointError] = useState("");
  const [isCurtainOpen, setIsCurtainOpen] = useState(false); // 커튼 메뉴 상태 추가
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 닉네임 드롭다운 상태

  // 토큰 가져오기 (쿠키에서)
  const getToken = () => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/(?:^|; )accessToken=([^;]*)/);
      return match ? decodeURIComponent(match[1]) : null;
    }
    return null;
  };

  const fetchMyPoints = async () => {
    if (!user) return;
    setPointError("");
    try {
      const res = await fetch(
        "https://six-favoritephoto-4team-be.onrender.com/api/points/me",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (!res.ok) throw new Error("포인트 정보를 불러오지 못했습니다.");
      const data = await res.json();
      setPoint(data.points);
    } catch (e) {
      setPointError(e.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      // 필요하면 리다이렉트 또는 상태 업데이트
    } catch (err) {
      console.error("로그아웃 중 오류 발생:", err);
    }
  };

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [pathname, isLoading, user]);

  useEffect(() => {
    if (!user) return;
    let socket;
    let reconnectTimeout;

    const connectSocket = () => {
      const token = getToken();
      if (!token) return;
      socket = getSocket(
        token,
        "https://six-favoritephoto-4team-be.onrender.com"
      );
      socket.on("connect", () => {
        console.log("[Socket] Connected", socket.id);
        if (user.id) {
          socket.emit("join", user.id);
          console.log("[Socket] join room:", user.id);
        }
      });
      socket.on("connect_error", (err) => {
        console.error("[Socket] Connection error:", err);
      });
      socket.on("disconnect", (reason) => {
        console.log("[Socket] Disconnected:", reason);
        // 페이지 이동 등으로 소켓이 끊기면 1초 후 재연결
        reconnectTimeout = setTimeout(() => {
          connectSocket();
        }, 1000);
      });
      // 서버에서 'pointUpdate' 전달
      const handlePointUpdate = (data) => {
        console.log("[Socket] pointUpdate event received:", data);
        if (data && typeof data.totalPoints === "number") {
          setPoint(data.totalPoints);
        }
      };
      socket.on("pointUpdate", handlePointUpdate);
    };

    connectSocket();
    fetchMyPoints();

    return () => {
      if (socket) {
        socket.off("pointUpdate");
        socket.off("disconnect");
        socket.off("connect");
        socket.off("connect_error");
        disconnectSocket();
      }
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, [user, pathname]);

  return (
    <header className="sticky top-0 left-0 z-[7777] bg-my-black">
      <nav
        className={`
          flex items-center 
          max-w-[1480px] h-[60px] md:h-[70px] lg:h-[80px]
          ${pathname && pathname === "/" ? "mx-auto px-4 md:px-9 lg:px-0" : ""}
      `}
      >
        <div className="w-full relative md:static flex items-center justify-between">
          <button className="md:hidden" onClick={() => setIsCurtainOpen(true)}>
            <Image src={humbergerIconImg} alt="hamburger" />
          </button>

          <Link
            href={"/"}
            className="absolute md:static left-1/2 md:left-0 -translate-x-1/2 md:-translate-0 "
          >
            <Image
              src={mainLogoImg}
              alt="main-logo"
              className="w-20 md:w-28 lg:w-[138px] h-4 md:h-5 lg:h-[26px]"
            />
          </Link>

          {isLoading ? (
            <span className="text-gray-400">확인 중...</span>
          ) : user ? (
            <div className="flex items-center gap-7 ">
              {/* User정보가 있는 경우 */}
              <span className="hidden md:block text-700-14 text-gray-200">
                {pointLoading
                  ? "포인트..."
                  : pointError
                  ? "-"
                  : point !== null
                  ? `${point} P`
                  : "-"}
              </span>
              <Notification />
              <span
                className="hidden md:block text-700-14 text-gray-200 cursor-pointer relative"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                {user.nickname}
                <DropdownNavi
                  user={{ ...user, point: point ?? 0 }}
                  open={isDropdownOpen}
                  onClose={() => setIsDropdownOpen(false)}
                />
              </span>
              <span className="hidden md:block w-[1px] h-4 bg-gray-400"></span>
              <button
                onClick={handleLogout}
                className="hidden md:block text-400-14 text-gray-400"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="[&>a]:text-gray-200 flex items-center gap-7">
              {/* User정보가 없는 경우 */}
              <Link href={"/login"} className="text-400-14 ">
                로그인
              </Link>
              <Link href={"/signup"} className="hidden md:flex md:text-400-14 ">
                회원가입
              </Link>
            </div>
          )}
        </div>
      </nav>
      {isCurtainOpen && user && (
        <CurtainMenu
          user={{ ...user, point: point ?? 0 }}
          onClose={() => setIsCurtainOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;