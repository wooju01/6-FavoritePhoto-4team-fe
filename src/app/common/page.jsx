"use client";

import CardListPageEx from "@/components/FllterDropdown/CardListPageEx";
import { Suspense } from "react"; //useSearchParams를 사용해서 Suspense로 감싸야 안전하게 CSR 처리가 됩니다.
import Profile from "@/components/ui/Profile";
import Link from "next/link";
import React from "react";
import { Title } from "@/components/ui/Title";
import Button from "@/components/ui/Button";
import StatusTag from "@/components/tag/StatusTag";
import GradeTag from "@/components/tag/GradeTag";
import CardBuyer from "@/components/CardBuyer/CardBuyer";
import NotiModal from "@/components/modal/NotiModal";
import { useAlertModal } from "@/providers/AlertModalProvider";
import StateModal from "@/components/modal/StateModal";
import { useStateModal } from "@/providers/StateModalProvider";
import TempSort from "./TempSort";

export default function CommonPage() {
  const handleBuy = (qty) => {
    alert(`구매 수량: ${qty}`);
  };

  const { openModal } = useAlertModal();
  const { openModal: openStateModal } = useStateModal();

  const handleNotiModalClick = () => {
    openModal("교환 승인", { grade: "RARE", name: "짱짱 센 카드" }, () => {});
  };

  const handleStateModalClick = () => {
    openStateModal(200, "생성", {
      grade: "COMMON",
      name: "이미지가 있는 카드",
      count: 7,
    });
  };

  return (
    <div className="w-full">
      HomePage
      <Title
        title="마이페이지"
        buttonText="수정하기"
        onButtonClick={() => console.log("수정")}
        font="titleLg_Noto"
        buttonColor="yellow"
      />
      HomePage eddfered
      <Suspense fallback={null}>
        <CardListPageEx />
      </Suspense>
      <Link href="/test">
        <div>Input컴포넌트 확인용 페이지 클릭</div>
      </Link>
      배포 확인(배포에 문제가 있는 확인)
      <Suspense fallback={null}>
        <TempSort />
      </Suspense>
      <CardBuyer
        tier="COMMON"
        subLabel="동물"
        creator="하이"
        description="귀여운 동물 포토카드입니다. 어디까지 보이는거에요요요요요요요요요요요요요요요"
        pricePerCard={4}
        remaining={2}
        total={5}
        onBuy={handleBuy}
      />
      <CardBuyer
        tier="RARE"
        subLabel="동물"
        creator="하이"
        description="귀여운 동물 포토카드입니다. 어디까지 보이는거에요요요요요요요요요요요요요요요요요요요요요."
        pricePerCard={7}
        remaining={8}
        total={8}
        onBuy={handleBuy}
      />
      {/* Button 컴포넌트 테스트 섹션 - Button.jsx에 정의된 type 사용 */}
      <div className="mt-8 p-4 border-t border-gray-700">
        <h2 className="text-xl text-white mb-4">
          Button 컴포넌트 타입별 테스트
        </h2>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button type="purchase" />
            <Button type="exchangeGreen" />
            <Button type="approve" />

            <Button type="purchase" disabled />
            <Button type="exchangeGreen" disabled />
            <Button type="approve" disabled />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button type="exchangeBlack" />
            <Button type="reject" />
            <Button type="sellDown" />

            <Button type="exchangeBlack" disabled />
            <Button type="reject" disabled />
            <Button type="sellDown" disabled />
          </div>
        </div>
      </div>
      <div>
        <div>
          <StatusTag type="sale" size="sm" />
          <StatusTag type="sale" size="md" />
          <StatusTag type="sale" size="lg" />
        </div>
        <div>
          <StatusTag type="exchange" size="sm" />
          <StatusTag type="exchange" size="md" />
          <StatusTag type="exchange" size="lg" />
        </div>
        <div>
          <GradeTag grade="COMMON" size="xs" />
          <GradeTag grade="COMMON" size="md" />
          <GradeTag grade="COMMON" size="lg" />
          <GradeTag grade="COMMON" size="xl" />

          <GradeTag grade="RARE" size="xs" />
          <GradeTag grade="RARE" size="md" />
          <GradeTag grade="RARE" size="lg" />
          <GradeTag grade="RARE" size="xl" />

          <GradeTag grade="SUPER RARE" size="xs" />
          <GradeTag grade="SUPER RARE" size="md" />
          <GradeTag grade="SUPER RARE" size="lg" />
          <GradeTag grade="SUPER RARE" size="xl" />

          <GradeTag grade="LEGENDARY" size="xs" />
          <GradeTag grade="LEGENDARY" size="md" />
          <GradeTag grade="LEGENDARY" size="lg" />
          <GradeTag grade="LEGENDARY" size="xl" />
        </div>
        {/* Profile 컴포넌트 테스트 섹션 */}
        <div className="mt-8 p-4 border-t border-gray-700">
          <h2 className="text-xl text-white mb-4">Profile 컴포넌트 테스트</h2>
          <Profile />
        </div>
      </div>
      {/* 모달 사용하는 곳 */}
      <div className="mb-30 flex justify-center gap-10">
        <button
          onClick={handleNotiModalClick}
          className="bg-main text-my-black"
        >
          알림 모달 열기
        </button>
        <NotiModal />
        <button
          onClick={handleStateModalClick}
          className="bg-main text-my-black"
        >
          성공/실패 모달 열기
        </button>
        <StateModal />
      </div>
    </div>
  );
}
