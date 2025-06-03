import "./globals.css";

import Header from "@/components/layout/Header";
import Providers from "../providers/providers";

export const metadata = {
  title: "세상에서 가장 황당한 포토카드 거래 플랫폼",
  description: "세상에서 가장 황당한 포토카드 거래 플랫폼",
  keywords: ["포토카드", "최악의 포토", "포카 거래", "포카마켓"],
  authors: [{ name: "최악의 포토팀", url: "" }],
  openGraph: {
    title: "최악의 포토 - 웃음 폭발 포카 거래소",
    description: "가장 이상한 포토카드를 사고파는 곳, 지금 바로 시작해보세요!",
    url: "https://6-favorite-photo-4team-fe.vercel.app/", // 실제 서비스 도메인으로 바꿔야 함
    siteName: "최악의 포토",
    images: [
      {
        url: "https://6-favorite-photo-4team-fe.vercel.app/contents.png", // 썸네일 이미지 URL
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
    title: "최악의 포토 - 웃음 폭발 포카 거래소",
    description: "가장 이상한 포토카드를 사고파는 곳, 지금 바로 시작해보세요!",
    site: "https://6-favorite-photo-4team-fe.vercel.app/", // 있으면 넣고, 없으면 생략 가능
    creator: "mr.hoon",
    images: ["https://6-favorite-photo-4team-fe.vercel.app/contents.png"], // 동일 이미지 써도 됨
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="w-full">
        <div
          id="modal-root"
          className="mx-auto min-h-screen px-4 md:px-5 max-w-[1480px]"
        >
          <Providers>
            <Header />
            <main className="pb-20 md:pb-0">{children}</main>
          </Providers>
        </div>
      </body>
    </html>
  );
}
