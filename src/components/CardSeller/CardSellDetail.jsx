"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import back from "@/assets/back.svg";
import Button from "../ui/Button";
import MyCardDetail from "../ui/MyCardDetail";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { patchCardSale, postCardSale } from "@/lib/api/api-sale";
import { useQueryClient } from "@tanstack/react-query";
import { useStateModal } from "@/providers/StateModalProvider";
import StateModal from "../modal/StateModal";
import { useRouter } from "next/navigation";
import closeIcon from "@/assets/close.svg";

const grades = [
  { id: 1, name: "COMMON" },
  { id: 2, name: "RARE" },
  { id: 3, name: "SUPER RARE" },
  { id: 4, name: "LEGENDARY" },
];

const genres = [
  { id: 1, name: "여행" },
  { id: 2, name: "풍경" },
  { id: 3, name: "인물" },
  { id: 4, name: "사물" },
];

export default function CardSellDetail({
  card,
  availableCards,
  onCloseDetail,
  onCloseModal,
  isEditMode = false,
}) {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { openModal: openStateModal } = useStateModal();

  const [selectedGrade, setSelectedGrade] = useState(
    isEditMode ? card?.cardGradeId : card?.grade?.id
  );

  const [selectedGenre, setSelectedGenre] = useState(
    isEditMode ? card?.cardGenreId : card?.genre?.id
  );

  const [description, setDescription] = useState(
    isEditMode ? card?.desiredDescription : ""
  );
  const [count, setCount] = useState(isEditMode ? card?.saleQuantity : 1);
  const [price, setPrice] = useState(
    isEditMode ? card?.price : card?.userCard?.price || ""
  );

  const [gradeOpen, setGradeOpen] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);
  const gradeRef = useRef(null);
  const genreRef = useRef(null);

  const [isClosing, setIsClosing] = useState(false); // md버전: 모달닫힘 애니메이션용
  const handleSlideBarClick = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      if (typeof onCloseModal === "function") {
        onCloseModal(); // lg에서만 닫기 실행
      } else {
        onCloseDetail(); // md/모바일에서는 CardSellDetail 자체만 닫기
      }
    }, 300);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (gradeRef.current && !gradeRef.current.contains(e.target)) {
        setGradeOpen(false);
      }
      if (genreRef.current && !genreRef.current.contains(e.target)) {
        setGenreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = async () => {
    if (!isEditMode && (!availableCards || availableCards.length === 0)) {
      alert("보유한 카드 정보를 찾을 수 없습니다.");
      return;
    }

    const selectedUserCardIds =
      availableCards?.slice(0, count)?.map((uc) => uc.id) || [];

    if (!isEditMode && selectedUserCardIds.length < count) {
      alert("판매할 수량만큼 보유 중인 카드가 부족합니다.");
      return;
    }

    const actualCardGradeName =
      grades.find((g) => g.id === card?.photoCard?.gradeId)?.name ||
      "등급 정보 없음"; // 백엔드 바뀌면서 안되니까 수정필요요
    const stateModalCardInfo = {
      grade: actualCardGradeName,
      name: card?.photoCard?.name || "카드 이름",
      count: Number(count),
    };

    try {
      if (isEditMode) {
        // 판매 수정 API 호출
        await patchCardSale(card.id, {
          salePrice: Number(price),
          saleQuantity: Number(count),
          desiredGradeId: selectedGrade,
          desiredGenreId: selectedGenre,
          desiredDescription: description,
        });

        queryClient.invalidateQueries(["storeMainList"]);
        router.push("/for-my-sales");
      } else {
        // 판매 등록 API 호출
        await postCardSale({
          photoCardId: card.photoCard.id,
          userCardIds: selectedUserCardIds,
          salePrice: Number(price),
          saleQuantity: Number(count),
          desiredGradeId: selectedGrade,
          desiredGenreId: selectedGenre,
          desiredDescription: description,
        });

        openStateModal(200, "판매", stateModalCardInfo);
        queryClient.invalidateQueries(["myGalleryCards_v3"]);
        queryClient.invalidateQueries(["storeMainList"]);
      }
    } catch (error) {
      console.error("판매 처리 실패", error);
      const status = error.response?.status || 500; // 서버 에러 또는 일반 에러
      openStateModal(status, "판매", stateModalCardInfo);
    }
  };

  return (
    <div
      className={`
        relative bg-my-black md:bg-gray-500 text-white overflow-y-auto
        px-4 pt-4 pb-8 
        ${isClosing ? "animate-slide-down" : "animate-slide-up"}
        lg:animate-none
        
        md:rounded-t-sm md:h-[90%]
        
        lg:rounded-md
        lg:max-w-[1160px] lg:w-full lg:max-h-[920px]
        lg:px-0 lg:pt-0 lg:pb-0 lg:pr-8
        `}
    >
      {/* 슬라이드바 (md만) */}
      <div
        className="w-10 h-1 bg-gray-600 rounded-full mx-auto mb-3 mt-2 hidden md:block lg:hidden"
        onClick={handleSlideBarClick}
      />

      {/* 헤더 (모바일 전용) */}
      <div className="flex items-center mb-4 md:hidden">
        <button onClick={onCloseDetail} className="w-10 h-10 flex items-center">
          <Image src={back} alt="뒤로가기" width={24} height={24} />
        </button>
        <div className="flex-1 text-center title-20">
          {isEditMode ? "수정하기" : "나의 포토카드 판매하기"}
        </div>
      </div>

      {/* 모달명 (md, lg 전용) */}
      <div className="hidden md:block text-start text-gray-300 mb-2 md:mb-8 md:mt-6 lg:mt-0.5 title-14 md:title-18 lg:title-24">
        나의 포토카드 판매하기
      </div>

      {/* 카드 제목 */}
      <div className="text-700-24 md:text-700-32 mb-3">
        {card?.photoCard?.name || "카드 이름"}
      </div>

      <div className="w-full h-[2px] bg-gray-200 mb-4" />

      <div className="flex flex-col md:flex-row md:items-start md:gap-6 mb-8">
        {/* 카드 이미지 */}
        <div className="w-full md:w-1/2 aspect-[4/3] relative mb-4 md:mb-0">
          <Image
            src={card.photoCard.imageUrl}
            alt="카드 이미지"
            fill
            className="object-cover"
          />
        </div>

        {/* 카드 상세 */}
        <div className="w-full md:w-1/2">
          <MyCardDetail
            card={card}
            count={count}
            setCount={setCount}
            price={price}
            setPrice={setPrice}
            isEditMode={isEditMode}
          />
        </div>
      </div>

      {/* 교환 희망 정보 */}
      <div className="mt-25">
        <div className="text-white text-700-22 font-bold mb-3">
          교환 희망 정보
        </div>
        <div className="w-full h-[2px] bg-gray-200 mb-4" />

        {/* 등급 + 장르: md, lg는 가로 정렬 */}
        <div className="flex flex-col mt-10 md:flex-row md:gap-4">
          {/* 등급 드롭다운 */}
          <div className="w-full md:w-1/2 relative" ref={gradeRef}>
            <label className="block text-white mb-2 text-700-16">등급</label>
            <button
              onClick={() => setGradeOpen(!gradeOpen)}
              className="w-full h-[55px] bg-gray-500 border border-white text-left px-3 flex justify-between items-center"
            >
              <span
                className={
                  selectedGrade ? "text-white" : "text-gray-300 text-300-14"
                }
              >
                {grades.find((g) => g.id === selectedGrade)?.name ||
                  "등급을 선택해 주세요"}
              </span>
              {gradeOpen ? <GoTriangleUp /> : <GoTriangleDown />}
            </button>
            {gradeOpen && (
              <ul className="absolute mt-1 w-full bg-gray-500 border border-white z-10">
                {grades.map((grade) => (
                  <li
                    key={grade.id}
                    className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setSelectedGrade(grade.id);
                      setGradeOpen(false);
                    }}
                  >
                    {grade.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 장르 드롭다운 */}
          <div className="mt-8 md:mt-0 w-full md:w-1/2 relative" ref={genreRef}>
            <label className="block text-white mb-2 text-700-16">장르</label>
            <button
              onClick={() => setGenreOpen(!genreOpen)}
              className="w-full h-[55px] bg-gray-500 border border-white text-left px-3 flex justify-between items-center"
            >
              <span
                className={
                  selectedGrade ? "text-white" : "text-gray-300 text-300-14"
                }
              >
                {genres.find((g) => g.id === selectedGenre)?.name ||
                  "장르를 선택해 주세요"}
              </span>
              {genreOpen ? <GoTriangleUp /> : <GoTriangleDown />}
            </button>
            {genreOpen && (
              <ul className="absolute mt-1 w-full bg-gray-500 border border-white z-10">
                {genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setSelectedGenre(genre.id);
                      setGenreOpen(false);
                    }}
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 교환 희망 설명 */}
        <div className="mt-8">
          <label className="block text-white mb-2 text-700-16">
            교환 희망 설명
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="설명을 입력해 주세요"
            className="w-full bg-gray-500 border border-white text-white p-3 resize-none placeholder:text-gray-300 text-300-14"
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-3 mt-10">
        <Button
          type="reject"
          className="w-full h-[55px]"
          onClick={onCloseDetail}
        >
          취소하기
        </Button>
        <Button
          type="exchangeGreen"
          className="w-full h-[55px]"
          onClick={handleAction}
        >
          {isEditMode ? "수정하기" : "판매하기"}
        </Button>
      </div>
      {!isEditMode && <StateModal />}
    </div>
  );
}
