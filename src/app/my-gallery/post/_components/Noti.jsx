"use client";

import React from "react";
import noti from "@/assets/noti.png";
import Image from "next/image";

export default function Noti() {
  return (
    <div className="bg-[#535353] w-80 md:w-100 h-16 md:h-18 rounded-[9999px] flex items-center justify-center gap-2 absolute left-1/2 -translate-x-1/2">
      <Image src={noti} width={24} height={24} alt="공지 아이콘" />
      <span className="md:text-400-18">이번달 모든 생성 기회를 소진했어요</span>
    </div>
  );
}
