"use client";
import { useEffect, useState } from "react";
import PhotoBuyerSection from "@/components/PhotoBuyer/PhotoBuyerSection";
import ExchangeCard from "@/components/PhotoBuyer/ExchangeCard";
import { storeService } from "@/lib/api/api-store";
import { useRouter } from "next/navigation";

async function fetchPhotoDetail(id) {
  try {
    const photoData = await storeService.getStoreCardDetail(id);
    return photoData;
  } catch (err) {
    console.error("사진 상세 정보 로딩 실패:", err);
    return null;
  }
}

// 새로 추가하는 함수: 현재 사용자가 특정 listedCardId에 낸 거래 요청 조회
async function fetchTradeRequestsByApplicantAndCard(listedCardId) {
  try {
    const res = await storeService.getTradeRequests(listedCardId);
    return res;
  } catch (err) {
    console.error("거래 요청 정보 로딩 실패:", err);
    return [];
  }
}

export default function PhotoDetailPage({ params }) {
  const [photo, setPhoto] = useState(null);
  const [tradeRequests, setTradeRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
console.log("tradeRequests:", tradeRequests);
  useEffect(() => {
    if (!params.id) {
      setPhoto(null);
      setTradeRequests([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    (async () => {
      const photoData = await fetchPhotoDetail(params.id);
      if (!photoData) {
        router.push("/login");
        return;
      }
      setPhoto(photoData);

      // 여기서 거래 요청 데이터 받아오기
      const tradeReqs = await fetchTradeRequestsByApplicantAndCard(params.id);
      setTradeRequests(tradeReqs);

      setLoading(false);
    })();
  }, [params.id]);

  if (loading) return <p>로딩 중...</p>;
  if (!photo) return null;

  return (
    <section>
      <PhotoBuyerSection photo={photo.photoCard} />
      {/* 원하는 설명 전달 */}
      <ExchangeCard desiredDescription={photo.desiredDescription} />
      {/* 거래 요청 목록을 표시하는 컴포넌트, 예시: */}
      <div>
        <h3>내 거래 요청 내역</h3>
        {tradeRequests.length === 0 && <p>거래 요청이 없습니다.</p>}
        {tradeRequests.map((req) => (
          <div key={req.id}>
            <p>요청 상태: {req.tradeStatus}</p>
            <p>제공 카드들:</p>
            <ul>
              {req.tradeRequestUserCards.map(({ userCard }) => (
                <li key={userCard.id}>
                  {userCard.photoCard?.name ??
                    `포토카드 ID: ${userCard.photoCardId}`}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
