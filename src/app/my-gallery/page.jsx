import React, { Suspense } from "react";
import MyPage from "./_components/MyPage";

export default function MyGalleryPage() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <MyPage />
    </Suspense>
  );
}
