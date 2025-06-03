import React, { Suspense } from "react";
import MyPage from "./_components/MyPage";

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

export default function MyGalleryPage() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <MyPage />
    </Suspense>
  );
}
