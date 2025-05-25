"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/api/api-auth";
import { useAuth } from "@/providers/AuthProvider";

export function useLoginForm() {
  const { getUser } = useAuth();
  const [form, setForm] = useState({
    userEmail: "",
    userPassword: "",
  });
  const [writeError, setWriteError] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (loginError) {
      alert(loginError);
      setLoginError(null);
    }
  }, [loginError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (writeError[name]) {
      setWriteError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    setLoginError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.userEmail || form.userEmail.trim().length === 0) {
      errors.userEmail = "가입된 이메일을 입력해 주세요";
    } else if (!emailRegex.test(form.userEmail)) {
      errors.userEmail = "이메일 형식이 아닙니다";
    }

    if (!form.userPassword || form.userPassword.trim().length === 0) {
      errors.userPassword = "가입된 이메일의 비밀번호를 입력해 주세요";
    } else if (form.userPassword.length < 8) {
      errors.userPassword = "비밀번호는 8자리 이상이어야 합니다";
    }

    setWriteError(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsPending(true);
    try {
      await authService.signIn(form.userEmail, form.userPassword);
      await getUser(); // 로그인 후 사용자 정보 갱신
      router.push("/home"); // 성공 시 이동
     
    } catch (error) {
      console.error("Login failed in hook:", error);
      setLoginError(error.message || "이메일 또는 비밀번호가 잘못되었습니다.");
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
