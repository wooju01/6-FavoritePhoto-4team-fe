"use client";

import { userService } from "@/lib/api/api-users";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function OwnedCards({ cardsNumber = 0 }) {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: userService.getMe,
  });

  return (
    <div className="flex items-center gap-2">
      <span className="text-700-14 md:text-700-20 lg:text-700-24">
        {user?.nickname}님이 보유한 포토카드
      </span>
      <span className="text-gray-300 text-400-12 md:text-400-18 lg:text-400-20">
        ({cardsNumber}장)
      </span>
    </div>
  );
}
