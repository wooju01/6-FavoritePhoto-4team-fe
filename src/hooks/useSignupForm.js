"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export function useSignupForm() {
  const { register: authRegister } = useAuth();
  const [form, setForm] = useState({
    userEmail: "",
    userNickname: "",
    userPassword: "",
    userPasswordConfirmation: "",
  });
  const [writeError, setWriteError] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // API 호출 후 에러가 발생하면 사용자에게 알림
    if (signupError) {
      alert(signupError);
      setSignupError(null); // 알림 후 에러 상태 초기화
    }
  }, [signupError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // 입력 중에는 해당 필드의 에러 메시지 초기화
    if (writeError[name]) {
      setWriteError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    setSignupError(null); // 이전 API 에러 메시지 초기화

    // 클라이언트 측 유효성 검사
    if (!form.userEmail.trim()) errors.userEmail = "이메일을 입력해주세요.";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.userEmail)) {
        errors.userEmail = "이메일 형식이 올바르지 않습니다.";
      }
    }

    if (!form.userNickname.trim())
      errors.userNickname = "닉네임을 입력해주세요.";

    if (!form.userPassword) errors.userPassword = "비밀번호를 입력해주세요.";
    else if (form.userPassword.length < 8) {
      errors.userPassword = "비밀번호는 8자 이상이어야 합니다.";
    }

    if (!form.userPasswordConfirmation) {
      errors.userPasswordConfirmation = "비밀번호 확인을 입력해주세요.";
    } else if (
      form.userPassword &&
      form.userPassword !== form.userPasswordConfirmation
    ) {
      errors.userPasswordConfirmation = "비밀번호가 일치하지 않습니다.";
    }

    setWriteError(errors);

    // 유효성 검사 실패 시 API 호출 중단
    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsPending(true);
    try {
      await authRegister(
        form.userNickname,
        form.userEmail,
        form.userPassword,
        form.userPasswordConfirmation
      );

      alert("회원가입에 성공했습니다! 로그인 페이지로 이동합니다.");
      router.push("/login"); // 성공 시 로그인 페이지로 이동
    } catch (error) {
      console.error("Signup failed in hook:", error);

      const errorMessage =
        error.message && error.message.includes("API 오류")
          ? "이미 사용 중인 이메일이거나 닉네임일 수 있습니다."
          : error.message || "회원가입에 실패했습니다. 다시 시도해주세요.";
      setSignupError(errorMessage);
    } finally {
      setIsPending(false);
    }
  };

  return {
    form,
    writeError,
    isPending,

    handleChange,
    handleSubmit,
  };
}
