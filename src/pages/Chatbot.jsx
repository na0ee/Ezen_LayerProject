import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Bubble,
  ChatCard,
  Header,
  Input,
  QuickCategory,
} from "../components/common";
import { brands } from "../data/brands";
import { fragranceFamilies } from "../data/fragranceFamilies";
import { perfumeData } from "../data/perfumeData";
import { storeLocations } from "../data/storeLocations";
import characterLayAnimation from "../assets/images/chatbot/Lay-transparent.webp";
import characterLay from "../assets/images/character-lay.png";

const TYPING_DELAY_MS = 800;

const MAIN_MENUS = [
  "오늘의 향수 추천받기",
  "1:1 문의",
  "피드백하기",
  "가까운 매장 찾기",
  "향수 레이어링 추천",
  "딱 맞는 향수 선물 고르기",
];

const MOOD_OPTIONS = [
  { label: "차분하게", familyId: "woody" },
  { label: "포근하게", familyId: "musk" },
  { label: "산뜻하게", familyId: "citrus" },
  { label: "시크하게", familyId: "spicy" },
  { label: "매력적으로", familyId: "oriental" },
];

const WEATHER_OPTIONS = [
  { label: "맑음", familyId: "citrus" },
  { label: "흐림", familyId: "powdery" },
  { label: "더움", familyId: "aquatic" },
  { label: "추움", familyId: "woody" },
  { label: "비옴", familyId: "green" },
];

// 가지고 있는 향수 계열 → 겹쳐 뿌리기 좋은 계열
const LAYERING_OPTIONS = [
  { label: "머스크 계열", partner: "시트러스", familyId: "citrus" },
  { label: "시트러스 계열", partner: "머스크", familyId: "musk" },
  { label: "우디 계열", partner: "플로럴", familyId: "floral" },
  { label: "플로럴 계열", partner: "우디", familyId: "woody" },
  { label: "오리엔탈 계열", partner: "머스크", familyId: "musk" },
];

// 향수를 쓸 상황 → 어울리는 향 계열
// ("선물" 항목은 상단 메뉴의 '딱 맞는 향수 선물 고르기'와 겹쳐서 넣지 않았다)
const PURPOSE_OPTIONS = [
  {
    label: "데일리로 쓸 향수",
    reply: "매일 편하게 쓰기 좋은 향수로 골라봤어요.",
    familyId: "musk",
  },
  {
    label: "출근할 때",
    reply: "출근길에 어울리는 향수로 골라봤어요.",
    familyId: "woody",
  },
  {
    label: "특별한 날",
    reply: "특별한 날에 어울리는 향수로 골라봤어요.",
    familyId: "oriental",
  },
  {
    label: "운동할 때",
    reply: "운동할 때 어울리는 향수로 골라봤어요.",
    familyId: "citrus",
  },
];

// 선물 받는 사람 → 어울리는 향 계열
const GIFT_OPTIONS = [
  {
    label: "연인에게",
    reply: "연인에게 선물하기 좋은 향수로 골라봤어요.",
    familyId: "floral",
  },
  {
    label: "친구에게",
    reply: "친구에게 부담 없이 건네기 좋은 향수예요.",
    familyId: "citrus",
  },
  {
    label: "부모님께",
    reply: "부모님께 드리기 좋은 차분한 향수예요.",
    familyId: "woody",
  },
  {
    label: "직장 동료에게",
    reply: "직장 동료에게 무난하게 잘 맞는 향수예요.",
    familyId: "musk",
  },
  {
    label: "나에게 선물",
    reply: "나를 위한 선물로 이 향수는 어떠세요?",
    familyId: "oriental",
  },
];

const SEASON_OPTIONS = ["봄", "여름", "가을", "겨울", "사계절"];
const INTENSITY_OPTIONS = ["은은하게", "적당하게", "강렬하게"];

const INTENT_LABELS = {
  recommend: "오늘의 향수 추천받기",
  gift: "딱 맞는 향수 선물 고르기",
};

const GREETING = {
  id: "greeting",
  role: "bot",
  texts: [
    "안녕하세요. 저는 챗봇 레이예요.",
    "아래 메뉴를 선택하거나\n자유롭게 질문해 주세요",
  ],
  menus: MAIN_MENUS,
};

function createId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function normalize(text) {
  return text.trim().replace(/\s+/g, "").toLowerCase();
}

function textMatches(input, trigger) {
  const query = normalize(input);
  const target = normalize(trigger);
  if (!query || !target) return false;
  return query.includes(target) || target.includes(query);
}

