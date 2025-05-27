// ExchangeCard.jsx (또는 tsx)
import React, { useEffect, useState } from "react";
import { Title } from "../ui/Title";

function ExchangeCard({ desiredDescription }) {
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    function onResize() {
      setIsMd(window.innerWidth >= 744);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div>
      <Title
        title="교환 희망 정보"
        buttonText={isMd ? "포토카드 교환하기" : undefined}
        font="titleLg_Noto"
      />
      <p className="mt-2 text-sm text-gray-700">{desiredDescription}</p>
    </div>
  );
}

export default ExchangeCard;
