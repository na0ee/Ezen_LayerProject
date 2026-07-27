import { useState } from "react";
import {
  Badge,
  Bell,
  BottomNav,
  BtnBig,
  BtnGo,
  BtnHero,
  BtnSmall,
  Bubble,
  Category,
  ChatCard,
  CheckBox,
  Header,
  Heart,
  Input,
  KeywordList,
  QuickCategory,
  Search,
  TabSub,
  TitleMain,
  TitleSection,
} from "./components/common";

function App() {
  const [navTab, setNavTab] = useState("home");
  const [pageTab, setPageTab] = useState("향 계열/향기");
  const [chipTab, setChipTab] = useState("전체");
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

      <h2 className="mt-8 text-sm font-semibold text-subtext">섹션 타이틀</h2>
      <div className="mt-3 flex flex-col gap-6">
        <TitleMain
          variant="title1"
          title="Record"
          sub={
            <>
              이번주 <span className="text-point-orange">5일</span> 기록했어요
            </>
          }
        />
        <TitleMain variant="title2" title="Record" />
        <TitleMain
          variant="title3"
          title="Record"
          sub={
            <>
              이번주 <span className="text-point-orange">5일</span> 기록했어요
            </>
          }
        />
        <TitleSection title="오늘의 HOT리뷰" />
        <TitleSection variant="button" title="오늘의 HOT리뷰" />
      </div>

      <h2 className="mt-8 text-sm font-semibold text-subtext">
        하단바 (탭 클릭 가능)
      </h2>
      <div className="mt-3 rounded-2xl bg-light-grey p-4">
        <BottomNav active={navTab} onChange={setNavTab} />
      </div>

      <h2 className="mt-8 text-sm font-semibold text-subtext">검색창</h2>
      <div className="mt-3 flex flex-col gap-4">
        <Search />
        <Search variant="no-icon" />
      </div>

      <h2 className="mt-8 text-sm font-semibold text-subtext">
        카테고리 (클릭 가능)
      </h2>
      <div className="mt-3 flex flex-col gap-4">
        <Category
          variant="page"
          items={["브랜드", "향 계열/향기", "용량"]}
          active={pageTab}
          onChange={setPageTab}
          className="-mx-5"
        />
        <Category
          variant="tab"
          items={["전체", "선물", "여성", "20대", "30대", "남성"]}
          active={chipTab}
          onChange={setChipTab}
        />
      </div>

      <h2 className="mt-8 text-sm font-semibold text-subtext">탭/뱃지</h2>
      <div className="mt-3 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <TabSub variant="a" />
          <TabSub variant="b" />
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="good" />
          <Badge variant="bad" />
          <Badge variant="review" />
          <Badge variant="q&a" />
        </div>
      </div>

      <h2 className="mt-8 text-sm font-semibold text-subtext">키워드</h2>
      <div className="mt-3 flex flex-col gap-2">
        <div className="inline-flex rounded-lg bg-offblack p-3">
          <KeywordList keywords={["알데하이드", "피오니", "머스크"]} />
        </div>
        <div className="p-3">
          <KeywordList
            variant="grey"
            keywords={["알데하이드", "피오니", "머스크"]}
          />
        </div>
      </div>

      <h2 className="mt-8 text-sm font-semibold text-subtext">챗봇</h2>
      <div className="mt-3 flex flex-col gap-4 rounded-2xl bg-background p-4">
        <div className="flex flex-col gap-3">
          <Bubble>
            안녕하세요
            <br />
            저는 챗봇 레이예요.
          </Bubble>
          <div className="self-end">
            <Bubble variant="user">안녕 반가워 레이</Bubble>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <QuickCategory>오늘의 향수 추천받기</QuickCategory>
          <QuickCategory variant="selected">오늘의 향수 추천받기</QuickCategory>
          <QuickCategory variant="under">오늘의 향수 추천받기</QuickCategory>
        </div>
        <Input />
        <ChatCard
          variant="shop"
          name="시로 성수"
          brand="SHIRO"
          address="서울 성동구 연무장길 57 1~2층"
          hours="영업 중  10:00 ~ 21:00"
          phone="070-8657-2176"
          website="https://shiro-shiro.kr/"
        />
        <ChatCard
          variant="chatbot"
          brand="Maison Margiela Fragrances"
          name="Lazy Sunday Morning"
          keywords={["아이리스", "화이트머스크", "은방울꽃"]}
        />
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
