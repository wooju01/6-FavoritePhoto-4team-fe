"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import backIcon from "@/assets/back.svg";
import example from "@/assets/example.svg";
import CardSeller from "../ui/CardSeller";
import Exchange from "../PhotoCard/Exchange";

export default function SellerPage() {
  const router = useRouter();

  return (
    <div className="bg-my-black text-white min-h-screen">
      {/* 헤더 */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center"
        >
          <Image src={backIcon} alt="뒤로가기" width={24} height={24} />
        </button>
        <div className="flex-1 text-center title-16 font-bold">
          마켓플레이스
        </div>
      </div>

      {/* 카드 제목 */}
      <div className="text-700-24 mb-2">우리집 앞마당</div>
      <div className="w-full h-[1.5px] bg-gray-200 mb-5" />

      {/* 카드 이미지 */}
      <div className="w-full aspect-[4/3] relative mb-4">
        <Image src={example} alt="카드 이미지" fill className="object-cover" />
      </div>

      {/* 카드 상세 정보 */}
      <CardSeller
        gradeId={2}
        genreId={1}
        nickname="탐험가"
        description="강원도 여행 사진입니다."
        price={3}
        remaining={1}
        total={5}
        desiredGrade={4}
        desiredGenreId={3}
        desiredDescription="겨울 눈 내리는 인물 사진을 원합니다."
        onEdit={() => console.log("수정")}
        onSellDown={() => console.log("판매 중단")}
      />

      {/* 교환 제시 목록 */}
      <div className="mt-20 mb-2 text-700-24">교환 제시 목록</div>
      <div className="w-full h-[1.5px] bg-gray-200 mb-10" />
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Exchange
            key={idx}
            name="How Far I'll Go"
            image={example} // 실제 이미지가 있다면 교체
            gradeId={3}
            genreId={1} // 여행
            nickname="탐험가"
            price={4}
            description="여름 바다 풍경 사진과 교환하실래요?"
            onApprove={() => console.log("승인됨")}
            onReject={() => console.log("거절됨")}
          />
        ))}
      </div>
    </div>
  );
}
