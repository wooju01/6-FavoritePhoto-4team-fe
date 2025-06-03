
export const metadata = {
  title: "포토카드 상세 페이지",
  description: "포토카드에 대한 상세 정보를 확인하세요.",
  openGraph: {
    title: "포토카드 상세 페이지",
    description: "포토카드에 대한 상세 정보를 확인하세요.",
    type: "website",
    images: ["https://6-favorite-photo-4team-fe.vercel.app/contents.png"],
  },
};

export default function Layout({ children }) {
  return (
    <>
      {children}
    </>
  );
}
