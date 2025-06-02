"use client";

import { userService } from "@/lib/api/api-users";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import React from "react";

// 등급별 style
const gradeStyle = {
  1: { label: "COMMON", border: "border-main", text: "text-main" },
  2: { label: "RARE", border: "border-my-blue", text: "text-my-blue" },
  3: {
    label: "SUPER RARE",
    border: "border-my-purple",
    text: "text-my-purple",
  },
  4: {
    label: "LEGENDARY",
    border: "border-my-pink",
    text: "text-my-pink",
  },
};

export default function OwnedCards({ totalCards = 0, countsByGrade = {} }) {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: userService.getMe,
  });

  return (
    <section className="flex flex-col gap-[15px]">
      <div className="flex items-center gap-2">
        <span className="text-700-14 md:text-700-20 lg:text-700-24">
          {user?.nickname}님이 보유한 포토카드
        </span>
        <span className="text-gray-300 text-400-12 md:text-400-18 lg:text-400-20">
          ({totalCards}장)
        </span>
      </div>
      <div className="flex gap-2.5 whitespace-nowrap overflow-x-auto">
        {Object.keys(gradeStyle).map((gradeId) => {
          const count = countsByGrade[gradeId] ?? 0;
          const { label, border, text } = gradeStyle[gradeId];
          return (
            <div
              key={gradeId}
              className={clsx(
                "bg-my-black border text-300-12 px-2.5 py-1.5 text-center",
                border,
                text,
                label
              )}
            >
              {label} {count}장
            </div>
          );
        })}
      </div>
      <hr className="border-gray-400 mb-5 md:my-5" />
    </section>
  );
}
