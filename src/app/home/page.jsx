import { Suspense } from "react";
import SkeletonCardLayout from "@/components/skeletons/ResponsiveFallbackWrapper";
import SellButton from "@/components/ui/SellButton";
import DelayedBaseCardsSection from "@/components/HompageComponents/DelayedBaseCardsSection";
import BaseCardsSection from "@/components/HompageComponents/BaseCardsSection";
import RandomPoint from "@/components/RandomPoint";
import RandomPointHomeTrigger from "@/components/RandomPointHomeTrigger";

export default async function HomePage({ searchParams }) {
  const params = await searchParams;

  const grade = params?.grade ?? "";
  const genre = params?.genre ?? "";
  const sale = params?.sale ?? "";

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
        {({ onClose }) => <RandomPoint onClose={onClose} />}
      </RandomPointHomeTrigger>
      <div>
        <BaseCardsSection grade={grade} genre={genre} sale={sale} />
      </div>
    </div>
  );
}
