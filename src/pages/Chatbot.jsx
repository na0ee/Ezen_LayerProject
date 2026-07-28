import { useEffect, useRef, useState } from "react";
import { Bubble, ChatCard, Input, QuickCategory } from "../components/common";
import caretLeft from "../assets/icons/caret-left.svg";
import characterLay from "../assets/images/character-lay.png";
import shiroStore from "../assets/images/chatbot/shiro-seongsu-store.png";
import shiroMap from "../assets/images/chatbot/shiro-seongsu-map.png";
import lazySunday from "../assets/images/perfume/lazy-sunday-hero.png";
import chasingSunset from "../assets/images/search/replica-chasing-sunset.png";
import matierePremiere from "../assets/images/perfume/related-matiere-premiere.png";
import santaMaria from "../assets/images/perfume/related-santa-maria-novella.png";
import loewe from "../assets/images/perfume/related-loewe.png";

// 피그마: 챗봇_메인 (2842:50772) + 챗봇_화면예시 (2842:50697)
const MAIN_MENUS = [
  "오늘의 향수 추천받기",
  "1:1 문의",
  "가까운 매장 찾기",
  "향수 레이어링 추천",
  "딱 맞는 향수 선물 고르기",
];

// 챗봇이 추천하는 향수 (여러 흐름에서 같이 쓴다)
const PERFUMES = {
  matiere: {
    img: matierePremiere,
    brand: "MATIERE PREMIERE",
    name: "메탈 라벤더 오 드 퍼퓸 50ML",
    keywords: ["라벤더", "우디"],
  },
  lazySunday: {
    img: lazySunday,
    brand: "MAISON MARGIELA",
    name: "레이지 선데이 모닝 EDT 30ML",
    keywords: ["머스크", "플로럴"],
  },
  loewe: {
    img: loewe,
    brand: "LOEWE PERFUMES",
    name: "아이레 수틸레사 오 드 뚜왈렛 50ML",
    keywords: ["시트러스", "그린"],
  },
  chasingSunset: {
    img: chasingSunset,
    brand: "MAISON MARGIELA",
    name: "체이싱 선셋 EDT 30ML",
    keywords: ["알데하이드", "피오니"],
  },
  santaMaria: {
    img: santaMaria,
    brand: "Santa Maria Novella",
    name: "엔젤 디 피렌체 오드코롱 100ml",
    keywords: ["오리엔탈", "스파이시"],
  },
};

// 코디 등록하기 → 분위기 선택 → 그 분위기에 맞는 향수 추천
const MOOD_PERFUMES = [
  { mood: "차분하게", perfume: PERFUMES.matiere },
  { mood: "포근하게", perfume: PERFUMES.lazySunday },
  { mood: "산뜻하게", perfume: PERFUMES.loewe },
  { mood: "시크하게", perfume: PERFUMES.chasingSunset },
  { mood: "매력적으로", perfume: PERFUMES.santaMaria },
];

// 브랜드별 매장 정보 (2026-07 기준 조사).
// [확인됨] = 브랜드 공식 매장 안내나 공공 관광 정보에서 확인한 값
// [백화점] = 단독 매장이 없어 백화점 입점 매장으로 넣은 값.
//            백화점 주소는 확인된 값이지만 어느 지점에 입점했는지는 확정하지 못했으므로
//            발표 전 네이버 지도 등으로 확인할 것. 전화번호는 확인된 곳만 넣었다
//            (없으면 ChatCard가 그 줄을 자동으로 뺀다).
const DEPT_HOURS = "영업 중  10:30 ~ 20:00";

