"use client";

import { useState } from "react";
import MyCardModal from "../CardSeller/MyCardModal";

export default function SellButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="fixed w-full md:max-w-[342px] lg:max-w-[440px] px-4 bottom-4 left-0 z-40 md:static md:px-0">
        <button
          onClick={handleClick}
          className="flex justify-center items-center w-full h-14 md:h-[60px] rounded-xs cursor-pointer text-700-16 text-my-black bg-main"
        >
          나의 포토카드 판매하기
        </button>
      </div>

      <MyCardModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
