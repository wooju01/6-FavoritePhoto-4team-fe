"use client";

import React from "react";
import PostForm from "./_components/PostForm";
import PostTitle from "./_components/PostTitle";
import StateModal from "@/components/modal/StateModal";
import Noti from "./_components/Noti";
import usePostForm from "@/hooks/usePostForm";

export const metadata = {
  title: "최악의 포토 - 랜딩 페이지",
  description: "세상에서 가장 황당한 포토카드 거래 플랫폼",
  keywords: ["포토카드", "최악의 포토", "포카 거래", "포카마켓"],
  authors: [{ name: "최악의 포토팀", url: "https://yourdomain.com/" }],
  openGraph: {
    title: "최악의 포토 - 웃음 폭발 포카 거래소",
    description: "가장 이상한 포토카드를 사고파는 곳, 지금 바로 시작해보세요!",
    url: "https://yourdomain.com/", // 실제 서비스 도메인으로 바꿔야 함
    siteName: "최악의 포토",
    images: [
      {
        url: "https://yourdomain.com/og-image.png", // 썸네일 이미지 URL
        width: 1200,
        height: 630,
        alt: "최악의 포토 대표 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "최악의 포토 - 웃음 폭발 포카 거래소",
    description: "가장 이상한 포토카드를 사고파는 곳, 지금 바로 시작해보세요!",
    site: "@your_twitter", // 있으면 넣고, 없으면 생략 가능
    creator: "@your_twitter",
    images: ["https://yourdomain.com/og-image.png"], // 동일 이미지 써도 됨
  },
  metadataBase: new URL("https://yourdomain.com"), // 절대 경로 기준 URL
};

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
    <>
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
    </>
  );
}