const STORES = [
  {
    keywords: ["시로", "shiro"],
    name: "시로 성수",
    brand: "SHIRO",
    images: [shiroStore, shiroMap],
    address: "서울 성동구 연무장길 57 1~2층",
    hours: "영업 중  10:00 ~ 21:00",
    phone: "070-8657-2176",
    website: "https://shiro-shiro.kr/",
  },
  // [확인됨] 르 라보 공식 매장 안내
  {
    keywords: ["르 라보", "르라보", "le labo"],
    name: "르 라보 이태원",
    brand: "LE LABO",
    address: "서울 용산구 이태원로 259-1",
    hours: "영업 중  11:00 ~ 21:00",
    phone: "02-796-8550",
    website: "https://www.lelabofragrances.co.kr/",
  },
  // [확인됨] 이솝 공식 매장 페이지
  {
    keywords: ["이솝", "aesop"],
    name: "이솝 가로수길",
    brand: "AESOP",
    address: "서울 강남구 가로수길 54",
    hours: "영업 중  11:00 ~ 21:00",
    phone: "02-512-1987",
    website: "https://kr.aesop.com/",
  },
  // [확인됨] 강남구 공식 관광 안내 (전세계 최대 규모 플래그십)
  {
    keywords: ["딥티크", "diptyque"],
    name: "딥티크 가로수길",
    brand: "DIPTYQUE",
    address: "서울 강남구 가로수길 15",
    hours: "영업 중  11:00 ~ 21:00",
    phone: "0507-1391-7494",
    website: "https://www.diptyqueparis.com/",
  },
  // [확인됨] 코리아 시그니처 스토어 (스타필드 코엑스몰 B1)
  {
    keywords: ["산타 마리아 노벨라", "산타마리아노벨라", "노벨라", "santa maria"],
    name: "산타 마리아 노벨라 코엑스",
    brand: "SANTA MARIA NOVELLA",
    address: "서울 강남구 영동대로 513 스타필드 코엑스몰 B1",
    hours: "영업 중  10:30 ~ 22:00",
    website: "https://www.smnovella.com/",
  },
  // [확인됨] 아시아 첫 플래그십, 도산공원 초입 — 정확한 번지는 미확인
  {
    keywords: ["바이레도", "byredo"],
    name: "바이레도 도산공원",
    brand: "BYREDO",
    address: "서울 강남구 신사동 도산공원 인근",
    hours: "영업 중  11:00 ~ 20:00",
    website: "https://www.byredo.com/",
  },
  // [백화점] 신세계백화점 강남점 2층 입점 (LF 보도자료)
  {
    keywords: ["불리", "buly"],
    name: "불리 1803 신세계 강남",
    brand: "BULY 1803",
    address: "서울 서초구 신반포로 176 신세계백화점 강남점 2층",
    hours: DEPT_HOURS,
    website: "http://www.bulykorea.com/",
  },
  // [백화점] 아래 4개는 입점 지점 미확인 — 백화점 주소만 확인된 값
  {
    keywords: ["조 말론", "조말론", "jo malone"],
    name: "조 말론 런던 신세계 강남",
    brand: "JO MALONE LONDON",
    address: "서울 서초구 신반포로 176 신세계백화점 강남점 1층",
    hours: DEPT_HOURS,
    website: "https://www.jomalone.co.kr/",
  },
  {
    keywords: ["메종 마르지엘라", "메종마르지엘라", "마르지엘라", "margiela"],
    name: "메종 마르지엘라 롯데본점",
    brand: "MAISON MARGIELA",
    address: "서울 중구 남대문로 81 롯데백화점 본점 1층",
    hours: DEPT_HOURS,
    website: "https://www.maisonmargiela.com/",
  },
  {
    keywords: ["불가리", "bvlgari"],
    name: "불가리 갤러리아",
    brand: "BVLGARI",
    address: "서울 강남구 압구정로 343 갤러리아 명품관 EAST",
    hours: DEPT_HOURS,
    website: "https://www.bulgari.com/",
  },
  {
    keywords: ["샤넬", "chanel"],
    name: "샤넬 뷰티 현대 무역센터",
    brand: "CHANEL",
    address: "서울 강남구 테헤란로 517 현대백화점 무역센터점",
    hours: DEPT_HOURS,
    website: "https://www.chanel.com/",
  },
];

