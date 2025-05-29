import React, { useEffect, useState } from "react";
import { Title } from "../ui/Title";
import GradeTag from "../tag/GradeTag";

function ExchangeCard({ desiredDescription, cardGradeId, cardGenreId }) {
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    function onResize() {
      setIsMd(window.innerWidth >= 744);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // 장르 ID → 장르명 매핑
  const genreMap = {
    1: "여행",
    2: "풍경",
    3: "인물",
    4: "사물",
  };
  const genreText = genreMap[cardGenreId] || "알 수 없음";

  return (
    <div>
      <Title
        title="교환 희망 정보"
        buttonText={isMd ? "포토카드 교환하기" : undefined}
        font="titleLg_Noto"
      />
      <p className="mt-2 text-sm text-gray-700">{desiredDescription}</p>
      <p className="mt-1 text-sm text-gray-500">
        카드 등급: <GradeTag grade={cardGradeId} />
      </p>
      <p className="mt-1 text-sm text-gray-500">카드 장르: {genreText}</p>
    </div>
  );
}

export default ExchangeCard;

