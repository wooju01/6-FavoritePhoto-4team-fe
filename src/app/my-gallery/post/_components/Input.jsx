"use client";

import React from "react";
import clsx from "clsx";
import ErrorText from "./ErrorText";

export default function Input({
  label,
  name,
  placeholder = "",
  value,
  onChange,
  error = "",
}) {
  return (
    <div className="bg-transparent flex flex-col gap-2.5 w-full">
      <label htmlFor={name} className="text-700-16 lg:text-700-20">
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={clsx(
          error ? "border-my-red" : "border-gray-200",
          "border rounded-[2px] px-5 py-[18px] w-full placeholder:text-gray-200 placeholder:text-300-14 lg:placeholder:text-300-16 focus:outline-none text-400-14 lg:text-400-16"
        )}
      />
      <ErrorText error={error} />
    </div>
  );
}