// 날씨 기반 추천 → 날씨 선택 → 그 날씨에 맞는 향수 추천
const WEATHER_PERFUMES = [
  {
    weather: "맑음",
    phrase: "맑은 날",
    aliases: ["맑음", "맑은", "맑아"],
    perfume: PERFUMES.chasingSunset,
  },
  {
    weather: "흐림",
    phrase: "흐린 날",
    aliases: ["흐림", "흐린", "흐려"],
    perfume: PERFUMES.matiere,
  },
  {
    weather: "더움",
    phrase: "더운 날",
    aliases: ["더움", "더운", "더워"],
    perfume: PERFUMES.loewe,
  },
  {
    weather: "추움",
    phrase: "추운 날",
    aliases: ["추움", "추운", "추워"],
    perfume: PERFUMES.santaMaria,
  },
  {
    weather: "비옴",
    phrase: "비 오는 날",
    aliases: ["비옴", "비 와", "비와", "비가"],
    perfume: PERFUMES.lazySunday,
  },
];

// 고르는 목적 입력하기 → 목적 선택 → 그 목적에 맞는 향수 추천
const PURPOSE_PERFUMES = [
  {
    purpose: "데일리로 쓸 향수",
    reply: "매일 편하게 쓰기 좋은 향수로 골라봤어요.",
    perfume: PERFUMES.lazySunday,
  },
  {
    purpose: "출근할 때",
    reply: "출근길에 어울리는 향수로 골라봤어요.",
    perfume: PERFUMES.matiere,
  },
  {
    purpose: "특별한 날",
    reply: "특별한 날에 어울리는 향수로 골라봤어요.",
    perfume: PERFUMES.santaMaria,
  },
  {
    purpose: "선물할 거예요",
    reply: "선물하기 좋은 향수로 골라봤어요.",
    perfume: PERFUMES.chasingSunset,
  },
  {
    purpose: "운동할 때",
    reply: "운동할 때 어울리는 향수로 골라봤어요.",
    perfume: PERFUMES.loewe,
  },
];

// 향수 레이어링 추천 → 가진 향수의 계열 선택 → 겹쳐 뿌리기 좋은 향수 추천
const LAYERING = [
  { base: "머스크 계열", partner: "시트러스", perfume: PERFUMES.loewe },
  { base: "시트러스 계열", partner: "머스크", perfume: PERFUMES.lazySunday },
  { base: "우디 계열", partner: "플로럴", perfume: PERFUMES.chasingSunset },
  { base: "플로럴 계열", partner: "우디", perfume: PERFUMES.matiere },
  { base: "오리엔탈 계열", partner: "머스크", perfume: PERFUMES.lazySunday },
];

// 딱 맞는 향수 선물 고르기 → 받는 사람 선택 → 그에 맞는 향수 추천
const GIFT_PERFUMES = [
  {
    target: "연인에게",
    reply: "연인에게 선물하기 좋은 향수로 골라봤어요.",
    perfume: PERFUMES.chasingSunset,
  },
  {
    target: "친구에게",
    reply: "친구에게 부담 없이 건네기 좋은 향수예요.",
    perfume: PERFUMES.loewe,
  },
  {
    target: "부모님께",
    reply: "부모님께 드리기 좋은 차분한 향수예요.",
    perfume: PERFUMES.matiere,
  },
  {
    target: "직장 동료에게",
    reply: "직장 동료에게 무난하게 잘 맞는 향수예요.",
    perfume: PERFUMES.lazySunday,
  },
  {
    target: "나에게 선물",
    reply: "나를 위한 선물로 이 향수는 어떠세요?",
    perfume: PERFUMES.santaMaria,
  },
];

// 더 정확한 추천을 위한 문답 진행하기 — 3문항을 주고받고 답변을 모아 계열을 정한다
const QUIZ = [
  {
    question: "몇 가지만 여쭤볼게요.\n어떤 느낌의 향을 좋아하세요?",
    options: [
      { label: "시원하고 산뜻한", family: "citrus" },
      { label: "포근하고 부드러운", family: "musk" },
      { label: "차분하고 묵직한", family: "woody" },
      { label: "화려하고 매혹적인", family: "oriental" },
    ],
  },
  {
    question: "향은 얼마나 진했으면 하세요?",
    options: [
      { label: "은은하게", family: "musk" },
      { label: "적당하게", family: "citrus" },
      { label: "진하게", family: "oriental" },
    ],
  },
  {
    question: "마지막이에요.\n주로 언제 쓰실 건가요?",
    options: [
      { label: "낮에 활동할 때", family: "citrus" },
      { label: "저녁 약속에", family: "oriental" },
      { label: "하루 종일", family: "musk" },
    ],
  },
];

