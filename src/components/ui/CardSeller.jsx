"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button";
import GradeTag from "../tag/GradeTag";
import { useRouter } from "next/navigation";
import { cancelSaleById, getSaleDetail } from "@/lib/api/api-sale";
import { getMyCards } from "@/lib/api/api-users";
import EditCardModal from "../CardSeller/EditCardModal";
import { FiRefreshCw } from "react-icons/fi";
import { useAlertModal } from "@/providers/AlertModalProvider";

const genreMap = {
  1: "여행",
  2: "풍경",
  3: "인물",
  4: "사물",
};

const tierToGradeName = {
  1: "COMMON",
  2: "RARE",
  3: "SUPER RARE",
  4: "LEGENDARY",
};

export default function CardSeller({ sale: initialSale, onEditSuccess }) {
  const router = useRouter();
  const [sale, setSale] = useState(initialSale); // 내부에서 sale 관리
  const [availableCards, setAvailableCards] = useState([]);

  const { openModal: openNotiModal } = useAlertModal();

  const [showEditModal, setShowEditModal] = useState(false);

  // 수정하기 모드에서도 현 보유수량 데이터 호출
  useEffect(() => {
    async function fetchAvailableCards() {
      const res = await getMyCards({});
      const matchedCard = res.items.find(
        (item) => item.id === sale.photoCard.id
      );
      setAvailableCards(matchedCard?.userCards || []);
    }

    if (showEditModal) fetchAvailableCards();
  }, [showEditModal, sale.photoCard.id]);

  const handleEditSuccess = async () => {
    try {
      const updatedSale = await getSaleDetail(sale.id);
      setSale(updatedSale); // 최신 sale로 교체
      if (onEditSuccess) {
        onEditSuccess(updatedSale); // 상위 컴포넌트에 알림
      }
      setShowEditModal(false); // 모달 닫기

      if (onEditSuccess) {
        onEditSuccess(updatedSale); // 상위 컴포넌트에 알림
      }
    } catch (err) {
      console.error("판매 상세 정보 재요청 실패:", err);
    }
  };

  const performCancelSale = async () => {
    try {
      await cancelSaleById(sale.id);
      alert("판매가 성공적으로 중단되었습니다.");
      router.push("/home");
    } catch (err) {
      console.error("판매 중단 실패:", err);
      alert(err.message || "판매 중단에 실패했습니다.");
    }
  };

  const handleCancelSaleClick = () => {
    const gradeName = tierToGradeName[sale.photoCard.gradeId];
    const cardName = sale.photoCard.name;
    openNotiModal(
      "판매 내리기",
      { grade: gradeName, name: cardName },
      performCancelSale
    );
  };

  const {
    photoCard,
    seller,
    price,
    saleQuantity,
    cardGradeId,
    cardGenreId,
    desiredDescription,
  } = sale;

  return (
    <>
      <div>
        {/* 카드 정보 */}
        <div className="flex flex-col">
          <div className="flex-row-center gap-2.5 [&_*]:text-700-18 lg:[&_*]:text-700-24">
            <GradeTag grade={photoCard.gradeId} />
            <span className="text-gray-300">|</span>
            <span className="text-gray-300">{genreMap[photoCard.genreId]}</span>
            <p className="flex-1 text-end underline ml-auto">
              {seller.nickname}
            </p>
          </div>
        </div>

        <h3 className="w-full h-[1px] bg-gray-400 my-5"></h3>
        <div>
          <p className="text-400-16 lg:text-400-18">{photoCard.description}</p>
        </div>
        <h3 className="w-full h-[1px] bg-gray-400 my-5"></h3>
        <div className="flex-col gap-2.5">
          <div className="flex-between-center [&_*]:text-400-18 lg:[&_*]:text-400-20">
            <span className="text-gray-300">가격</span>
            <span>{price} P</span>
          </div>
          <div className="flex-between-center [&_*]:text-400-18 lg:[&_*]:text-400-20">
            <span className="text-gray-300">잔여</span>
            <div>
              <span>{saleQuantity} </span>
              <span className="text-gray-300">/ 10</span>
            </div>
          </div>
        </div>

        {/* 교환 희망 정보 */}
        <div className="py-24 flex-col gap-7 lg:gap-10">
          <div className="">
            <div className="flex-row-center gap-2.5 mb-2">
              <FiRefreshCw className="w-6 h-6 lg:w-7 lg:h-7" />
              <h2 className="text-700-22 lg:text-700-28">교환 희망 정보</h2>
            </div>
            <h3 className="w-full h-[1.5px] bg-gray-200"></h3>
          </div>
          <div className="flex-row-center gap-2.5 lg:gap-3.5 [&>span]:text-700-18 lg:[&>span]:text-700-24">
            <GradeTag grade={cardGradeId} />
            <span className="text-gray-300">|</span>
            <span className="text-gray-300">{genreMap[cardGenreId]}</span>
          </div>

          <h3 className="w-full h-[1px] bg-gray-400"></h3>
          <div>
            <p className="text-400-16 lg:text-400-18">{desiredDescription}</p>
          </div>
          <div className="flex-col gap-5">
            {saleQuantity > 0 ? (
              <>
                <Button type="purchase" onClick={() => setShowEditModal(true)}>
                  수정하기
                </Button>
                <Button type="sellDown" onClick={handleCancelSaleClick} />
              </>
            ) : (
              <Button type="purchase" disabled={true}>
                품절되었습니다
              </Button>
            )}
          </div>
        </div>
      </div>
      {showEditModal && (
        <EditCardModal
          card={{
            ...sale,
            photoCard: {
              ...sale.photoCard,
              userCards: availableCards || [], // sale 데이터 이외의 데이터 연결
            },
          }}
          availableCards={availableCards}
          onCloseModal={() => setShowEditModal(false)}
          onCloseDetail={() => setShowEditModal(false)}
          isEditMode={true}
          onEditSuccess={handleEditSuccess}
        />
      )}
    </>
  );
}
