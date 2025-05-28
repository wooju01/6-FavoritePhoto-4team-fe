"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CardBuyer from "../CardBuyer/CardBuyer";
import { Title } from "../ui/Title";
import example from "@/assets/example.svg";
import ExchangeCard from "./ExchangeCard";
export default function PhotoBuyerSection({ photo }) {
  const genreMap = {
    1: "여행",
    2: "풍경",
    3: "인물",
    4: "사물",
  };

  const tierMap = {
    1: "COMMON",
    2: "RARE",
    3: "SUPER RARE",
    4: "LEGENDARY",
  };

  const handleBuy = (quantity) => {
    alert(`${quantity}장 구매 요청`);
  };

  return (
    <section className="w-full">
      <Title title={photo.photoCard.name} font="titleLg_Noto" />

      <div className="md:flex">
        <div className="w-full h-[260px] lg:h-[720px] overflow-hidden rounded-md mb-4 relative">
          <Image
            src={photo.photoCard.imageUrl}
            alt={photo.photoCard.name}
            fill
            className="object-cover"
          />
        </div>

        <CardBuyer
          tier={photo.cardGradeId}
          subLabel={genreMap[photo.cardGenreId] || "풍경"}
          creator={photo.photoCard.name}
          description={photo.photoCard.description}
          pricePerCard={photo.price}
          remaining={photo.saleQuantity}
          total={photo.photoCard.totalQuantity}
          onBuy={handleBuy}
        />
      </div>
    </section>
  );
}
