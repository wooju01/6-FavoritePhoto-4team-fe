"use client";
import blueBox from "@/assets/blue_box.png";
import purpleBox from "@/assets/purple_box.png";
import redBox from "@/assets/red_box.png";
import pointImg from "@/assets/point.png";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function RandomPoint() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [active, setActive] = useState(false);
  const [closed, setClosed] = useState(true);
  const [points, setPoints] = useState(null);
  const [lastClaimed, setLastClaimed] = useState(null);
  const [todayClaimCount, setTodayClaimCount] = useState(0);
  const [result, setResult] = useState(null); // {points, totalPoints}
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const boxes = [
    { src: blueBox, alt: "blue box" },
    { src: purpleBox, alt: "purple box" },
    { src: redBox, alt: "red box" },
  ];

  const handleBoxClick = (index) => {
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setClosed(false);
  };

  // AccessToken 가져오는 함수 (예시)
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
    return null;
  };

  // 내 포인트 정보 조회
  const fetchMyPoints = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("http://localhost:3002/api/points/me", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) throw new Error("포인트 정보를 불러오지 못했습니다.");
      const data = await res.json();
      setPoints(data.points);
      setLastClaimed(data.lastClaimed);
      setTodayClaimCount(data.todayClaimCount);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPoints();
  }, []);

  // 1시간 제한 남은 시간 계산 (실시간)
  const [remainTime, setRemainTime] = useState("");
  useEffect(() => {
    if (!lastClaimed) {
      setRemainTime("");
      return;
    }
    const updateRemain = () => {
      const last = new Date(lastClaimed);
      const now = new Date();
      const diff = 60 * 60 * 1000 - (now - last);
      if (diff <= 0) {
        setRemainTime("");
        return;
      }
      const min = Math.floor(diff / 60000);
      const sec = Math.floor((diff % 60000) / 1000);
      setRemainTime(`${min}분 ${sec < 10 ? "0" : ""}${sec}초`);
    };
    updateRemain();
    const timer = setInterval(updateRemain, 1000);
    return () => clearInterval(timer);
  }, [lastClaimed]);

  // 선택완료(뽑기) 버튼 클릭
  const handleBoxConfirm = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("http://localhost:3002/api/points/random-box", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        setActive(true);
        fetchMyPoints();
      } else {
        setErrorMsg(data.message || "뽑기에 실패했습니다.");
      }
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (!closed) return null;

  return (
    <div
      className="
      fixed w-full min-h-full p-4 left-0 top-0 bg-black/80
      flex items-center justify-center
    "
    >
      <div
        className={`
          flex flex-col items-center
          max-w-[345px] md:max-w-[600px] lg:max-w-[900px]
          relative
          px-4 py-14 md:px-9 md:py-14 lg:px-24 lg:py-20
          bg-gray-500
          ${active && "!px-14 !md:px-14 !lg:px-14"}
        `}
      >
        <div className="absolute top-4 right-4 ">
          <button onClick={handleClose} className="cursor-pointer">
            <IoMdClose className="w-6 h-6 lg:w-8 lg:h-8" />
          </button>
        </div>
        {errorMsg && (
          <div className="text-red-500 font-bold mb-2">{errorMsg}</div>
        )}
        <div
          className={`flex flex-col items-center gap-6 ${active && "!gap-2"}`}
        >
          <h2 className="title-30 md:title-36 lg:title-46">
            랜덤<span className="text-main">포인트</span>
          </h2>
          <div className={`${!active && "hidden"}`}>
            <Image
              src={pointImg}
              alt="point.png"
              className="aspect-square max-w-60 md:max-w-[340px]"
            />
            <div className="text-center text-700-24 md:text-700-28 lg:text-700-32">
              <span className="text-main">
                {result ? `${result.points}P` : "2P"}
              </span>{" "}
              획득!
            </div>
            <div className="text-gray-400 text-sm mt-2">
              총 보유 포인트: {result ? result.totalPoints : points}
            </div>
          </div>
          <p
            className={`text-center font-bold lg:text-700-20 ${
              active && "hidden"
            }`}
          >
            1시간마다 돌아오는 기회!
            <br />
            랜덤 상자 뽑기를 통해 포인트를 획득하세요
          </p>
          <div className="flex flex-col items-center gap-2 text-sm text-gray-300 lg:flex-row lg:gap-2.5 lg:text-400-16">
            <span>다음 기회까지 남은 시간</span>
            <span className="text-main">{remainTime || "바로 참여 가능"}</span>
          </div>
        </div>
        <div
          className={`py-6 flex gap-4 [&>button]:cursor-pointer ${
            active && "hidden"
          }`}
        >
          {boxes.map((box, index) => (
            <button
              key={index}
              onClick={() => handleBoxClick(index)}
              className={`transition-opacity duration-200 ${
                selectedIndex !== null && selectedIndex !== index
                  ? "opacity-40"
                  : "opacity-100"
              }`}
            >
              <Image src={box.src} alt={box.alt} className="aspect-[5/4]" />
            </button>
          ))}
        </div>
        {selectedIndex !== null && !active && (
          <button
            onClick={handleBoxConfirm}
            disabled={loading}
            className={`w-full h-14 max-w-[440px] lg:max-w-[520px] flex items-center justify-center font-bold mt-6 text-my-black bg-main cursor-pointer lg:text-700-18`}
          >
            {loading ? "로딩 중..." : "선택완료"}
          </button>
        )}
      </div>
    </div>
  );
}