function pickRandomPerfume(familyIds, season) {
  let pool = perfumeData;

  if (familyIds?.length) {
    const seasonFamilyIds = season
      ? fragranceFamilies
          .filter((family) => family.seasons.includes(season))
          .map((family) => family.id)
      : null;

    const narrowed = perfumeData.filter((entry) =>
      entry.perfume.familyIds.some(
        (id) =>
          familyIds.includes(id) &&
          (!seasonFamilyIds || seasonFamilyIds.includes(id)),
      ),
    );

    pool = narrowed.length
      ? narrowed
      : perfumeData.filter((entry) =>
          entry.perfume.familyIds.some((id) => familyIds.includes(id)),
        );
  }

  if (!pool.length) pool = perfumeData;
  return pool[Math.floor(Math.random() * pool.length)];
}

function perfumeCardData(entry) {
  const brand = brands.find((item) => item.id === entry.perfume.brandId);
  return {
    entry,
    img: entry.perfume.image,
    brand: brand?.nameEn ?? brand?.name ?? "",
    name: entry.perfume.name,
    keywords: entry.perfume.familyIds
      .map(
        (id) => fragranceFamilies.find((family) => family.id === id)?.keyword,
      )
      .filter(Boolean),
  };
}

function LoadingBubble() {
  return (
    <Bubble variant="bot">
      <span className="flex h-6 items-center gap-1" aria-label="답변 작성 중">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="size-1.5 animate-bounce rounded-full bg-grey"
            style={{ animationDelay: `${index * 120}ms` }}
          />
        ))}
      </span>
    </Bubble>
  );
}

function Character({ animated = false }) {
  return (
    <div className="flex size-[60px] shrink-0 items-center justify-center">
      <div className="relative h-[50px] w-[34px] overflow-hidden">
        {animated ? (
          <img
            src={characterLayAnimation}
            alt="챗봇 레이"
            className="absolute inset-0 size-full max-w-none object-contain"
          />
        ) : (
          <img
            src={characterLay}
            alt="챗봇 레이"
            className="absolute left-[-60.7%] top-[-21.26%] h-[147.6%] w-[220.96%] max-w-none"
          />
        )}
      </div>
    </div>
  );
}

