"use client";

import clsx from "clsx";
import React, { useRef, useState } from "react";
import ErrorText from "./ErrorText";
import { FiX } from "react-icons/fi";

export default function File({ label, error, onChange }) {
  const fileRef = useRef();

  const [fileName, setFileName] = useState("사진 업로드");

  // file-input에서 file 넣으면 이름을 바꿈
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setFileName(file.name);
      if (onChange) onChange(file); // 사진 넣었으면 file
    } else {
      setFileName("사진 업로드");
      if (onChange) onChange(null); // 안 넣었으면 null
    }
  };

  // x 버튼 누르면 들어간 이름과 file 초기화
  const handleFileRemove = () => {
    if (fileRef.current) {
      fileRef.current.value = "";
    }

    setFileName("사진 업로드");
    if (onChange) onChange(null);
  };

  return (
    <div className="bg-transparent flex flex-col gap-2.5 w-full max-w-[345px] md:max-w-110 lg:max-w-130">
      <label className="text-700-16 lg:text-700-20">{label}</label>
      <div className="flex h-[55px] lg:h-[60px] gap-2.5">
        <div
          className={clsx(
            fileName === "사진 업로드" ? "text-gray-200" : "text-white",
            error ? "border-my-red" : "border-gray-200",
            "h-full w-[230px] md:w-[310px] lg:w-[390px] outline-none text-300-14 lg:text-300-16 border  rounded-[2px] flex items-center px-5 py-[18px] justify-between"
          )}
        >
          <span>{fileName}</span>
          <FiX
            onClick={handleFileRemove}
            className="w-[14px] h-[14px] stroke-2"
          />
        </div>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="cursor-pointer border border-main text-main w-[105px] md:w-[120px] h-full px-5 md:px-6 py-[18px] rounded-[2px] text-400-14 lg:text-400-16 flex items-center justify-center"
        >
          파일 선택
        </button>
      </div>
      <ErrorText error={error} />
      {/* ↓ 숨김 */}
      <input
        type="file"
        ref={fileRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