const QUIZ_RESULTS = {
  citrus: { name: "시트러스", perfume: PERFUMES.loewe },
  musk: { name: "머스크", perfume: PERFUMES.lazySunday },
  woody: { name: "우디", perfume: PERFUMES.matiere },
  oriental: { name: "오리엔탈", perfume: PERFUMES.santaMaria },
};

// 가장 많이 고른 계열로 결정 (동점이면 먼저 고른 쪽)
function pickQuizResult(families) {
  const counts = new Map();
  families.forEach((family) => counts.set(family, (counts.get(family) ?? 0) + 1));
  const best = families.reduce((top, family) =>
    counts.get(family) > counts.get(top) ? family : top,
  );
  return QUIZ_RESULTS[best];
}

// 사용자가 보낸 말 → 챗봇 답변.
// keywords는 부분 일치, exact는 정확히 같을 때만 매칭 (짧은 대답이 엉뚱하게 걸리는 것 방지).
const SCRIPT = [
  {
    keywords: ["날씨"],
    exact: ["네", "응", "예", "그래", "좋아", "좋아요", "ㅇㅇ"],
    texts: ["오늘 날씨는 어떤가요?\n날씨에 맞춰 향수를 골라드릴게요."],
    menus: WEATHER_PERFUMES.map((item) => item.weather),
  },
  // 날씨 칩 5개 → 각각에 맞는 향수 카드
  ...WEATHER_PERFUMES.map((item) => ({
    keywords: item.aliases,
    texts: [`${item.phrase}에 어울리는 향수로 골라봤어요.`],
    perfume: item.perfume,
  })),
  {
    keywords: ["오늘의 향수 추천받기", "오늘의 향수", "추천받기"],
    texts: [
      "오늘의 향수를 고민하고 계시군요!\n제가 가지고 있는 정보인 날씨 기반으로\n추천해드릴까요?",
    ],
    menus: ["코디 등록하기", "고르는 목적 입력하기", "더 정확한 추천을 위한 문답 진행하기"],
  },
  {
    keywords: ["1:1 문의", "1:1문의", "문의"],
    texts: [
      "1:1 문의를 도와드릴게요.\n궁금하신 점이나 불편했던 점을 자유롭게 남겨주시면\n담당자가 확인 후 답변드릴게요.",
    ],
  },
  {
    keywords: ["데이트"],
    texts: ["오늘은 데이트 일정이 있으시군요!\n달콤한 데이트를 위해 이 향수를 추천드려요."],
  },
  // 브랜드명이 들어오면 그 매장 카드 — "샤넬 매장 어디야"처럼 써도 되도록
  // 아래의 일반 매장 안내보다 먼저 검사한다
  ...STORES.map((store) => ({
    keywords: store.keywords,
    texts: [
      `${store.keywords[0]}(${store.brand}) 매장을 방문하고 싶으시군요!\n현재 위치에서는 이 매장이 가장 가까워요.`,
    ],
    card: store,
  })),
  {
    keywords: ["가까운 매장 찾기", "매장"],
    texts: [
      "방문하고 싶은 브랜드나 방문 목적을\n알려주시면 가장 적합한 매장을 추천해드릴게요.",
    ],
  },
  {
    keywords: ["코디 등록하기", "코디"],
    texts: [
      "같은 코디라도 원하는 분위기에 따라 향수가 달라질 수 있어요.\n오늘 연출하고 싶은 분위기를 선택해 주세요.",
    ],
    menus: MOOD_PERFUMES.map((item) => item.mood),
  },
  {
    keywords: ["고르는 목적 입력하기", "목적"],
    texts: [
      "어떤 상황에서 쓰실 향수인가요?\n목적을 알려주시면 그에 맞는 향수를 골라드릴게요.",
    ],
    menus: PURPOSE_PERFUMES.map((item) => item.purpose),
  },
  // 목적 칩 5개 → 각각에 맞는 향수 카드
  ...PURPOSE_PERFUMES.map((item) => ({
    keywords: [item.purpose],
    texts: [item.reply],
    perfume: item.perfume,
  })),
  {
    keywords: ["향수 레이어링 추천", "레이어링"],
    texts: [
      "지금 가지고 계신 향수는 어떤 계열인가요?\n겹쳐 뿌리기 좋은 향수를 찾아드릴게요.",
    ],
    menus: LAYERING.map((item) => item.base),
  },
  // 레이어링 칩 5개 → 겹쳐 뿌리기 좋은 향수 카드
  ...LAYERING.map((item) => ({
    keywords: [item.base],
    texts: [
      `${item.base} 향수에는 ${item.partner} 계열을 겹쳐 뿌리면 잘 어울려요.\n이 향수를 추천드려요.`,
    ],
    perfume: item.perfume,
  })),
  {
    keywords: ["딱 맞는 향수 선물 고르기", "선물 고르기"],
    texts: [
      "누구에게 선물하실 건가요?\n받는 분을 알려주시면 잘 맞는 향수를 골라드릴게요.",
    ],
    menus: GIFT_PERFUMES.map((item) => item.target),
  },
  // 선물 칩 5개 → 받는 사람에게 맞는 향수 카드
  ...GIFT_PERFUMES.map((item) => ({
    keywords: [item.target],
    texts: [item.reply],
    perfume: item.perfume,
  })),
  // 분위기 칩 5개 → 각각에 맞는 향수 카드
  ...MOOD_PERFUMES.map((item) => ({
    keywords: [item.mood],
    texts: [`${item.mood} 어울리는 향수로 골라봤어요.`],
    perfume: item.perfume,
  })),
];

