"use client";

import React from "react";
import PostForm from "./_components/PostForm";
import PostTitle from "./_components/PostTitle";
import StateModal from "@/components/modal/StateModal";
import Noti from "./_components/Noti";
import usePostForm from "@/hooks/usePostForm";

export default function CardPostPage() {
  const {
    meta, // 등급/장르
    data, // 카드 생성 횟수
    isPostPending,
    isMetaPending,
    isCountPending,
    isPostError,
    isMetaError,
    isCountError,
  } = usePostForm();

  if (isPostPending || isMetaPending || isCountPending)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>로딩 중입니다...</p>
        <svg
          className="ml-3 size-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );
  if (isPostError || isMetaError || isCountError)
    return <p>데이터를 불러오는 데 실패했습니다.</p>;

  return (
    <div className="my-5">
      {data?.count >= 3 && <Noti />}
      <PostTitle creationNumber={data?.count ?? 0} />
      <PostForm
        genres={meta.genres}
        grades={meta.grades}
        disabled={data?.count >= 3}
      />
      <StateModal />
    </div>
  );
}
