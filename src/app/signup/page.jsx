// /home/jisu/6-FavoritePhoto-4team-fe/src/app/signup/page.jsx
"use client";

import InputField from "@/components/ui/InputField";
import PasswordField from "@/components/ui/PasswordField";
import Link from "next/link";
import Image from "next/image";
import mainLogoImg from "@/assets/main-logo.png";
import loadingGif from "@/assets/loading.gif";
import { useSignupForm } from "@/hooks/useSignupForm"; // 커스텀 훅 임포트

export default function SignupPage() {
  const { form, writeError, isPending, handleChange, handleSubmit } =
    useSignupForm();

  return (
    <div className="fixed left-0 top-0 px-4 md:px-0 w-full h-full overflow-y-auto bg-my-black z-[8888]">
      <div className="md:max-w-[440px] lg:max-w-[520px] md:w-full md:absolute md:left-1/2 md:top-1/2 md:-translate-1/2">
        <h2 className="flex justify-center mt-20 md:mt-0 lg:mt-0">
          <Link href={"/"} className="">
            <Image src={mainLogoImg} alt="main-logo" className="w-48 h-9" />
          </Link>
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mt-[60px] mb-8 flex flex-col gap-8 md:w-full"
        >
          <InputField
            label="이메일"
            placeholder="이메일을 입력해 주세요"
            type="email"
            name="userEmail"
            value={form.userEmail || ""}
            onChange={handleChange}
            labelClassName="text-sm font-medium"
            error={writeError.userEmail || ""}
          />
          <InputField
            label="닉네임"
            placeholder="닉네임을 입력해 주세요"
            type="text"
            name="userNickname"
            value={form.userNickname || ""}
            onChange={handleChange}
            labelClassName="text-sm font-medium"
            error={writeError.userNickname || ""}
          />
          <PasswordField
            label="비밀번호"
            placeholder="비밀번호 (8자 이상)"
            name="userPassword"
            value={form.userPassword || ""}
            onChange={handleChange}
            error={writeError.userPassword || ""}
          />
          <PasswordField
            label="비밀번호 확인"
            placeholder="비밀번호를 한번 더 입력해 주세요"
            name="userPasswordConfirmation"
            value={form.userPasswordConfirmation || ""}
            onChange={handleChange}
            error={writeError.userPasswordConfirmation || ""}
          />

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center justify-center gap-2 w-full h-[55px] lg:h-[60px] text-700-16 rounded-xs bg-main text-my-black disabled:!cursor-not-allowed disabled:bg-[#bfc802]"
            >
              {isPending ? "회원가입 요청 중..." : "가입하기"}
              {isPending && (
                <Image src={loadingGif} alt="로딩중" width={20} height={20} />
              )}
            </button>

            <button
              type="button"
              className="w-full"
              onClick={() => {
                window.location.href =
                  process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL ||
                  "https://six-favoritephoto-4team-be.onrender.com/api/auth/google";
              }}
            >
              <div className="flex items-center justify-center gap-2 h-[55px] lg:h-[60px] rounded-xs bg-white">
                <Image
                  src={require("@/assets/google-logo.png")}
                  alt="google"
                  className="w-[22px] h-[22px]"
                />
                <span className="text-my-black">Google로 시작하기</span>
              </div>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-400-14 lg:text-400-16">
            <span>이미 계정이 있으신가요?</span>
            <Link href={"/login"}>
              <span className="text-main underline">로그인하기</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
