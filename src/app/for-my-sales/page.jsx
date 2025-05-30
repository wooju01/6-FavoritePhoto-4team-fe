import React from "react";
import ForMySales from "./ForMySales";

export default function MySalesPage() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <ForMySales />
    </Suspense>
  );
}
