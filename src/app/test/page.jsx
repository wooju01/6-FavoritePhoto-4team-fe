// // import CardSeller from "@/components/ui/CardSeller";
// // import MyCardDetail from "@/components/ui/MyCardDetail";

// import BaseCard from "@/components/ui/BaseCard";
// import example from "@/assets/example.svg";
// import Button from "@/components/ui/Button";

// export default function MarketModal() {
//   return (
//     // <div className="flex justify-center mt-10">
//     //   {/* <MyCardDetail /> */}
//     //   <CardSeller />
//     // </div>

//     // 데이터 연결후: 각 props에 Card.~ 이런 식으로 연결
//     <div className="p-6 bg-black min-h-screen flex flex-col gap-2 items-center">
//       {/* 공통 마켓 페이지용 */}
//       <BaseCard
//         title="우리집 앞마당 "
//         image={example}
//         grade="COMMON"
//         category="풍경"
//         owner="미쓰손"
//         price="4"
//         amount="2 / 5" // {`${Card.remain} / ${Card.total}`}
//         amountLabel="잔여" // 데이터 연결 x
//         isFavorite // 이 부분은 데이터 연결 x
//       />

//       {/* '나의 포토카드 판매하기' 모달용 */}
//       <BaseCard
//         title="How Far I'll Go"
//         image={example}
//         grade="COMMON"
//         category="풍경"
//         owner="랍스타"
//         price="4"
//         amount="1"
//         amountLabel="수량"
//         isFavorite
//       />

// {
//   /* 판매 포토카드 상세 - 교환 제시 목록용 */
// }
// <BaseCard
//   title="스페인 여행"
//   image={example}
//   grade="COMMON"
//   category="풍경"
//   owner="프로여행러"
//   price="4"
//   showPurchasePrice
// >
//   <div className="space-y-6">
//     <p className="text-sm text-gray-300">
//       스페인 여행 사진도 좋은데.. 우리집 앞마당 포토카드와 교환하고 싶습니다!
//     </p>
//     <div className="flex gap-3">
//       <Button type="reject" className="w-full">
//         거절하기
//       </Button>
//       <Button type="approve" className="w-full">
//         승인하기
//       </Button>
//     </div>
//   </div>
// </BaseCard>;
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
// import example from "@/assets/example.svg";
// import BaseCard from "@/components/ui/BaseCard";
import Button from "@/components/ui/Button";
import MyCardModal from "@/components/CardSeller/MyCardModal";

// const cardData = Array(15).fill({
//   title: "How Far I'll Go",
//   image: example,
//   grade: "COMMON",
//   category: "풍경",
//   owner: "랍스타",
//   price: "4",
//   amount: "1",
//   amountLabel: "수량",
//   isFavorite: true,
// });

// export default function Test() {
//   return (
//     <div className="max-w-[1240px] mx-auto px-1 py-10">
//       <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-1.5 md:gap-5 lg:gap-15">
//         {cardData.map((card, idx) => (
//           <BaseCard
//             key={idx}
//             title={card.title}
//             image={card.image}
//             grade={card.grade}
//             category={card.category}
//             owner={card.owner}
//             price={card.price}
//             amount={card.amount}
//             amountLabel={card.amountLabel}
//             isFavorite={card.isFavorite}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function ExchangeCardList() {
//   const data = Array.from({ length: 15 });

//   return (
//     <div className="max-w-[1240px] mx-auto px-1 py-10">
//       <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-1.5 md:gap-5 lg:gap-10">
//         {data.map((_, index) => (
//           <BaseCard
//             key={index}
//             title="스페인 여행"
//             image={example}
//             grade="COMMON"
//             category="풍경"
//             owner="프로여행러"
//             price="4"
//             showPurchasePrice
//           >
//             <div className="space-y-4">
//               <p className="text-400-10 md:text-400-16 text-gray-300">
//                 스페인 여행 사진도 좋은데.. 우리집 앞마당 포토카드와 교환하고
//                 싶습니다!
//               </p>
//               <div className="flex gap-2">
//                 <Button type="reject" className="" />
//                 <Button type="approve" className="" />
//               </div>
//             </div>
//           </BaseCard>
//         ))}
//       </div>
//     </div>
//   );
// }

import SellerPage from "@/components/CardSeller/SellerPage";

export default function page() {
  return <SellerPage />;
}
