import Image from "next/image";
import googleLogoImg from "@/assets/google-logo.png";

/**
 * Google 인증 버튼 컴포넌트
 * @param {Object} props
 * @param {boolean} [props.clearAccessToken] - 클릭 시 localStorage의 accessToken을 삭제할지 여부
 * @param {string} [props.buttonText] - 버튼에 표시할 텍스트
 * @param {string} [props.className] - 추가 클래스명
 */
export default function GoogleAuthButton({
  clearAccessToken = false,
  buttonText = "Google로 시작하기",
  className = "",
}) {
  const handleClick = () => {
    if (clearAccessToken && typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
    window.location.href =
      process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL ||
      "https://six-favoritephoto-4team-be.onrender.com/api/auth/google";
  };

  return (
    <button
      type="button"
      className={`w-full ${className}`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center gap-2 h-[55px] lg:h-[60px] rounded-xs bg-white">
        <Image src={googleLogoImg} alt="google" className="w-[22px] h-[22px]" />
        <span className="text-my-black">{buttonText}</span>
      </div>
    </button>
  );
}
