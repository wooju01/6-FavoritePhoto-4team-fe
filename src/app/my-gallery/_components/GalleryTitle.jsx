"use client";

import React from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function GalleryTitle({ creationNumber = 3, disabled = false }) {
  const router = useRouter();
  const now = format(new Date(), "yyyy년 MM월");

  return (
    <>
      <header className="flex items-center justify-between mb-3">
        <h2 className="hidden md:block title-48 lg:title-62">마이갤러리</h2>
        <div className="flex items-end gap-3">
          <span className="hidden md:inline text-400-14 text-gray-300">
            {now}
          </span>

          <button
            disabled={disabled}
            onClick={() => {
              if (disabled) return;
              router.push("/my-gallery/post");
            }}
            className={clsx(
              "disabled:bg-gray-400 disabled:text-gray-300 disabled:!cursor-not-allowed",
              "bg-main text-my-black cursor-pointer",
              "flex justify-center items-center w-[345px] h-[55px] md:h-15 rounded-xs text-700-16"
            )}
          >
            포토카드 생성하기 ({creationNumber}/3)
          </button>
        </div>
      </header>
      <hr className="hidden md:block w-full h-0.5 bg-gray-100" />
    </>
  );
}