function BotMessage({ message, chosen, onSelectMenu, onSelectPerfume }) {
  const isGreeting = message.id === "greeting";

  return (
    <div className="flex w-full items-start">
      <Character animated={isGreeting} />

      <div className="flex min-w-0 flex-1 flex-col items-start gap-4">
        {message.loading ? (
          <LoadingBubble />
        ) : (
          <>
            {message.texts.map((text, index) => (
              <Bubble
                key={`${message.id}-text-${index}`}
                variant="bot"
                className="whitespace-pre-line"
              >
                {text}
              </Bubble>
            ))}

            {message.store && (
              <ChatCard
                variant="shop"
                name={message.store.name}
                brand={message.store.brand}
                images={message.store.images}
                address={message.store.address}
                hours={message.store.hours}
                phone={message.store.phone}
                website={message.store.url}
                actionLabel="길 찾기"
                onAction={() => {
                  const destination = encodeURIComponent(
                    `${message.store.name} ${message.store.address}`,
                  );
                  window.open(
                    message.store.mapUrl ??
                      `https://map.kakao.com/?q=${destination}`,
                    "_blank",
                    "noopener,noreferrer",
                  );
                }}
              />
            )}

            {message.perfume && (
              <ChatCard
                variant="chatbot"
                img={message.perfume.img}
                brand={message.perfume.brand}
                name={message.perfume.name}
                keywords={message.perfume.keywords}
                onAction={() => onSelectPerfume?.(message.perfume.entry)}
              />
            )}

            {message.menus && (
              <div className="flex w-full flex-wrap content-start items-start gap-1.5">
                {message.menus.map((menu, index) => (
                  <QuickCategory
                    key={menu}
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
          </>
        )}
      </div>
    </div>
  );
}

export default function Chatbot({ onBack, onSelectPerfume }) {
  const [searchParams] = useSearchParams();
  const initialIntentHandled = useRef(false);
  const inputRef = useRef(null);
  const latestReplyRef = useRef(null);
  const timersRef = useRef(new Set());

  const [messages, setMessages] = useState([GREETING]);
  const [draft, setDraft] = useState("");
  const [chosenMenus, setChosenMenus] = useState({});
  const [awaiting, setAwaiting] = useState(null);
  const [quizStage, setQuizStage] = useState(null);
  const [quizFamilyId, setQuizFamilyId] = useState(null);
  const [quizSeason, setQuizSeason] = useState(null);

  useEffect(() => {
    latestReplyRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [messages]);

  useEffect(
    () => () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
    },
    [],
  );

  const appendUser = (text) => {
    setMessages((prev) => [
      ...prev,
      { id: createId("user"), role: "user", text },
    ]);
  };

  const appendBotMessages = (items) =>
    new Promise((resolve) => {
      const loadingId = createId("loading");
      setMessages((prev) => [
        ...prev,
        { id: loadingId, role: "bot", loading: true, texts: [] },
      ]);

      const timer = window.setTimeout(() => {
        timersRef.current.delete(timer);
        setMessages((prev) => {
          const index = prev.findIndex((message) => message.id === loadingId);
          if (index === -1) return prev;
          const next = [...prev];
          next.splice(
            index,
            1,
            ...items.map((item) => ({
              id: createId("bot"),
              role: "bot",
              ...item,
            })),
          );
          return next;
        });
        resolve();
      }, TYPING_DELAY_MS);

      timersRef.current.add(timer);
    });

  const appendBot = (item) => appendBotMessages([item]);

  const resetConversationState = () => {
    setAwaiting(null);
    setQuizStage(null);
  };

  const respondToRecommend = () =>
    appendBot({
      texts: [
        "오늘의 향수를 고민하고 계시군요!",
        "어떤 방식으로 골라드릴까요?",
      ],
      // 첫 번째 칩이 검정으로 강조되므로, 시안 의도대로 날씨 기반 추천을 맨 앞에 둔다
      menus: [
        "날씨 기반 추천받기",
        "코디 등록하기",
        "고르는 목적 입력하기",
        "더 정확한 추천을 위한 문답 진행하기",
      ],
    });

  const respondToWeatherAsk = () =>
    appendBot({
      texts: ["오늘 날씨는 어떤가요?\n날씨에 맞춰 향수를 골라드릴게요."],
      menus: WEATHER_OPTIONS.map((item) => item.label),
    });

  const respondToWeather = (weather) =>
    appendBot({
      texts: [`${weather.label} 날씨에 어울리는 향수로 골라봤어요.`],
      perfume: perfumeCardData(pickRandomPerfume([weather.familyId])),
    });

  const respondToPurposeAsk = () =>
    appendBot({
      texts: [
        "어떤 상황에서 쓰실 향수인가요?\n목적을 알려주시면 그에 맞는 향수를 골라드릴게요.",
      ],
      menus: PURPOSE_OPTIONS.map((item) => item.label),
    });

  const respondToPurpose = (option) =>
    appendBot({
      texts: [option.reply],
      perfume: perfumeCardData(pickRandomPerfume([option.familyId])),
    });

  const respondToStoreSearch = () =>
    appendBot({
      texts: [
        "방문하고 싶은 브랜드나 방문 목적을 알려주시면 가장 적합한 매장을 추천해드릴게요.",
      ],
    });

  const respondToBrand = (brand) => {
    const store = storeLocations[brand.id];
    return appendBot({
      texts: [
        `${brand.name} 매장을 방문하고 싶으시군요!`,
        store
          ? "현재 위치에서는 이 매장이 가장 가까워요."
          : "아직 등록된 매장 정보가 없어요.",
      ],
      store: store
        ? {
            ...store,
            brand: brand.nameEn,
            // 매장 사진(있으면) + 지도. storeLocations.js에서 연결한다
            images: store.images ?? (store.image ? [store.image] : []),
          }
        : undefined,
    });
  };

  const respondToInquiry = () =>
    appendBot({
      texts: [
        "1:1 문의를 도와드릴게요.",
        "궁금하신 점이나 불편했던 점을 자유롭게 남겨주시면 담당자가 확인 후 답변드릴게요.",
      ],
    });

  const respondToFeedbackAsk = () => {
    setAwaiting("feedback");
    inputRef.current?.focus();
    return appendBot({
      texts: [
        "앱을 사용하면서 느낀 점을 들려주세요.",
        "불편했던 점이나 개선 아이디어를 자유롭게 남겨주세요.",
      ],
    });
  };

  const respondToFeedbackThanks = () =>
    appendBot({
      texts: [
        "소중한 의견 감사합니다!",
        "남겨주신 내용은 더 나은 서비스를 만드는 데 꼼꼼히 참고할게요.",
      ],
    });

  const respondToLayeringAsk = () => {
    return appendBot({
      texts: [
        "지금 가지고 계신 향수는 어떤 계열인가요?\n겹쳐 뿌리기 좋은 향수를 찾아드릴게요.",
      ],
      menus: LAYERING_OPTIONS.map((item) => item.label),
    });
  };

  const respondToLayering = (option) => {
    return appendBot({
      texts: [
        `${option.label} 향수에는 ${option.partner} 계열을 겹쳐 뿌리면 잘 어울려요.\n이 향수를 추천드려요.`,
      ],
      perfume: perfumeCardData(pickRandomPerfume([option.familyId])),
    });
  };

  const respondToGiftAsk = () => {
    return appendBot({
      texts: [
        "누구에게 선물하실 건가요?\n받는 분을 알려주시면 잘 맞는 향수를 골라드릴게요.",
      ],
      menus: GIFT_OPTIONS.map((item) => item.label),
    });
  };

  const respondToGift = (option) => {
    return appendBot({
      texts: [option.reply],
      perfume: perfumeCardData(pickRandomPerfume([option.familyId])),
    });
  };

  const respondToOutfitAsk = () =>
    appendBot({
      texts: [
        "같은 코디라도 원하는 분위기에 따라 향수가 달라질 수 있어요.",
        "오늘 연출하고 싶은 분위기를 선택해 주세요.",
      ],
      menus: MOOD_OPTIONS.map((item) => item.label),
    });

  const respondToMood = (mood) =>
    appendBot({
      texts: [`${mood.label} 어울리는 향수로 골라봤어요.`],
      perfume: perfumeCardData(pickRandomPerfume([mood.familyId])),
    });

  const respondToQuizStart = () => {
    setQuizStage("family");
    setQuizFamilyId(null);
    setQuizSeason(null);
    return appendBot({
      texts: [
        "조금 더 정확한 추천을 위해 몇 가지 질문을 시작할게요.",
        "평소 취향에 가까운 답을 선택해 주세요.",
      ],
      menus: fragranceFamilies.map((family) => family.keyword),
    });
  };

  const respondToQuizSeasonAsk = () =>
    appendBot({
      texts: [
        "좋아요! 취향을 조금씩 알아가고 있어요.",
        "다음 질문도 가장 마음에 가까운 답을 선택해 주세요.",
      ],
      menus: SEASON_OPTIONS,
    });

  const respondToQuizIntensityAsk = () =>
    appendBot({
      texts: [
        "좋아요, 이제 취향의 윤곽이 보이기 시작했어요.",
        "조금만 더 알아볼게요!",
      ],
      menus: INTENSITY_OPTIONS,
    });

  const respondToQuizResult = (familyId, season) =>
    appendBotMessages([
      {
        texts: [
          "모든 답변이 완료됐어요!",
          "지금까지의 선택을 바탕으로 잘 어울리는 향수를 찾아볼게요.",
        ],
      },
      {
        texts: [
          "답변에서 나타난 취향과 선호하는 분위기를 바탕으로 가장 잘 맞는 향수를 골라봤어요.",
        ],
        perfume: perfumeCardData(
          pickRandomPerfume(familyId ? [familyId] : undefined, season),
        ),
      },
      {
        texts: [
          "추천 결과가 마음에 드셨나요?",
          "다른 분위기의 향수를 찾고 싶다면 문답을 다시 진행할 수 있어요.",
        ],
        menus: ["문답 다시 진행하기"],
      },
    ]);

  const respondFallback = () =>
    appendBot({
      texts: [
        "죄송해요, 그건 제가 모르는 질문이에요.",
        "대신 이런 건 답변해드릴 수 있어요.",
      ],
      menus: MAIN_MENUS,
    });

  const handleUserInput = (rawText) => {
    const text = rawText.trim();
    if (!text) return;

    setDraft("");
    appendUser(text);

    if (quizStage === "family") {
      const family = fragranceFamilies.find((item) =>
        textMatches(text, item.keyword),
      );
      if (family) {
        setQuizFamilyId(family.id);
        setQuizStage("season");
        respondToQuizSeasonAsk();
        return;
      }
    }

    if (quizStage === "season") {
      const season = SEASON_OPTIONS.find((item) => textMatches(text, item));
      if (season) {
        setQuizSeason(season);
        setQuizStage("intensity");
        respondToQuizIntensityAsk();
        return;
      }
    }

    if (quizStage === "intensity") {
      const intensity = INTENSITY_OPTIONS.find((item) =>
        textMatches(text, item),
      );
      if (intensity) {
        setQuizStage(null);
        respondToQuizResult(quizFamilyId, quizSeason);
        return;
      }
    }

    const directActions = [
      ["날씨 기반 추천받기", respondToWeatherAsk],
      ["오늘의 향수 추천받기", respondToRecommend],
      ["고르는 목적 입력하기", respondToPurposeAsk],
      ["가까운 매장 찾기", respondToStoreSearch],
      ["1:1 문의", respondToInquiry],
      ["피드백하기", respondToFeedbackAsk],
      ["향수 레이어링 추천", respondToLayeringAsk],
      ["딱 맞는 향수 선물 고르기", respondToGiftAsk],
      ["코디 등록하기", respondToOutfitAsk],
    ];

    const directAction = directActions.find(([label]) =>
      textMatches(text, label),
    );
    if (directAction) {
      resetConversationState();
      directAction[1]();
      return;
    }

    if (
      textMatches(text, "더 정확한 추천을 위한 문답 진행하기") ||
      textMatches(text, "문답 다시 진행하기")
    ) {
      resetConversationState();
      respondToQuizStart();
      return;
    }

    const mood = MOOD_OPTIONS.find((item) => textMatches(text, item.label));
    if (mood) {
      resetConversationState();
      respondToMood(mood);
      return;
    }

    const purpose = PURPOSE_OPTIONS.find((item) =>
      textMatches(text, item.label),
    );
    if (purpose) {
      resetConversationState();
      respondToPurpose(purpose);
      return;
    }

    const layering = LAYERING_OPTIONS.find((item) =>
      textMatches(text, item.label),
    );
    if (layering) {
      resetConversationState();
      respondToLayering(layering);
      return;
    }

    const gift = GIFT_OPTIONS.find((item) => textMatches(text, item.label));
    if (gift) {
      resetConversationState();
      respondToGift(gift);
      return;
    }

    const weather = WEATHER_OPTIONS.find((item) =>
      textMatches(text, item.label),
    );
    if (weather) {
      resetConversationState();
      respondToWeather(weather);
      return;
    }

    const brand = brands.find(
      (item) => textMatches(text, item.name) || textMatches(text, item.nameEn),
    );
    if (brand) {
      resetConversationState();
      respondToBrand(brand);
      return;
    }

    if (awaiting === "feedback") {
      setAwaiting(null);
      respondToFeedbackThanks();
      return;
    }
    respondFallback();
  };

  const selectMenu = (messageId, menu) => {
    setChosenMenus((prev) => ({ ...prev, [messageId]: menu }));
    handleUserInput(menu);
  };

  useEffect(() => {
    if (initialIntentHandled.current) return;
    initialIntentHandled.current = true;
    const label = INTENT_LABELS[searchParams.get("intent") ?? ""];
    if (label) handleUserInput(label);
    // 최초 URL intent만 한 번 처리한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* 다른 화면과 같은 공통 헤더 (검색 → /category, 알림 → /alarm은 Header 기본값).
          본문의 px-5 밖에 둬야 헤더 배경이 좌우 끝까지 닿는다 */}
      <div className="sticky top-0 z-10 mx-auto w-full max-w-[430px]">
        <Header variant="detail-back" title="챗봇레이" onBack={onBack} />
      </div>

      <main className="mx-auto flex w-full max-w-[430px] flex-col gap-6 bg-background px-5 pb-[150px] pt-6">
        <div className="flex w-full flex-col gap-10">
          {messages.map((message, index) => {
            const isLatestReply =
              message.role === "bot" && index === messages.length - 1;
            return message.role === "bot" ? (
              <div
                key={message.id}
                ref={isLatestReply ? latestReplyRef : null}
                className="scroll-mt-[72px]"
              >
                <BotMessage
                  message={message}
                  chosen={chosenMenus[message.id]}
                  onSelectMenu={selectMenu}
                  onSelectPerfume={onSelectPerfume}
                />
              </div>
            ) : (
              <div key={message.id} className="flex w-full justify-end">
                <Bubble variant="user" className="whitespace-pre-line">
                  {message.text}
                </Bubble>
              </div>
            );
          })}
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[430px] bg-background px-[18px] pb-5 pt-2">
        {messages.length > 1 && (
          <div className="no-scrollbar mb-2.5 flex gap-2 overflow-x-auto">
            {MAIN_MENUS.map((menu) => (
              <QuickCategory
                key={menu}
                variant="under"
                onClick={() => handleUserInput(menu)}
                className="shrink-0"
              >
                {menu}
              </QuickCategory>
            ))}
          </div>
        )}
        <Input
          inputRef={inputRef}
          value={draft}
          placeholder={
            awaiting ? "답변을 입력해 주세요" : "무엇이든지 물어보세요!"
          }
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.nativeEvent.isComposing) {
              handleUserInput(draft);
            }
          }}
          onSend={() => handleUserInput(draft)}
        />
      </div>
    </div>
  );
}
