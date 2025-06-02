"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCard } from "@/lib/api/api-users";
import { useStateModal } from "@/providers/StateModalProvider";
import { upLoadImage } from "@/lib/api/api-uploader";

export default function usePostForm() {
  // ✅ 상태 목록
  const [form, setForm] = useState({
    name: "",
    grade: "",
    genre: "",
    price: "",
    volumn: "",
    image: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // 제출 여부(오류 검사 때문에 만듦)

  const [dirty, setDirty] = useState({
    name: false,
    grade: false,
    genre: false,
    price: false,
    volumn: false,
    description: false,
  }); // 입력 여부(오류 검사 때문에 만듦22) - 관행적으로 "입력된 상태"를 "dirty"라고 함.

  const { openModal } = useStateModal(); // 모달 provider
  const queryClient = useQueryClient();

  // ✅ 버튼 누르면 초기화
  const resetForm = () => {
    setForm({
      name: "",
      grade: "",
      genre: "",
      price: "",
      volumn: "",
      image: "",
      description: "",
    });
    setDirty({
      name: false,
      grade: false,
      genre: false,
      price: false,
      volumn: false,
      description: false,
    });
    setIsSubmitted(false);
  };

  // ✅ 입력 상태 감지하는 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setDirty((prev) => ({ ...prev, [name]: true }));
  };

  // ✅ 선택 상자 따로 감지해야 함
  const handleSelectChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setDirty((prev) => ({ ...prev, [key]: true }));
  };

  // ✅ 이미지도 따로 감지해야 함
  const handleFileChange = (file) => {
    setForm((prev) => ({ ...prev, image: file }));
  };

  // ✅ 유효성 검사
  const validate = () => {
    const newError = {};

    if (!form.name) {
      newError.name = { none: "카드 이름을 입력해 주세요." };
    } else if (form.name.length > 10) {
      newError.name = { over: "10자 이내로 입력해 주세요." };
    }

    if (!form.grade) newError.grade = "등급을 선택해 주세요.";
    if (!form.genre) newError.genre = "장르를 선택해 주세요.";

    if (!form.price) {
      newError.price = { none: "가격을 입력해 주세요." };
    } else if (!/^\d+$/.test(form.price)) {
      newError.price = { type: "가격을 숫자로 입력해 주세요." };
    }

    if (!form.volumn) {
      newError.volumn = { none: "총 발행량을 입력해 주세요." };
    } else if (!/^\d+$/.test(form.volumn)) {
      newError.volumn = { type: "발행량을 숫자로 입력해 주세요." };
    } else if (form.volumn > 10) {
      newError.volumn = { over: "총 발행량은 10장 이하로 선택 가능합니다." };
    }

    if (!form.image) newError.image = "파일을 선택해 주세요.";

    if (form.description.length > 60) {
      newError.description = "설명은 60자 이내로 입력해 주세요.";
    }

    const isFormValid = Object.keys(newError).length === 0;
    setErrors(newError);
    setIsValid(isFormValid);

    return isFormValid;
  };

  // ✅ 유효성 검사는 자동으로
  useEffect(() => {
    validate();
  }, [form]);

  // ☑️ api 호출 : 모달도 같이
  const { mutate, isPending } = useMutation({
    mutationFn: postCard,
    onSuccess: () => {
      openModal(201, "생성", {
        grade: form.grade,
        name: form.name,
        count: form.volumn,
      });
      queryClient.invalidateQueries({ queryKey: ["creationCardCount"] });
      resetForm();
    },
    onError: (err) => {
      openModal(500, "생성", {
        grade: form.grade,
        name: form.name,
        count: form.volumn,
      });
      resetForm();
      console.error("등록 실패", err.message);
    },
  });

  // ✅ 제출 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true); // 제출했어!

    const valid = validate();
    setIsValid(valid);
    if (!valid) return;

    // 여기 성훈 님이 추가했음! (upLoadImage 나중에 공부하겠음)
    try {
      const imageResponse = await upLoadImage(form.image);
      const imageUrl = imageResponse.secure_url; // 또는 imageResponse.url

      const data = { ...form, image: imageUrl };

      mutate(data); // JSON 객체로 전달
    } catch (error) {
      console.error("Cloudinary 업로드 실패:", error);
    }
  };

  return {
    form,
    errors,
    dirty,
    isValid,
    isSubmitted,
    isPending,
    handleChange,
    handleFileChange,
    handleSelectChange,
    handleSubmit,
  };
}
