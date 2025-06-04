// 사용 설명은 노션에...
"use client";
import React from "react";
import { useAlertModal } from "@/providers/AlertModalProvider";
import { FiX } from "react-icons/fi";
import Button from "../ui/Button";
import clsx from "clsx";

export default function NotiModal() {
  const { isOpen, type, cardInfo, onAction, closeModal } = useAlertModal();

  const { grade = "", name = "", count = 1 } = cardInfo || {}; // 로그인 알람일 때는 내용 필요x

  if (!isOpen) return null;

  // 분기 처리: 글이 바뀌는 조건
  let title = "";
  let content1 = "";
  let content2 = "";
  let buttonText = "";

  switch (type) {
    case "로그인":
      title = "로그인이 필요합니다.";
      content1 = "로그인 하시겠습니까?";
      content2 = "다양한 서비스를 편리하게 이용하실 수 있습니다.";
      buttonText = "확인";
      break;
    case "구매":
      title = "포토카드 구매";
      content1 = `[${grade} | ${name}]`;
      content2 = `${count}장을 구매하시겠습니까?`;
      buttonText = "구매하기";
      break;
    case "교환 취소":
      title = "교환 제시 취소";
      content1 = `[${grade} | ${name}]`;
      content2 = "교환 제시를 취소하시겠습니까?";
      buttonText = "취소하기";
      break;
    case "교환 거절":
      title = "교환 제시 거절";
      content1 = `[${grade} | ${name}]`;
      content2 = "카드와의 교환을 거절하시겠습니까?";
      buttonText = "거절하기";
      break;
    case "교환 승인":
      title = "교환 제시 승인";
      content1 = `[${grade} | ${name}]`;
      content2 = "카드와의 교환을 승인하시겠습니까?";
      buttonText = "승인하기";
      break;
    case "판매 내리기":
      title = "포토카드 판매 내리기";
      content1 = "정말로 판매를 중단하시겠습니까?";
      content2 = "";
      buttonText = "판매 내리기";
      break;
  }

  // 버튼 연동 함수
  const handleButtonClick = () => {
    onAction?.(); // ?. <= 함수가 있을 때만 실행
    closeModal();
  };

  return (
    // 전체 화면 고정
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      {/* 배경 반투명하게 */}
      <div className="absolute inset-0 bg-black opacity-50 z-0" />

      {/* 모달 */}
      <div className="relative bg-gray-500 w-[345px] h-[291px] md:w-100 lg:w-140 lg:h-[375px] p-4 lg:p-12 flex flex-col items-center gap-7 rounded-[2px]">
        <FiX onClick={closeModal} className="w-5 h-5 stroke-2 self-end" />

        <h3 className="text-700-18 lg:text-700-20 mb-2">{title}</h3>

        <p className="text-gray-300 text-400-14 lg:text-400-16 mb-6 text-center">
          <span>{content1}&nbsp;</span>
          <br className={clsx(type === "로그인" ? "lg:block" : "lg:hidden")} />
          <span>{content2}</span>
        </p>

        <Button
          type="approve"
          onClick={handleButtonClick}
          className="!w-30 md:w-35 lg:w-[170px]"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
