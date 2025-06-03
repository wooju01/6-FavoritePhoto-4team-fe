"use client";

import React from "react";
import PostForm from "./_components/PostForm";
import PostTitle from "./_components/PostTitle";
import StateModal from "@/components/modal/StateModal";
import Noti from "./_components/Noti";
import usePostForm from "@/hooks/usePostForm";

export const metadata = {
  title: "최애의 포토",
  description: "나만의 카드를 생성하고 거래할 수 있는 커뮤니티입니다.",
  keywords: ["포토카드", "포카 거래", "사진"],
  authors: [
    {
      name: "코드잇 4팀",
      url: "https://github.com/afafmmm/6-FavoritePhoto-4team-fe",
    },
  ],
  openGraph: {
    title: "최애의 포토",
    description: "나만의 카드를 생성하고 거래할 수 있는 커뮤니티입니다.",
    url: "https://6-favorite-photo-4team-fe.vercel.app/",
    siteName: "최애의 포토",
    images: [
      {
        url: "https://6-favorite-photo-4team-fe.vercel.app/contents.png",
        width: 1200,
        height: 630,
        alt: "최애의 포토 대표 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "최애의 포토",
    description: "나만의 카드를 생성하고 거래할 수 있는 커뮤니티입니다.",
    site: "https://6-favorite-photo-4team-fe.vercel.app/", // 있으면 넣고, 없으면 생략 가능
    creator: "코드잇 4팀",
    images: ["https://6-favorite-photo-4team-fe.vercel.app/contents.png"], // 동일 이미지 써도 됨
  },
  metadataBase: new URL("https://github.com/afafmmm/6-FavoritePhoto-4team-fe"), // 절대 경로 기준 URL
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
