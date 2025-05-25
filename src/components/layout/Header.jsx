"use client";
import React, { useEffect, useState } from "react";
import mainLogoImg from "@/assets/main-logo.png";
import alarmIconImg from "@/assets/icon-alarm.png";
import humbergerIconImg from "@/assets/icon-humberger.png";
import CurtainMenu from "./CurtainMenu";
import DropdownNavi from "./DropdownNavi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/providers/AuthProvider";

const Navbar = () => {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();
  const [point, setPoint] = useState(null);
  const [pointLoading, setPointLoading] = useState(false);
  const [pointError, setPointError] = useState("");

  // 포인트 조회 함수
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
    return null;
  };

  const fetchMyPoints = async () => {
    if (!user) return;
    setPointLoading(true);
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
    } finally {
      setPointLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchMyPoints();
  }, [user]);

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
          <button className="md:hidden">
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
            <div className="[&>*]:hidden md:[&>*]:block flex items-center gap-7 ">
              {/* User정보가 있는 경우 */}
              <span className="text-700-14 text-gray-200">
                {pointLoading
                  ? "포인트..."
                  : pointError
                  ? "-"
                  : point !== null
                  ? `${point} P`
                  : "-"}
              </span>
              <button className="!block">
                <Image src={alarmIconImg} alt="alarmIcon" className="md:w-6" />
              </button>
              <span className="text-700-14 text-gray-200">{user.nickname}</span>
              <span className="w-[1px] h-4 bg-gray-400"></span>
              <button
                onClick={handleLogout}
                className="text-400-14 text-gray-400"
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
    </header>
  );
};

export default Navbar;