// 매칭되는 답변이 없을 때
const FALLBACK = {
  texts: ["죄송해요, 그건 제가 모르는 질문이예요.\n대신 이런 건 답변해드릴 수 있어요."],
  menus: MAIN_MENUS,
};

const GREETING = {
  id: "greeting",
  role: "bot",
  texts: ["안녕하세요. 저는 챗봇 레이예요.", "아래 메뉴를 선택하거나\n자유롭게 질문해 주세요"],
  menus: MAIN_MENUS,
};

function findReply(text) {
  const query = text.trim().toLowerCase();
  const hit = SCRIPT.find(
    (entry) =>
      entry.exact?.some((word) => query === word.toLowerCase()) ||
      entry.keywords?.some((keyword) => query.includes(keyword.toLowerCase())),
  );
  return hit ?? FALLBACK;
}

function askQuestion(index) {
  return {
    texts: [QUIZ[index].question],
    menus: QUIZ[index].options.map((option) => option.label),
  };
}

// 문답 진행 중이면 답을 모아 다음 질문/결과를 주고, 아니면 평소대로 스크립트에서 찾는다.
function nextReply(value, quiz, setQuiz) {
  if (quiz) {
    const chosen = QUIZ[quiz.step].options.find((option) =>
      value.includes(option.label),
    );

    // 보기와 상관없는 말을 하면 문답을 멈추고 일반 답변으로 돌아간다
    if (!chosen) {
      setQuiz(null);
      return findReply(value);
    }

    const families = [...quiz.families, chosen.family];
    if (quiz.step + 1 < QUIZ.length) {
      setQuiz({ step: quiz.step + 1, families });
      return askQuestion(quiz.step + 1);
    }

    setQuiz(null);
    const result = pickQuizResult(families);
    return {
      texts: [
        `답변을 모아보니 ${result.name} 계열이 잘 맞으실 것 같아요.\n이 향수를 추천드려요.`,
      ],
      perfume: result.perfume,
    };
  }

  if (value.includes("문답")) {
    setQuiz({ step: 0, families: [] });
    return askQuestion(0);
  }

  return findReply(value);
}

