import SellButton from "@/components/ui/SellButton";
import BaseCardsSection from "@/components/HompageComponents/BaseCardsSection";
import RandomPoint from "@/components/point/RandomPoint";
import RandomPointHomeTrigger from "@/components/point/RandomPointHomeTrigger";
import NotiModal from "@/components/modal/NotiModal";

export const metadata = {
  title: "최애의 포토",
  description: "포토카드를 확인하세요",
  openGraph: {
    title: "최애의 포토",
    description: "사진을 만들고 공유할 수 있는 커뮤니티입니다.",
    type: "website",
    images: ["https://6-favorite-photo-4team-fe.vercel.app/contents.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "최애의 포토",
    description: "가장 이상한 포토카드를 사고파는 곳, 지금 바로 시작해보세요!",
    site: "@your_twitter",
    creator: "나야 나~",
    images: ["https://6-favorite-photo-4team-fe.vercel.app/contents.png"],
  },
};

export default async function HomePage({ searchParams }) {
  const params = await searchParams;

  const grade = params?.grade ?? "";
  const genre = params?.genre ?? "";
  const sale = params?.sale ?? "";
  const keyword = params?.keyword ?? "";
  const orderBy = params?.orderBy ?? "낮은 가격순";

  return (
    <div>
      {/* 헤더 영역 */}
      <div className="flex flex-col gap-5 md:pt-7 lg:pt-14">
        <div className="flex items-center justify-between">
          <h2 className="hidden md:block title-48 lg:title-62">마켓플레이스</h2>
          <SellButton />
        </div>
        <div className="hidden md:block w-full h-0.5 bg-gray-100" />
      </div>
      <RandomPointHomeTrigger>
        <RandomPoint />
      </RandomPointHomeTrigger>
      <div>
        <BaseCardsSection
          grade={grade}
          genre={genre}
          sale={sale}
          keyword={keyword}
          orderBy={orderBy}
        />
      </div>
      <NotiModal />
    </div>
  );
}
