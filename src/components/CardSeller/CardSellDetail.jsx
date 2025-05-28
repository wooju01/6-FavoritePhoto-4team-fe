"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import back from "@/assets/back.svg";
import Button from "../ui/Button";
import example from "@/assets/example.svg";
import MyCardDetail from "../ui/MyCardDetail";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

const grades = ["COMMON", "RARE", "SUPER RARE", "LEGENDARY"];
const genres = ["여행", "풍경", "인물", "사물"];

export default function CardSellDetail({ onClose }) {
  const [selectedGrade, setSelectedGrade] = useState(grades[0].id);
  const [gradeOpen, setGradeOpen] = useState(false);

  const [selectedGenre, setSelectedGenre] = useState(genres[0].id);
  const [genreOpen, setGenreOpen] = useState(false);

  const gradeRef = useRef(null);
  const genreRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (gradeRef.current && !gradeRef.current.contains(e.target)) {
        setGradeOpen(false);
      }
      if (genreRef.current && !genreRef.current.contains(e.target)) {
        setGenreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      <div className="text-700-24 font-bold mb-3">우리집 앞마당</div>

      <div className="w-full h-[2px] bg-gray-200 mb-4" />

      {/* 상단 이미지 + 정보 */}
      <div className="w-full aspect-[4/3] relative mb-4">
        <Image src={example} alt="카드 이미지" fill className="object-cover" />
      </div>

      <MyCardDetail />

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
            <span
              className={
                selectedGrade ? "text-white" : "text-gray-400 text-300-14"
              }
            >
              {selectedGrade || "등급을 선택해 주세요"}
            </span>
            {gradeOpen ? <GoTriangleUp /> : <GoTriangleDown />}
          </button>
          {gradeOpen && (
            <ul className="absolute mt-1 w-full bg-my-black border border-white z-10">
              {grades.map((grade) => (
                <li
                  key={grade}
                  className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setSelectedGrade(grade);
                    setGradeOpen(false);
                  }}
                >
                  {grade}
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
            <span
              className={
                selectedGenre ? "text-white" : "text-gray-400 text-300-14"
              }
            >
              {selectedGenre || "장르를 선택해 주세요"}
            </span>
            {genreOpen ? <GoTriangleUp /> : <GoTriangleDown />}
          </button>
          {genreOpen && (
            <ul className="absolute mt-1 w-full bg-my-black border border-white z-10">
              {genres.map((genre) => (
                <li
                  key={genre}
                  className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setSelectedGenre(genre);
                    setGenreOpen(false);
                  }}
                >
                  {genre}
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
            placeholder="설명을 입력해 주세요"
            className="w-full bg-my-black border border-white text-white p-3 resize-none placeholder:text-gray-400 text-300-14"
          />
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-3 mt-8">
        <Button type="reject" className="w-full h-[55px]">
          취소하기
        </Button>
        <Button className="w-full h-[55px]">판매하기</Button>
      </div>
    </div>
  );
}
