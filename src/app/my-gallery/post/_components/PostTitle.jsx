import React from "react";
import { format } from "date-fns";

export default function PostTitle({ creationNumber }) {
  const now = format(new Date(), "yyyy년 MM월");

  return (
    <div className="border-b border-gray-100 pb-5 mb-15 mt-10 md:flex md:justify-between md:items-end hidden">
      <h2 className="title-48 lg:title-62">포토카드 생성</h2>
      <span>
        <span className="mr-1 title-40 text-main">
          {Math.max(0, 3 - (creationNumber ?? 0))}
        </span>
        <span className="mr-3 title-28">/3</span>
        <span className="text-gray-300">{`(${now})`}</span>
      </span>
    </div>
  );
}
