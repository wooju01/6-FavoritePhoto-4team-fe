"use client";

import React from "react";
import Input from "./Input";
import clsx from "clsx";
import TextArea from "./TextArea";
import Select from "./Select";
import File from "./File";
import Button from "@/components/ui/Button";
import usePostForm from "@/hooks/usePostForm";

export default function PostForm({ grades, genres, disabled }) {
  const {
    form,
    errors,
    dirty,
    isValid,
    isSubmitted,
    isPostPending,
    handleChange,
    handleFileChange,
    handleSelectChange,
    handleSubmit,
  } = usePostForm();

  return (
    <form
      action="/api/my-gallery/post"
      method="POST"
      encType="multipart/form-data"
      onSubmit={handleSubmit} // Enter로 제출!
      className={clsx(
        "gap-10",
        "flex flex-col justify-center items-center w-full max-w-[345px] md:max-w-110 lg:max-w-130 mx-auto mb-[100px]"
      )}
    >
      <Input
        label="포토카드 이름"
        name="name"
        placeholder="포토카드 이름을 입력해 주세요"
        value={form.name}
        onChange={handleChange}
        error={(isSubmitted || dirty.name) && errors.name}
      />
      <Select
        type="등급"
        options={grades}
        selected={form.grade}
        error={isSubmitted && errors.grade}
        onChange={(value) => handleSelectChange("grade", value)}
      />
      <Select
        type="장르"
        options={genres}
        selected={form.genre}
        error={isSubmitted && errors.genre}
        onChange={(value) => handleSelectChange("genre", value)}
      />
      <Input
        label="가격"
        name="price"
        placeholder="가격을 입력해 주세요"
        value={form.price}
        onChange={handleChange}
        error={(isSubmitted || dirty.price) && errors.price}
      />
      <Input
        label="총 발행량"
        name="volumn"
        placeholder="총 발행량을 입력해 주세요"
        value={form.volumn}
        onChange={handleChange}
        error={(isSubmitted || dirty.volumn) && errors.volumn}
      />
      <File
        label="사진 업로드"
        error={isSubmitted && errors.image}
        onChange={handleFileChange}
      />
      <TextArea
        label="포토카드 설명"
        name="description"
        placeholder="카드 설명을 입력해 주세요"
        value={form.description}
        onChange={handleChange}
        error={(isSubmitted || dirty.description) && errors.description}
      />
      <Button
        type="exchangeGreen"
        disabled={!isValid || disabled || isPostPending}
      >
        {isPostPending ? "생성 중..." : "생성하기"}
      </Button>
    </form>
  );
}
