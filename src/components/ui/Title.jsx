/*
  [설명서] Title 컴포넌트

  - 제목과 선택적으로 버튼이 함께 있는 UI 컴포넌트
  - 페이지 타이틀, 섹션 헤더, 모달 헤더 등 다양한 위치에 사용할 수 있도록 
    폰트와 버튼 색상을 variant로 지정할 수 있습니다.
  
  [Props]
  - title (string): 표시할 제목 텍스트 (필수)
  - buttonText (string): 버튼에 표시할 텍스트 (선택)
  - onButtonClick (function): 버튼 클릭 시 실행할 함수 (선택)
  - font (string): 제목 스타일 설정. 기본값은 "titleLg_Bk"
      - "titleLg_Bk"    : Bk 폰트, 큰 타이틀 (title-48, md:title-62)
      - "titleLg_Noto"  : NotoSans, 큰 타이틀 (text-700-24 ~ 40)
      - "titleMd_Bk"    : Bk 폰트, 중간 타이틀 (title-40 ~ 46)
      - "titleMd_Noto"  : NotoSans, 중간 타이틀 (text-700-20 ~ 28)

  - buttonColor (string): 버튼 배경 색상 (기본값: "yellow")
      - "yellow" : 노란색 배경 (`bg-main`), 검정 텍스트
      - "black"  : 검정 배경 (`bg-black`), 흰 텍스트, 테두리 있음
    - 추후에 버튼 컴포넌트가 들어오면 수정 할 수 있습니다.

  [예시 사용법]
    <Title 
      title="마이페이지" 
      buttonText="수정하기" 
      onButtonClick={() => console.log("수정")} 
      font="titleLg_Noto" 
      buttonColor="yellow" 
    />
*/

export const Title = ({
  title,
  buttonText,
  onButtonClick,
  font = "titleLg_Bk",
  buttonColor = "yellow",
}) => {
  const fontClass = {
    titleLg_Bk: "title-40 md:title-48 text-white lg:title-62",
    titleLg_Noto: "text-700-24 md:text-700-32 lg:text-700-40 text-white",
    titleMd_Bk: "title-40 md:title-46 text-white",
    titleMd_Noto: "text-700-20 md:text-700-22 lg:text-700-28 text-white",
  }[font];

  const buttonClass = {
    yellow: "bg-main text-black",
    black: "bg-black text-white border",
  }[buttonColor];

  return (
    <div className="relative md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 py-2.5 md:py-4 after:contrast-[''] after:absolute after:bottom-0 after:w-full after:h-0.5 after:bg-white  ">
      <h1 className={`${fontClass} lg:col-span-2`}>{title}</h1>
      {buttonText && (
        <button
          onClick={onButtonClick}
          className={`${buttonClass} h-16 text-700-16 rounded-xs`}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

