import { useState } from "react";
import Home from "./pages/Home";
import Raffle from "./pages/raffle";
import {
  Badge,
  Bell,
  BottomNav,
  BtnBig,
  BtnGo,
  BtnHero,
  BtnSmall,
  Bubble,
  CardChallenge,
  CardChallengeSmall,
  CardInfo,
  CardMag,
  CardMainReview,
  CardRank,
  CardSmall,
  Category,
  CategoryChip,
  ChatCard,
  CheckBox,
  CommunityComment,
  CommunityEnter,
  CommunityToggle,
  Con2,
  ConQuestion,
  ConQuestion1,
  HashTag,
  Header,
  Heart,
  Icon,
  Img,
  Input,
  KeywordList,
  MagListCard,
  MagazineCard,
  MainBanner,
  MainBannerText,
  MiddleCard,
  Profile,
  QuickCategory,
  Review,
  ReviewAiSummary,
  ReviewSummary,
  ReviewSummary1,
  ReviewSummary2,
  Search,
  TabSub,
  TagMag,
  TitleMag,
  TitleMain,
  TitleSection,
} from "./components/common";

function ComponentsPreview() {
  const [navTab, setNavTab] = useState("home");
  const [enterTitle, setEnterTitle] = useState("");
  const [enterTxt, setEnterTxt] = useState("");
  const [profileOpen, setProfileOpen] = useState(true);
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
        <div className="flex flex-wrap gap-2">
          <CategoryChip>시트러스</CategoryChip>
          <CategoryChip>플로럴</CategoryChip>
        </div>
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

      <h2 className="mt-8 text-sm font-semibold text-subtext">커뮤니티</h2>
      <div className="mt-3 flex flex-col gap-6">
        <div className="flex items-center gap-6">
          <Profile name="예은티비" time="5분 전" />
          <Profile variant="none" time="5분 전" />
        </div>
        <div className="flex items-center gap-4">
          <Icon likes={42} comments={8} />
          <HashTag>메종 마르지엘라</HashTag>
        </div>
        <CommunityEnter
          variant="title"
          value={enterTitle}
          onChange={(e) => setEnterTitle(e.target.value)}
          placeholder="햇살 좋은 날의 베이지 룩과 향수 조합 ☁"
        />
        <CommunityEnter variant="brand" />
        <CommunityEnter variant="ml" />
        <CommunityEnter
          variant="txt"
          value={enterTxt}
          onChange={(e) => setEnterTxt(e.target.value)}
        />
        <CommunityToggle
          label={profileOpen ? "프로필 공개" : "프로필 비공개"}
          checked={profileOpen}
          onChange={setProfileOpen}
        />
        <ConQuestion
          profileName="예은티비"
          profileTime="5분 전"
          title="향수 추천해주세요"
          text="사과향이나 오렌지같은 약간 청순하면서 발랄한? 그런 과일향이 필요해요!! 아시는 분 추천해주세요 ㅜㅜ 최소 3만원 이하로 해주시면 감사하겠습니다! 청순발랄한 향이라면 과일이 아니어도 상관 없어요!"
          likes={42}
          comments={8}
        />
        <ConQuestion1
          profileTime="5분 전"
          sub="익명의 향덕님이 하나 골라달래요"
          title="여름용 데일리 향수, 어떤 게 더 좋을까요?"
          options={[
            {
              label: "조말론 우드 세이지 앤 씨솔트",
              percent: 60,
              selected: true,
            },
            { label: "딥디크 오 데 썽", percent: 40 },
          ]}
        />
        <Con2
          profileName="최해수"
          profileTime="30분 전"
          title="이불 냄새를 향수로 만든다면"
          text="레이지 선데이 모닝은 자기 전에 뿌리는 향수예요. 갓 세탁한 이불에 파묻히는 느낌. 수면향 찾으시는 분들께 강추."
          keywords={["머스크", "잠들기전", "포근함", "지속력좋아요"]}
          likes={42}
          comments={8}
        />
        <CommunityComment
          items={[
            { name: "리뷰", desc: "사용하는 향수의 후기를 남겨주세요" },
            { name: "자유 게시글", desc: "궁금한 걸 자유롭게 물어보세요" },
            {
              name: "하나 골라줘!",
              desc: "궁금한 걸 투표 형식으로 물어보세요",
            },
            { name: "향 추천받기", desc: "유저들에게 향수 추천을 받아보세요" },
          ]}
          className="-mx-5 w-auto"
        />
      </div>

      <h2 className="mt-8 text-sm font-semibold text-subtext">매거진</h2>
      <div className="mt-3 flex flex-col gap-4">
        <div className="flex flex-col gap-4 rounded-2xl bg-grey p-4">
          <TagMag>향수 트렌드</TagMag>
          <TitleMag tag="브랜드 스토리" title="DIPTYQUE" />
          <TitleMag
            variant="subtext"
            tag="향수 상식"
            title="계절별 향수 선택 가이드"
            sub="Spring | 봄"
          />
        </div>
        <div className="flex flex-col gap-4">
          <MiddleCard
            title="향수 지속력을 높이는 꿀팁"
            desc={"오래 기억되는\n향을 위한 작은 습관"}
          />
          <MagListCard
            label="Scent Match"
            title="New Fragrance Collection 2026"
            desc="올해 가장 주목해야 할 새로운 향수들"
          />
          <MagazineCard
            tag="Dior"
            title="Paradise"
            desc="프랑스 리비에라의 휴양지의 분위기를 담았습니다. 만다린의 상큼함과 아몬드, 통카빈의 부드러운 달콤함이 어우러져 여름 휴가를 떠올리게 하는 향으로 주목받고 있습니다."
          />
        </div>
      </div>

      <h2 className="mt-8 text-sm font-semibold text-subtext">카드</h2>
      <div className="-mx-5 mt-3 flex flex-col gap-4 px-5">
        <CardInfo
          variant="perfume"
          type="a"
          brand="MAISON MARGIELA FRAGRANCES"
          name="체이싱 선셋 EDT 30ML"
          keywords={["알데하이드", "피오니", "머스크"]}
        />
        <CardInfo
          variant="perfume"
          type="b"
          brand="MAISON MARGIELA FRAGRANCES"
          name="체이싱 선셋 EDT 30ML"
          keywords={["알데하이드", "피오니", "머스크"]}
        />
        <CardInfo
          variant="perfume"
          type="c"
          brand="MAISON MARGIELA FRAGRANCES"
          name="체이싱 선셋 EDT 30ML"
          keywords={["알데하이드", "피오니", "머스크"]}
        />
        <CardInfo
          variant="perfume"
          type="d"
          brand="Santa Maria Novella"
          name="엔젤 디 피렌체 오드코롱 100ml"
          lastUsed="2일 전 사용"
          memo="비싼값하는듯 굿"
        />
        <CardInfo
          variant="raffle"
          type="a"
          brand="MAISON MARGIELA FRAGRANCES"
          name="체이싱 선셋 EDT 30ML"
          keywords={["알데하이드", "피오니", "머스크"]}
          day="오늘"
          time="20:00"
        />
        <CardInfo
          variant="raffle"
          type="b"
          brand="MAISON MARGIELA FRAGRANCES"
          name="체이싱 선셋 EDT 30ML"
          keywords={["알데하이드", "피오니", "머스크"]}
        />

        <div className="inline-flex w-fit rounded-lg bg-grey p-3">
          <CardSmall
            variant="small"
            brand="Jo Malone London"
            name="블랙베리 앤 베이 코롱"
          />
        </div>
        <CardSmall
          variant="medium-a"
          name="딥디크 오 로즈 오 드 퍼퓸"
          sub="50ml · 231,000원"
        />
        <CardSmall
          variant="medium-b"
          brand="Jo Malone London"
          name="블랙베리 앤 베이"
        />
        <CardSmall
          variant="medium-b"
          showHeart
          brand="Jo Malone London"
          name="블랙베리 앤 베이"
        />
        <CardSmall
          variant="medium-recommend"
          name="Juhoon"
          perfume="Jass Club"
          comment="잘생기셔서 이 향이 참 잘 어울리는 거 같아요"
        />

        <CardChallengeSmall
          title="커뮤니티 이용하기"
          desc="질문·답변·리뷰 남기고 최대 75p까지"
        />
        <CardChallenge
          title="커뮤니티 이용하기"
          desc="질문·답변·리뷰 남기고 최대 75p까지"
        />
        <CardMag
          title="향수 지속력 높이는 꿀팁"
          desc={
            "같은 향도 오래 남기는 사용법\n매거진 내용 두줄정도 요약해서 나오면 좋을듯"
          }
        />
      </div>

      <h2 className="mt-8 text-sm font-semibold text-subtext">이미지 박스</h2>
      <div className="mt-3 flex flex-wrap items-end gap-4">
        <Img size="xsmall" />
        <Img size="small" />
        <Img size="small" color="white" />
        <Img size="medium" />
        <Img size="medium" color="white" />
        <Img size="big" />
      </div>

      <h2 className="mt-8 text-sm font-semibold text-subtext">배너 · 랭킹</h2>
      <div className="mt-3 flex flex-col gap-4">
        <MainBanner />
        <MainBannerText
          label="Scent of the week"
          title={"향은 기억이 되고\n기록은 취향이 된다"}
        />
        <CardRank rank="1위" name="블랙베리 앤 베이" brand="JO MALONE LONDON" />
        <CardMainReview
          brand="JO MALONE LONDON"
          name="블랙베리 앤 베이 30ml"
          keywords={["알데하이드", "피오니", "머스크"]}
        />
      </div>

      <h2 className="mt-8 text-sm font-semibold text-subtext">리뷰</h2>
      <div className="mt-3 flex flex-col gap-4">
        <Review
          brand="LOEWE PERFUMES"
          name="로에베 아이레 수틸레사 오 드 뚜왈렛 50ml"
        />
        <ReviewAiSummary summary="세탁한 이불 냄새'라는 평이 가장 많으며, 부담 없이 매일 뿌리기 좋은 클린 머스크로 호평받는다. 지속력은 보통이라는 의견이 다수" />
        <ReviewSummary
          profileName="예은티비"
          profileTime="5분 전"
          text={
            "흔히 생각하는 방향제 같은 라벤더가 아니라 차가운 느낌의 라벤더 향수인듯\n텁텁함 없이 투명한 향이라 계절 상관없이 미니멀하게 뿌리기 좋음"
          }
          likes={42}
          comments={8}
        />
        <ReviewSummary1
          perfumeImgs={[null, null, null]}
          title="햇살 좋은 날의 베이지 룩"
          text={
            "따뜻한 햇살엔 부드럽고 깨끗한 향이 잘 어울리는 것 같아요.\n블랑쉬로 포근하게 시작해서 오 로즈로 기분 전환해주고\n마지막엔 잉글리수 페어로 잔향을 남겨줘요.\n하루 종일 기분이 좋아지는 조합이에요."
          }
          keywords={["데일리향수", "베이지룩", "플로럴머스크"]}
          likes={42}
          comments={8}
          date="2026.xx.xx"
        />
        <ReviewSummary2
          title="햇살 좋은 날의 베이지 룩"
          text="따뜻한 햇살엔 부드럽고 깨끗한 향이 잘 어울리는 것 같아요. 블랑쉬로 포근하게 시작해서 오 로즈로 기분 전환해주고"
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

export default function App() {
  const [page, setPage] = useState("home");

  if (window.location.pathname === "/components") {
    return <ComponentsPreview />;
  }

  if (page === "raffle") {
    return <Raffle onBack={() => setPage("home")} />;
  }

  return <Home onRaffle={() => setPage("raffle")} />;
}
