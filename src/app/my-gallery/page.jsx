"use client";

import React from "react";
import GalleryTitle from "./_components/GalleryTitle";
import MyCard from "@/components/PhotoCard/MyCard";

export default function MyPage() {
  return (
    <>
      <GalleryTitle />
      <MyCard name="안녕" nickname="성경" image />
    </>
  );
}
