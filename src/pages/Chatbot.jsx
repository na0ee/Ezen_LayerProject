import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Bubble, ChatCard, Input, QuickCategory } from "../components/common";
import { brands } from "../data/brands";
import { fragranceFamilies } from "../data/fragranceFamilies";
import { perfumeData } from "../data/perfumeData";
import { storeLocations } from "../data/storeLocations";
import caretLeft from "../assets/icons/caret-left.svg";
import characterLayAnimation from "../assets/images/chatbot/Lay-transparent.webp";
import characterLay from "../assets/images/character-lay.png";

const TYPING_DELAY_MS = 800;

const MAIN_MENUS = [
  "오늘의 향수 추천받기",
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

const SEASON_OPTIONS = ["봄", "여름", "가을", "겨울", "사계절"];
const INTENSITY_OPTIONS = ["은은하게", "적당하게", "강렬하게"];

const INTENT_LABELS = {
  recommend: "오늘의 향수 추천받기",
  gift: "딱 맞는 향수 선물 고르기",
};

const GREETING = {
  id: "greeting",
  role: "bot",
  texts: ["안녕하세요. 저는 챗봇 레이예요.", "아래 메뉴를 선택하거나\n자유롭게 질문해 주세요"],
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
        (id) =>
          fragranceFamilies.find((family) => family.id === id)?.keyword,
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

function BotMessage({
  message,
  chosen,
  onSelectMenu,
  onSelectPerfume,
}) {
  const isGreeting = message.id === "greeting";

  return (
    <div className="flex w-full items-start">
      <Character animated={isGreeting} />

      <div className="flex min-w-0 flex-col items-start gap-4">
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
                onAction={() =>
                  onSelectPerfume?.(message.perfume.entry)
                }
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
  const [lastPickFlow, setLastPickFlow] = useState(null);

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
        "제가 가지고 있는 정보인 날씨 기반으로 추천해드릴까요?",
      ],
      menus: [
        "코디 등록하기",
        "날씨 기반 추천받기",
        "더 정확한 추천을 위한 문답 진행하기",
      ],
    });

  const respondToWeatherAsk = () =>
    appendBot({
      texts: ["오늘의 날씨를 선택해주세요."],
      menus: WEATHER_OPTIONS.map((item) => item.label),
    });

  const respondToWeather = (weather) =>
    appendBot({
      texts: [`${weather.label} 날씨에 어울리는 향수로 골라봤어요.`],
      perfume: perfumeCardData(pickRandomPerfume([weather.familyId])),
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
            images: store.image ? [store.image] : [],
          }
        : undefined,
    });
  };

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
    setAwaiting("layering");
    inputRef.current?.focus();
    return appendBot({
      texts: [
        "함께 사용하고 싶은 향수가 있나요?",
        "향수 이름을 알려주시면 잘 어울리는 조합을 찾아드릴게요.",
      ],
    });
  };

  const respondToLayeringResult = () => {
    setLastPickFlow("layering");
    return appendBotMessages([
      {
        texts: [
          "좋아요! 입력해 주신 향수의 향조와 분위기를 바탕으로 잘 어울리는 조합을 찾아볼게요.",
          "서로의 매력을 해치지 않으면서 새로운 분위기를 만들어주는 조합으로 골라봤어요.",
        ],
        perfume: perfumeCardData(pickRandomPerfume()),
      },
      {
        texts: ["더 궁금한 조합이 있다면 아래 버튼을 눌러주세요!"],
        menus: ["다른 향수로 다시 찾기"],
      },
    ]);
  };

  const respondToGiftAsk = () => {
    setAwaiting("gift");
    inputRef.current?.focus();
    return appendBot({
      texts: [
        "선물할 사람의 분위기와 취향을 알려주세요!",
        "상대에게 어울릴 만한 향수를 레이가 대신 골라드릴게요.",
      ],
    });
  };

  const respondToGiftResult = () => {
    setLastPickFlow("gift");
    return appendBotMessages([
      {
        texts: [
          "좋아요! 알려주신 분위기와 취향을 바탕으로 선물하기 좋은 향수를 찾아볼게요.",
          "상대방의 이미지와 잘 어울리면서 선물로도 부담스럽지 않은 향수로 골라봤어요.",
        ],
        perfume: perfumeCardData(pickRandomPerfume()),
      },
      {
        texts: ["다른 향수도 보고 싶다면 아래 버튼을 눌러주세요!"],
        menus: ["다른 향수로 다시 찾기"],
      },
    ]);
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
      const season = SEASON_OPTIONS.find((item) =>
        textMatches(text, item),
      );
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
      ["가까운 매장 찾기", respondToStoreSearch],
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

    if (textMatches(text, "다른 향수로 다시 찾기")) {
      resetConversationState();
      if (lastPickFlow === "layering") respondToLayeringResult();
      else if (lastPickFlow === "gift") respondToGiftResult();
      else respondFallback();
      return;
    }

    const mood = MOOD_OPTIONS.find((item) =>
      textMatches(text, item.label),
    );
    if (mood) {
      resetConversationState();
      respondToMood(mood);
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
      (item) =>
        textMatches(text, item.name) ||
        textMatches(text, item.nameEn),
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
    if (awaiting === "layering") {
      setAwaiting(null);
      respondToLayeringResult();
      return;
    }
    if (awaiting === "gift") {
      setAwaiting(null);
      respondToGiftResult();
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
      <main className="mx-auto flex w-full max-w-[430px] flex-col gap-6 bg-background px-5 pb-[150px]">
        <header className="sticky top-0 z-10 -mx-5 flex items-start justify-between bg-offwhite px-5 pb-3 pt-[18px]">
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={onBack}
            className="size-6 shrink-0"
          >
            <img src={caretLeft} alt="" className="size-6" />
          </button>
          <h1 className="w-[232px] text-title-medium-20 text-offblack">
            챗봇레이
          </h1>
        </header>

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
