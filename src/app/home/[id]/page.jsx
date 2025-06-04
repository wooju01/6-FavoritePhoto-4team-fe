"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSaleDetail } from "@/lib/api/api-sale";
import { getMe } from "@/lib/api/api-users";
import SellerPage from "@/components/CardSeller/SellerPage";
import PhotoBuyerDetail from "@/components/PhotoBuyer/PhotoBuyerDetail";
import NotiModal from "@/components/modal/NotiModal";

export default function PhotoDetailPage() {
  const { id: saleId } = useParams();
  const [sale, setSale] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [saleData, userData] = await Promise.all([
          getSaleDetail(saleId),
          getMe(),
        ]);
        setSale(saleData);
        setCurrentUser(userData);
      } catch (err) {
        console.error("에러 발생:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [saleId]);

  if (loading || !sale) return <div>로딩 중...</div>;

  const isSeller = sale?.seller?.id === currentUser?.id;

  return (
    <>
      {isSeller ? <SellerPage sale={sale} /> : <PhotoBuyerDetail sale={sale} />}

      <NotiModal />
    </>
  );
}
