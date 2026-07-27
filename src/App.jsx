import {
  Bell,
  BtnBig,
  BtnGo,
  BtnHero,
  BtnSmall,
  CheckBox,
  Header,
  Heart,
} from "./components/common";

function App() {
  return (
    <div className="mx-auto min-h-screen max-w-[430px] bg-offwhite p-5">
      <h1 className="text-xl font-semibold text-offblack">
        공통 컴포넌트 프리뷰
      </h1>
      <p className="mt-2 text-sm text-grey">
        컴포넌트가 추가되면 이 페이지에서 모아서 확인합니다.
      </p>

      <h2 className="mt-8 text-sm font-semibold text-subtext">컬러 토큰</h2>
      <div className="mt-3 flex flex-wrap gap-3">
        {[
          ["offwhite", "bg-offwhite border border-light-grey"],
          ["offwhite70", "bg-offwhite70 border border-light-grey"],
          ["offblack", "bg-offblack"],
          ["offblack70", "bg-offblack70"],
          ["background", "bg-background border border-light-grey"],
          ["grey", "bg-grey"],
          ["light-grey", "bg-light-grey"],
          ["2light-grey", "bg-2light-grey"],
          ["subtext", "bg-subtext"],
          ["point-orange", "bg-point-orange"],
          ["point-orange2", "bg-point-orange2"],
        ].map(([name, cls]) => (
          <div key={name} className="flex flex-col items-center gap-1">
            <div className={`h-10 w-10 rounded-lg ${cls}`} />
            <span className="text-[10px] text-grey">{name}</span>
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-sm font-semibold text-subtext">버튼</h2>
      <div className="mt-3 flex flex-col gap-4">
        <BtnBig>Next</BtnBig>
        <BtnBig disabled>Next</BtnBig>
        <div className="flex items-center justify-center rounded-lg bg-light-grey p-4">
          <BtnHero>My LAYER 진단하기</BtnHero>
        </div>
        <div className="flex gap-3">
          <BtnSmall>임시저장</BtnSmall>
          <BtnSmall variant="white">리뷰 작성하기</BtnSmall>
        </div>
        <div className="flex flex-col items-start gap-3">
          <div className="rounded-lg bg-grey p-3">
            <BtnGo variant="raffle" />
          </div>
          <BtnGo variant="more" />
          <BtnGo variant="ai" />
          <BtnGo variant="go" />
          <BtnGo variant="more2" />
          <BtnGo variant="record" />
        </div>
      </div>

      <h2 className="mt-8 text-sm font-semibold text-subtext">아이콘</h2>
      <div className="mt-3 flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <Heart />
          <Heart variant="grey3" />
          <Heart variant="grey2" />
          <Heart variant="grey1" />
        </div>
        <div className="flex items-center gap-4">
          <CheckBox />
          <CheckBox variant="white" />
        </div>
        <div className="flex items-center gap-4">
          <Bell />
          <Bell variant="none" />
        </div>
      </div>

      <h2 className="mt-8 text-sm font-semibold text-subtext">헤더</h2>
      <div className="-mx-5 mt-3 flex flex-col gap-2">
        <div className="bg-grey">
          <Header variant="main" />
        </div>
        <Header variant="main2" />
        <Header variant="detail" title="마이페이지" />
        <Header variant="detail-back" title="마이페이지" />
        <Header variant="write" />
        <Header variant="write-tit" title="향수 기록하기" />
        <Header variant="community" title="커뮤니티" />
      </div>

      <h2 className="mt-8 text-sm font-semibold text-subtext">폰트 스타일</h2>
      <div className="mt-3 flex flex-col gap-2">
        {[
          ["title/semibold-30px", "text-title-semibold-30"],
          ["title/semibold-24px", "text-title-semibold-24"],
          ["title/medium-20px", "text-title-medium-20"],
          ["title/semibold-18px", "text-title-semibold-18"],
          ["subTitle/regular-16px", "text-subtitle-regular-16"],
          ["body/semibold-16px", "text-body-semibold-16"],
          ["body/medium-16px", "text-body-medium-16"],
          ["body/regular-18px", "text-body-regular-18"],
          ["body/medium-14px", "text-body-medium-14"],
          ["body/medium-14px-line", "text-body-medium-14-line"],
          ["body/regular-14px", "text-body-regular-14"],
          ["caption/medium-12px", "text-caption-medium-12"],
          ["caption/regular-12px", "text-caption-regular-12"],
          ["caption/semibold-10px", "text-caption-semibold-10"],
          ["chatbot-18", "text-chatbot-18"],
          ["btn/cta", "text-btn-cta"],
          ["btn/icon", "text-btn-icon"],
          ["en/title_28px", "font-en text-en-title-28"],
          ["en/title-24px", "font-en text-en-title-24"],
          ["en/semibold-24px", "font-en text-en-semibold-24"],
          ["en/semibold-16px", "font-en text-en-semibold-16"],
        ].map(([name, cls]) => (
          <div key={name} className="flex items-baseline gap-3">
            <span className="w-40 shrink-0 text-[10px] text-grey">{name}</span>
            <p className={cls}>
              {name.startsWith("en/")
                ? "Perfume Layer"
                : "향수 레이어 프로젝트"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
