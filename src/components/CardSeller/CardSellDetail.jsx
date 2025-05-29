"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import back from "@/assets/back.svg";
import Button from "../ui/Button";
import example from "@/assets/example.svg";
import MyCardDetail from "../ui/MyCardDetail";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { postCardSale } from "@/lib/api/api-sale";
import { useQueryClient } from "@tanstack/react-query";

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

export default function CardSellDetail({ card, availableCards, onClose }) {
  const queryClient = useQueryClient();

  const [selectedGrade, setSelectedGrade] = useState(card?.photoCard?.gradeId);
  const [gradeOpen, setGradeOpen] = useState(false);

  const [selectedGenre, setSelectedGenre] = useState(card?.photoCard?.genreId);
  const [genreOpen, setGenreOpen] = useState(false);

  const [description, setDescription] = useState("");
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(card?.price || "");

  const gradeRef = useRef(null);
  const genreRef = useRef(null);

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

  const handleSale = async () => {
    if (!availableCards || availableCards.length === 0) {
      alert("보유한 카드 정보를 찾을 수 없습니다.");
      return;
    }

    const selectedUserCardIds = availableCards
      .slice(0, count)
      .map((uc) => uc.id);

    if (selectedUserCardIds.length < count) {
      alert("판매할 수량만큼 보유 중인 카드가 부족합니다.");
      return;
    }

    try {
      await postCardSale({
        photoCardId: card.photoCard.id,
        userCardIds: selectedUserCardIds,
        salePrice: Number(price),
        saleQuantity: Number(count),
        desiredGradeId: selectedGrade,
        desiredGenreId: selectedGenre,
        desiredDescription: description,
      });

      queryClient.invalidateQueries(["myGalleryCards_v3"]);
      queryClient.invalidateQueries(["storeMainList"]);

      alert("판매가 등록되었습니다.");
      onClose();
    } catch (error) {
      console.error("판매 등록 실패", error);
      alert("판매 등록에 실패했습니다.");
    }
  };

  const imageUrl = card?.photoCard?.imageUrl?.startsWith("http")
    ? card.photoCard.imageUrl
    : `https://six-favoritephoto-4team-be.onrender.com${card?.photoCard?.imageUrl}`;

  return (
    <div className="fixed inset-0 z-50 bg-my-black text-white overflow-y-auto px-4 pt-4 pb-8">
      {/* 헤더 */}
      <div className="flex items-center mb-4">
        <button onClick={onClose} className="w-10 h-10 flex items-center">
          <Image src={back} alt="뒤로가기" width={24} height={24} />
        </button>
        <div className="flex-1 text-center title-20">
          나의 포토카드 판매하기
        </div>
      </div>

      {/* 카드 제목 */}
      <div className="text-700-24 font-bold mb-3">
        {card?.photoCard?.name || "카드 이름"}
      </div>

      <div className="w-full h-[2px] bg-gray-200 mb-4" />

      {/* 카드 이미지 */}
      <div className="w-full aspect-[4/3] relative mb-4">
        <Image
          src={imageUrl || example}
          alt="카드 이미지"
          fill
          className="object-cover"
        />
      </div>

      {/* 카드 상세 */}
      <MyCardDetail
        card={card}
        count={count}
        setCount={setCount}
        price={price}
        setPrice={setPrice}
      />

      {/* 교환 희망 정보 */}
      <div className="mt-25">
        <div className="text-white text-700-22 font-bold mb-3">
          교환 희망 정보
        </div>
        <div className="w-full h-[2px] bg-gray-200 mb-4" />

        {/* 등급 드롭다운 */}
        <div className="mt-10 relative" ref={gradeRef}>
          <label className="block text-white mb-2 text-700-16">등급</label>
          <button
            onClick={() => setGradeOpen(!gradeOpen)}
            className="w-full h-[55px] bg-my-black border border-white text-left px-3 flex justify-between items-center"
          >
            <span className="text-white">
              {grades.find((g) => g.id === selectedGrade)?.name || "선택"}
            </span>
            {gradeOpen ? <GoTriangleUp /> : <GoTriangleDown />}
          </button>
          {gradeOpen && (
            <ul className="absolute mt-1 w-full bg-my-black border border-white z-10">
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
        <div className="mt-8 relative" ref={genreRef}>
          <label className="block text-white mb-2 text-700-16">장르</label>
          <button
            onClick={() => setGenreOpen(!genreOpen)}
            className="w-full h-[55px] bg-my-black border border-white text-left px-3 flex justify-between items-center"
          >
            <span className="text-white">
              {genres.find((g) => g.id === selectedGenre)?.name || "선택"}
            </span>
            {genreOpen ? <GoTriangleUp /> : <GoTriangleDown />}
          </button>
          {genreOpen && (
            <ul className="absolute mt-1 w-full bg-my-black border border-white z-10">
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
            className="w-full bg-my-black border border-white text-white p-3 resize-none placeholder:text-gray-400 text-300-14"
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-3 mt-8">
        <Button type="reject" className="w-full h-[55px]" onClick={onClose}>
          취소하기
        </Button>
        <Button className="w-full h-[55px]" onClick={handleSale}>
          판매하기
        </Button>
      </div>
    </div>
  );
}