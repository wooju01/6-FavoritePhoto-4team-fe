"use client";

import React, { useEffect, useState } from "react";
import Input from "./Input";
import clsx from "clsx";
import TextArea from "./TextArea";
import Select from "./Select";
import File from "./File";
import Button from "@/components/ui/Button";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { postCard } from "@/lib/api/api-users";
import { useStateModal } from "@/providers/StateModalProvider";
import { upLoadImage } from "@/lib/api/api-uploader";

export default function PostForm({ grades, genres, disabled }) {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [volumn, setVolumn] = useState(""); // 총 발행량
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // 제출 여부(오류 검사 때문에 만듦)
  const [dirty, setDirty] = useState({
    name: false,
    price: false,
    volumn: false,
    description: false,
  }); // 입력 여부(오류 검사 때문에 만듦22) - 관행적으로 "입력된 상태"를 "dirty"라고 함.

  const { openModal } = useStateModal(); // 모달 provider

  // 버튼 누르면 초기화
  const resetForm = () => {
    setName("");
    setGrade("");
    setGenre("");
    setPrice("");
    setVolumn("");
    setImage("");
    setDescription("");
    setDirty({
      name: false,
      price: false,
      volumn: false,
      description: false,
    });
    setIsSubmitted(false);
  };

  // BE와 연동
  const { mutate, isPending } = useMutation({
    mutationFn: postCard,
    onSuccess: (data) => {
      openModal(201, "생성", { grade, name, count: volumn });
      QueryClient.invalidateQueries(["creationCardCount"]);
      resetForm();
    },
    onError: (err) => {
      openModal(500, "생성", { grade, name, count: volumn });
      resetForm();
      console.error("등록 실패", err.message);
    },
  });

  // 입력 상태 감지하는 함수
  const handleChange = (setter, field) => (e) => {
    setter(e.target.value);
    setDirty((prev) => ({ ...prev, [field]: true }));
  };

  // 유효성 검사
  const validate = () => {
    const newError = {};

    if (!name) {
      newError.name = { none: "카드 이름을 입력해 주세요." };
    } else if (name.length > 10) {
      newError.name = { over: "10자 이내로 입력해 주세요." };
    }

    if (!grade) newError.grade = "등급을 선택해 주세요.";
    if (!genre) newError.genre = "장르를 선택해 주세요.";

    if (!price) {
      newError.price = { none: "가격을 입력해 주세요." };
    } else if (!/^\d+$/.test(price)) {
      newError.price = { type: "가격을 숫자로 입력해 주세요." };
    }

    if (!volumn) {
      newError.volumn = { none: "총 발행량을 입력해 주세요." };
    } else if (!/^\d+$/.test(volumn)) {
      newError.volumn = { type: "발행량을 숫자로 입력해 주세요." };
    } else if (volumn > 10) {
      newError.volumn = { over: "총 발행량은 10장 이하로 선택 가능합니다." };
    }

    if (!image) newError.image = "파일을 선택해 주세요.";

    if (description.length > 60) {
      newError.description = "설명은 60자 이내로 입력해 주세요.";
    }

    const isFormValid = Object.keys(newError).length === 0;
    setErrors(newError);
    setIsValid(isFormValid);

    return isFormValid;
  };

  useEffect(() => {
    validate();
  }, [name, grade, genre, price, volumn, image, description]);

  // 제출 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitted(true); // 제출했어!
    const valid = validate();
    setIsValid(valid);

    if (!valid) return;

    try {
      const imageResponse = await upLoadImage(image);
      const imageUrl = imageResponse.secure_url; // 또는 imageResponse.url

      const data = {
        name,
        grade,
        genre,
        price,
        volumn,
        image: imageUrl,
        description,
      };

      mutate(data); // JSON 객체로 전달
    } catch (error) {
      console.error("Cloudinary 업로드 실패:", error);
    }
  };

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
        value={name}
        onChange={handleChange(setName, "name")}
        error={(isSubmitted || dirty.name) && errors.name}
      />
      <Select
        type="등급"
        options={grades}
        selected={grade}
        error={isSubmitted && errors.grade}
        onChange={(e) => setGrade(e)}
      />
      <Select
        type="장르"
        options={genres}
        selected={genre}
        error={isSubmitted && errors.genre}
        onChange={(e) => setGenre(e)}
      />
      <Input
        label="가격"
        name="price"
        placeholder="가격을 입력해 주세요"
        value={price}
        onChange={handleChange(setPrice, "price")}
        error={(isSubmitted || dirty.price) && errors.price}
      />
      <Input
        label="총 발행량"
        name="volumn"
        placeholder="총 발행량을 입력해 주세요"
        value={volumn}
        onChange={handleChange(setVolumn, "volumn")}
        error={(isSubmitted || dirty.volumn) && errors.volumn}
      />
      <File
        label="사진 업로드"
        error={isSubmitted && errors.image}
        onChange={setImage}
      />
      <TextArea
        label="포토카드 설명"
        name="description"
        placeholdrer="카드 설명을 입력해 주세요"
        value={description}
        onChange={handleChange(setDescription, "description")}
        error={(isSubmitted || dirty.description) && errors.description}
      />
      <Button type="exchangeGreen" disabled={!isValid || disabled || isPending}>
        {isPending ? "생성 중..." : "생성하기"}
      </Button>
    </form>
  );
}