function BotMessage({ message, chosen, onSelectMenu, onSelectPerfume }) {
  return (
    <div className="flex w-full items-start gap-3">
      {/* 피그마: 60px 칸 안에 34×50으로 잘라 넣은 캐릭터 */}
      <div className="flex size-[60px] shrink-0 items-center justify-center">
        <div className="relative h-[50px] w-[34px] overflow-hidden">
          <img
            src={characterLay}
            alt="챗봇 레이"
            className="absolute left-[-60.7%] top-[-21.26%] h-[147.6%] w-[220.96%] max-w-none"
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-col items-start gap-4">
        {message.texts.map((text) => (
          <Bubble key={text} variant="bot" className="whitespace-pre-line">
            {text}
          </Bubble>
        ))}

        {message.card && (
          <ChatCard
            variant="shop"
            name={message.card.name}
            brand={message.card.brand}
            images={message.card.images}
            address={message.card.address}
            hours={message.card.hours}
            phone={message.card.phone}
            website={message.card.website}
          />
        )}

        {message.perfume && (
          <ChatCard
            variant="chatbot"
            img={message.perfume.img}
            brand={message.perfume.brand}
            name={message.perfume.name}
            keywords={message.perfume.keywords}
            onAction={() => onSelectPerfume?.(message.perfume)}
          />
        )}

        {message.menus && (
          <div className="flex w-full flex-wrap content-start items-start gap-1.5">
            {message.menus.map((menu, index) => (
              <QuickCategory
                key={menu}
                // 고른 게 있으면 그 칩만, 아직 없으면 디자인대로 첫 칩이 검정
                variant={
                  (chosen ? menu === chosen : index === 0)
                    ? "selected"
                    : "default"
                }
                onClick={() => onSelectMenu(message.id, menu)}
              >
                {menu}
              </QuickCategory>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Chatbot({ onBack, onSelectPerfume }) {
  const [messages, setMessages] = useState([GREETING]);
  const [draft, setDraft] = useState("");
  // 메시지별로 사용자가 고른 퀵버튼 { 메시지id: 라벨 }
  const [chosenMenus, setChosenMenus] = useState({});
  // 문답 진행 중일 때만 { step, families } — 아니면 null
  const [quiz, setQuiz] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const send = (text) => {
    const value = text.trim();
    if (!value) return;

    const turn = messages.length;
    const userMessage = { id: `user-${turn}`, role: "user", text: value };
    const reply = nextReply(value, quiz, setQuiz);

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: `bot-${turn}`, role: "bot", ...reply },
    ]);
    setDraft("");
  };

  const selectMenu = (messageId, menu) => {
    setChosenMenus((prev) => ({ ...prev, [messageId]: menu }));
    send(menu);
  };

  return (
    <div className="min-h-screen bg-offwhite">
      <main className="mx-auto flex w-full max-w-[430px] flex-col gap-6 bg-offwhite px-5 pb-[150px]">
        <header className="sticky top-0 z-10 flex w-full items-start justify-between bg-offwhite pb-3 pt-[18px]">
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={onBack}
            className="size-6 shrink-0"
          >
            <img src={caretLeft} alt="" className="size-6" />
          </button>
          <h1 className="w-[232px] text-title-semibold-24 text-offblack">
            챗봇레이
          </h1>
        </header>

        <div className="flex w-full flex-col gap-10">
          {messages.map((message) =>
            message.role === "bot" ? (
              <BotMessage
                key={message.id}
                message={message}
                chosen={chosenMenus[message.id]}
                onSelectMenu={selectMenu}
                onSelectPerfume={onSelectPerfume}
              />
            ) : (
              <div key={message.id} className="flex w-full justify-end">
                <Bubble variant="user" className="whitespace-pre-line">
                  {message.text}
                </Bubble>
              </div>
            ),
          )}
          <div ref={bottomRef} />
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[430px] bg-offwhite px-[18px] pb-5 pt-2">
        <div className="no-scrollbar mb-2.5 flex gap-2 overflow-x-auto">
          {MAIN_MENUS.map((menu) => (
            <QuickCategory
              key={menu}
              variant="under"
              onClick={() => send(menu)}
              className="shrink-0"
            >
              {menu}
            </QuickCategory>
          ))}
        </div>
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && send(draft)}
          onSend={() => send(draft)}
        />
      </div>
    </div>
  );
}
