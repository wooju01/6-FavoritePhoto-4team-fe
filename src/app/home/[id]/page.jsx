"use client";
import { useEffect, useState } from "react";
import PhotoBuyerSection from "@/components/PhotoBuyer/PhotoBuyerSection";
import { storeService } from "@/lib/api/api-store";
import { useRouter } from "next/navigation";
import ExchangeCard from "@/components/PhotoBuyer/ExchangeCard";

async function fetchPhotoDetail(id) {
  try {
    const photoData = await storeService.getStoreCardDetail(id);
    return photoData;
  } catch (err) {
    console.error("사진 상세 정보 로딩 실패:", err);
    return null; // 오류 발생 시 null 반환
  }
}

export default function PhotoDetailPage({ params }) {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      setLoading(true); // 데이터 가져오기 시작 시 로딩 상태로 설정
      const loadPhotoData = async () => {
        const data = await fetchPhotoDetail(params.id);
        setPhoto(data);
        setLoading(false); // 데이터 가져오기 완료 후 로딩 상태 해제
      };
      loadPhotoData();
    } else {
      // params.id가 없는 경우 (예: URL 직접 접근 시 ID가 누락된 경우)
      setPhoto(null);
      setLoading(false);
    }
  }, [params.id]); // params.id가 변경될 때마다 실행

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (!photo) {
    r;
    return null;
  }

  return (
    <section>
      <PhotoBuyerSection photo={photo.photoCard} />
      <ExchangeCard desiredDescription={photo.desiredDescription} />
    </section>
  );
}
