// 사용 설명은 노션에...

import React from "react";
import { useRouter } from "next/navigation";
import { useStateModal } from "@/providers/StateModalProvider";
import Button from "../ui/Button";
import clsx from "clsx";
import { FiX } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";

export default function StateModal() {
  const router = useRouter();
  const { isOpen, status, type, cardInfo, closeModal } = useStateModal();

  if (!isOpen) return null;

  // 분기 처리: 단어 바뀌는 조건
  const isSuccess = status >= 200 && status < 300;
  let buttonText = "";
  let path = "/";
  let textOrCount = "";
  let title = "";

  switch (type) {
    case "판매":
      title = "판매 등록";
      textOrCount = cardInfo.count + "장";
      if (isSuccess) {
        buttonText = "나의 판매 포토카드에서 확인하기";
        path = "/for-my-sales";
      } else {
        buttonText = "마켓플레이스로 돌아가기";
        path = "/home";
      }
      break;

    case "구매":
      title = "구매";
      textOrCount = cardInfo.count + "장";
      if (isSuccess) {
        buttonText = "마이갤러리에서 확인하기";
        path = "/my-gallery";
      } else {
        buttonText = "마켓플레이스로 돌아가기";
        path = "/home";
      }
      break;

    case "생성":
      title = "포토카드 생성";
      textOrCount = "포토카드";
      if (isSuccess) {
        buttonText = "마이갤러리에서 확인하기";
        path = "/my-gallery";
      } else {
        buttonText = "마이갤러리로 돌아가기";
        path = "/my-gallery";
      }
      break;
  }

  // 이동
  const handleRoute = () => {
    closeModal();
    router.push(path);
  };

  /**
   * 내용
   */
  return (
    <div className="fixed inset-0 z-99999 md:z-50 flex justify-center items-center bg-my-black">
      <div className="relative bg-my-black w-[230px] md:w-[600px] h-[212px]">
        {/* tablet 이상일 때 x 아이콘 보임 */}
        <button
          onClick={closeModal}
          className="hidden md:inline-block absolute right-0"
        >
          <FiX className="w-9 h-9 stroke-2" />
        </button>

        <div className="md:p-20 bg-inherit">
          <h3 className="title-30 mb-8 mt-1 text-center">
            <span>{title}&nbsp;</span>
            <span className={clsx(isSuccess ? "text-main" : "text-gray-300")}>
              {isSuccess ? "성공" : "실패"}
            </span>
          </h3>

          <p className="text-700-16 text-center mb-10 md:mb-20 text-nowrap">
            <span>
              [{cardInfo.grade} | {cardInfo.name}]&nbsp;
            </span>
            <br className="md:hidden" />
            <span>
              {textOrCount} {type}에 {isSuccess ? "성공" : "실패"}했습니다!
            </span>
          </p>

          <Button
            type="exchangeBlack"
            onClick={handleRoute}
            className="w-[226px] lg:w-110 mb-1"
          >
            {buttonText}
          </Button>
        </div>
      </div>

      {/* mobile일 때 > 아이콘 보임 */}
      <button onClick={closeModal} className="absolute left-2 top-2">
        <IoIosArrowBack className="w-6 h-6" />
      </button>
    </div>
  );
}
