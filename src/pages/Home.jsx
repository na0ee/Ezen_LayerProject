import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BottomNav,
  BtnHero,
  CardChallengeSmall,
  CardMag,
  CardMainReview,
  CardRank,
  Category,
  FeatureGuideCard,
  Header,
  MainBanner,
  MainBannerText,
  TitleMain,
} from "../components/common";
import challenge1 from "../assets/images/home/challenge-1.png";
import challenge2 from "../assets/images/home/challenge-2.png";
import challenge3 from "../assets/images/home/challenge-3.png";
import { CHALLENGE_REWARDS } from "../data/challengeRewards";
import giftImg from "../assets/images/home/gift.png";
import heroCommunityImg from "../assets/images/home/hero-community.png";
import heroImg from "../assets/images/home/hero.png";
import heroRecordImg from "../assets/images/home/hero-record.png";
import magazine1 from "../assets/images/home/magazine-1.png";
import magazine2 from "../assets/images/home/magazine-2.png";
import magazine3 from "../assets/images/home/magazine-3.png";
import raffleImg from "../assets/images/home/raffle.png";
import scent1 from "../assets/images/home/scent-1.png";
import scent2 from "../assets/images/home/scent-2.png";
import scent3 from "../assets/images/home/scent-3-new.png";
import { allPerfumes } from "../data/perfumeUtils";
import profileFadedscent from "../assets/Community/Profile/profile-fadedscent.png";
import profilePassingPerfumer from "../assets/Community/Profile/profile-passing-perfumer.png";
import profileRainyScent from "../assets/Community/Profile/profile-rainy-scent.png";
import usePerfumeWishlist from "../hooks/usePerfumeWishlist";

const days = [
  { day: "Mon", date: "6", recorded: true },
  { day: "Tue", date: "7", recorded: true },
  { day: "Wed", date: "8", recorded: true },
  { day: "Thu", date: "9", recorded: true },
  { day: "Fri", date: "10", recorded: false },
  { day: "Sat", date: "11", recorded: true },
  { day: "Sun", date: "12", recorded: false },
];

const heroSlides = [
  {
    img: heroImg,
    imageClassName: "absolute inset-0 size-full object-cover",
    text: "몇 가지 질문으로 당신만의 향 취향을 찾아드릴게요",
    button: "My LAYER 진단하기",
    overlay: true,
  },
  {
    img: heroRecordImg,
    imageClassName:
      "absolute left-[-0.03%] top-[-26.84%] h-[142.54%] w-full max-w-none",
    text: "오늘의 향이, 내일의 취향이 됩니다",
    button: "향수 기록 시작하기",
  },
  {
    img: heroCommunityImg,
    imageClassName: "absolute inset-0 size-full object-cover",
    text: "당신이 찾던 향, 누군가는 이미 뿌리고 있어요",
    button: "커뮤니티 입장하기",
  },
];

const scentCards = [
  {
    img: scent1,
    label: "Mood Shifter",
    name: "oat.latte",
    keywords: ["포근한", "머스크"],
    profileImage: profileFadedscent,
    title: "포근한 하루에 어울리는 향을 찾고 있어요",
    text: "부드럽고 편안한 분위기에 자연스럽게 스며드는 머스크 향을 추천해주세요.",
  },
  {
    img: scent2,
    label: "Daily Basic",
    name: "mellow_bin",
    keywords: ["달콤한", "바닐라"],
    profileImage: profilePassingPerfumer,
    title: "달콤한 분위기에 어울리는 향이 궁금해요",
    text: "따뜻한 바닐라처럼 기분 좋은 달콤함이 오래 남는 향수를 찾고 있어요.",
  },
  {
    img: scent3,
    label: "Mood Shifter",
    name: "dansu_o",
    keywords: ["우디", "빈티지"],
    profileImage: profileRainyScent,
    title: "빈티지한 무드에 어울리는 우디 향 찾아요",
    text: "차분하면서도 개성이 느껴지는 깊은 우디 향수를 추천받고 싶어요.",
  },
];

const challengeCards = [
  {
    id: "home-community",
    img: challenge1,
    title: "커뮤니티 이용하기",
    desc: "질문·답변·리뷰 남기고 최대 75p까지",
  },
  {
    id: "home-register-perfume",
    img: challenge2,
    title: "내 향수 등록하기",
    desc: "내 보유향수 첫 등록 시 30p, 등록할 때 마다 5p씩!",
  },
  {
    id: "home-recommend-perfume",
    img: challenge3,
    title: "향수 추천하기",
    desc: "유저에게 어울리는 향을 찾아주고, 포인트 받자!",
  },
];

const rankIdsByCategory = {
  전체: [16, 37, 44],
  선물: [19, 21, 41],
  여성: [7, 22, 43],
  "20대": [1, 17, 25],
  "30대": [20, 27, 42],
  남성: [9, 10, 28],
};

function useDragScroll() {
  const drag = useRef({
    active: false,
    dragged: false,
    pointerId: null,
    startX: 0,
    scrollLeft: 0,
  });

  const onPointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const element = event.currentTarget;
    drag.current = {
      active: true,
      dragged: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: element.scrollLeft,
    };
  };

  const onPointerMove = (event) => {
    if (!drag.current.active) return;

    const distance = event.clientX - drag.current.startX;
    if (!drag.current.dragged && Math.abs(distance) > 8) {
      drag.current.dragged = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    if (!drag.current.dragged) return;
    event.currentTarget.scrollLeft =
      drag.current.scrollLeft - distance;
  };

  const stopDragging = (event) => {
    if (!drag.current.active) return;
    drag.current.active = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onClickCapture = (event) => {
    if (!drag.current.dragged) return;
    event.preventDefault();
    event.stopPropagation();
    drag.current.dragged = false;
  };

  return {
    onDragStart: (event) => event.preventDefault(),
    onClickCapture,
    onPointerDown,
    onPointerMove,
    onPointerUp: stopDragging,
    onPointerCancel: stopDragging,
  };
}

export default function Home({ onRaffle, onStartOnboarding, onNavigate }) {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("home");
  const [giftCategory, setGiftCategory] = useState("전체");
  const [isPastHero, setIsPastHero] = useState(false);
  const [activeHero, setActiveHero] = useState(0);
  const [heroTimerKey, setHeroTimerKey] = useState(0);
  const [guideStep, setGuideStep] = useState(1);
  const { isWishlisted, toggleWishlist } = usePerfumeWishlist();
  const heroDrag = useRef({
    active: false,
    dragged: false,
    pointerId: null,
    startX: 0,
  });
  const recordGuideRef = useRef(null);
  const raffleGuideRef = useRef(null);
  const scentGuideRef = useRef(null);
  const magazineGuideRef = useRef(null);
  const scentDrag = useDragScroll();
  const challengeDrag = useDragScroll();
  const magazineDrag = useDragScroll();
  const rankDrag = useDragScroll();
  const rankCards = rankIdsByCategory[giftCategory].map((id) =>
    allPerfumes.find((item) => item.id === id),
  ).filter(Boolean);

  const changeHero = (direction) => {
    setActiveHero(
      (current) =>
        (current + direction + heroSlides.length) % heroSlides.length,
    );
    setHeroTimerKey((current) => current + 1);
  };

  const selectHero = (index) => {
    setActiveHero(index);
    setHeroTimerKey((current) => current + 1);
  };

  const handleHeroPointerDown = (event) => {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) {
      return;
    }
    if (event.target.closest("button, a")) return;

    heroDrag.current = {
      active: true,
      dragged: false,
      pointerId: event.pointerId,
      startX: event.clientX,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleHeroPointerMove = (event) => {
    if (!heroDrag.current.active) return;

    if (Math.abs(event.clientX - heroDrag.current.startX) > 8) {
      heroDrag.current.dragged = true;
    }
  };

  const finishHeroDrag = (event) => {
    if (
      !heroDrag.current.active ||
      heroDrag.current.pointerId !== event.pointerId
    ) {
      return;
    }

    const distance = event.clientX - heroDrag.current.startX;
    heroDrag.current.active = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (Math.abs(distance) >= 50) {
      changeHero(distance < 0 ? 1 : -1);
    }
  };

  const handleHeroClickCapture = (event) => {
    if (!heroDrag.current.dragged) return;
    event.preventDefault();
    event.stopPropagation();
    heroDrag.current.dragged = false;
  };

  useEffect(() => {
    const handleScroll = () => setIsPastHero(window.scrollY >= 536);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [heroTimerKey]);

  useEffect(() => {
    const handleGuideChange = (event) => {
      setGuideStep(event.detail ? 1 : null);
    };

    window.addEventListener("layer:guide-change", handleGuideChange);
    return () =>
      window.removeEventListener("layer:guide-change", handleGuideChange);
  }, []);

  useEffect(() => {
    if (guideStep == null) {
      delete document.documentElement.dataset.homeGuideStep;
      return undefined;
    }

    document.documentElement.dataset.homeGuideStep = String(guideStep);
    const target =
      guideStep === 1
        ? recordGuideRef.current
        : guideStep === 2
          ? raffleGuideRef.current
          : guideStep === 3
            ? scentGuideRef.current
            : guideStep === 4
              ? magazineGuideRef.current
              : null;

    if (guideStep === 5) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return undefined;
    }

    if (target) {
      const targetTop =
        target.getBoundingClientRect().top + window.scrollY;
      const guideTargetTop = window.innerHeight * 0.43;

      window.scrollTo({
        top: Math.max(0, targetTop - guideTargetTop),
        behavior: "smooth",
      });
    }

    return () => {
      delete document.documentElement.dataset.homeGuideStep;
    };
  }, [guideStep]);

  const advanceHomeGuide = useCallback((event) => {
    if (guideStep == null) return;

    event.preventDefault();
    event.stopPropagation();

    if (guideStep < 5) {
      setGuideStep((current) => current + 1);
      return;
    }

    setGuideStep(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [guideStep]);

  useEffect(() => {
    if (guideStep == null) return undefined;

    const handleGuideClick = (event) => {
      const target = event.target;
      if (
        !(target instanceof Element) ||
        !target.closest(".desktop-app, [data-bottom-nav]")
      ) {
        return;
      }

      advanceHomeGuide(event);
    };
    document.addEventListener("click", handleGuideClick, true);
    return () => document.removeEventListener("click", handleGuideClick, true);
  }, [advanceHomeGuide, guideStep]);

  return (
    <div className="min-h-screen bg-background">
      {guideStep != null && (
        <>
          <div className="feature-guide-overlay pointer-events-none fixed inset-0 z-[150] bg-black/55" />
          <div
            className={`pointer-events-none fixed left-1/2 z-[170] -translate-x-1/2 ${
              guideStep === 5
                ? "bottom-[104px]"
                : "top-[calc(43dvh-124px)]"
            }`}
          >
            <FeatureGuideCard
              characterPosition={guideStep % 2 === 0 ? "right" : "left"}
              size="compact"
              progress={`${guideStep} / 5`}
              className="!gap-1"
            >
              {guideStep === 1 && (
                <>
                  오늘 사용한 향수를 기록해 보세요.
                  <br />
                  나의 향수 기록을 한눈에 확인할 수 있어요.
                </>
              )}
              {guideStep === 2 && (
                <>
                  매주 새로운 향수 래플이 열려요.
                  <br />
                  응모하고 특별한 향수를 만나보세요.
                </>
              )}
              {guideStep === 3 && (
                <>
                  사진 속 분위기와 어울리는 향수를
                  <br />
                  유저에게 추천해보세요!
                </>
              )}
              {guideStep === 4 && (
                <>
                  향수 트렌드와 취향에 도움이 되는
                  <br />
                  다양한 이야기를 만나보세요.
                </>
              )}
              {guideStep === 5 && (
                <>
                  선물 추천, 매장 찾기 등
                  <br />
                  궁금한 것들을 LAY에게 물어보세요!
                </>
              )}
            </FeatureGuideCard>
          </div>
        </>
      )}
      <main className="relative mx-auto w-full max-w-[430px] overflow-hidden bg-background pb-32">
        <section
          className="relative aspect-[430/536] w-full cursor-grab touch-pan-y select-none overflow-hidden bg-offblack active:cursor-grabbing"
          onClickCapture={handleHeroClickCapture}
          onPointerCancel={finishHeroDrag}
          onPointerDown={handleHeroPointerDown}
          onPointerMove={handleHeroPointerMove}
          onPointerUp={finishHeroDrag}
        >
          {heroSlides.map((slide, index) => (
            <div
              key={slide.button}
              aria-hidden={activeHero !== index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                activeHero === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <img
                src={slide.img}
                alt=""
                className={slide.imageClassName}
                draggable="false"
              />
              {slide.overlay && <div className="absolute inset-0 bg-offblack/20" />}
            </div>
          ))}
          <Header
            variant={isPastHero ? "main2" : "main"}
            className={`fixed inset-x-0 top-0 z-30 mx-auto max-w-[430px] transition-colors ${
              isPastHero ? "bg-offwhite" : ""
            }`}
          />
          <div className="absolute inset-x-0 bottom-[30px] flex flex-col items-center gap-4 px-5">
            <p className="text-center text-body-medium-16 text-offwhite">
              {heroSlides[activeHero].text}
            </p>
            <BtnHero
              onClick={() => {
                if (activeHero === 0) onStartOnboarding?.();
                if (activeHero === 1) navigate("/mypage/perfumes/record");
                if (activeHero === 2) onNavigate?.("community");
              }}
            >
              {heroSlides[activeHero].button}
            </BtnHero>
            <div className="relative mt-1 h-0.5 w-[120px] bg-offwhite">
              <div
                className="h-full bg-offblack transition-[width] duration-500"
                style={{ width: `${(activeHero + 1) * 40}px` }}
              />
              <div className="absolute inset-0 grid grid-cols-3">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.button}
                    type="button"
                    aria-label={`Hero ${index + 1} 보기`}
                    onClick={() => selectHero(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-[60px] pt-10">
          <section
            ref={recordGuideRef}
            className={`flex flex-col gap-[30px] px-5 ${
              guideStep === 1 ? "relative z-[160]" : ""
            }`}
          >
            <TitleMain
              title="Record"
              actionVariant="record"
              sub={
                <>
                  이번주 <span className="text-point-orange">5일</span> 기록했어요
                </>
              }
              onMore={() => navigate("/mypage/perfumes/record")}
            />
            <div className="flex h-18 items-center gap-1.5">
              {days.map(({ day, date, recorded }) => (
                <div
                  key={day}
                  className={`flex h-17 max-w-12.5 flex-1 flex-col items-center justify-center gap-2.5 rounded-[50px] border text-caption-medium-12 ${
                    recorded
                      ? "border-offblack bg-offblack text-offwhite"
                      : "border-light-grey bg-offwhite text-offblack"
                  }`}
                >
                  <span>{day}</span>
                  <span>{date}</span>
                </div>
              ))}
            </div>
          </section>

          <section
            ref={raffleGuideRef}
            className={`px-5 ${
              guideStep === 2 ? "relative z-[160]" : ""
            }`}
          >
            <MainBannerText
              img={raffleImg}
              imgClassName="absolute inset-0 size-full object-cover"
              label="Raffle of the week"
              title={"갖고 싶던 그 향,\n운에 맡겨보세요"}
              actionLabel="응모하기"
              onAction={onRaffle}
              className="bg-offblack"
            />
          </section>

          <section
            ref={scentGuideRef}
            className={`flex flex-col gap-[30px] ${
              guideStep === 3 ? "relative z-[160]" : ""
            }`}
          >
            <div className="px-5">
              <TitleMain
                title="Scent Pick"
                sub="사진 속 분위기에 어울리는 향수를 추천해보세요"
                onMore={() =>
                  navigate("/community", {
                    state: { communityTab: "향 추천" },
                  })
                }
              />
            </div>
            <div
              {...scentDrag}
              className="flex cursor-grab touch-auto select-none gap-3 overflow-x-scroll overscroll-x-contain px-5 pb-1 [clip-path:inset(0_0_0_20px)] active:cursor-grabbing [scrollbar-width:none] [&_img]:pointer-events-none [&_img]:select-none [&::-webkit-scrollbar]:hidden"
            >
              {scentCards.map((card, index) => (
                <CardMainReview
                  key={card.name}
                  {...card}
                  onClick={() =>
                    navigate(`/community/post/home-scent-${index + 1}`, {
                      state: {
                        post: {
                          profileName: card.name,
                          profileImage: card.profileImage,
                          time: "5분 전",
                          image: card.img,
                          mood: card.label,
                          title: card.title,
                          text: card.text,
                          keywords: card.keywords,
                        },
                      },
                    })
                  }
                  className="shrink-0"
                />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-[30px]">
            <div className="px-5">
              <TitleMain
                title="Challenge"
                sub="함께하는 챌린지로 꾸준함을 만들어요"
                onMore={() =>
                  navigate("/community", {
                    state: { communityTab: "챌린지" },
                  })
                }
              />
            </div>
            <div
              {...challengeDrag}
              className="flex cursor-grab touch-auto select-none gap-3 overflow-x-scroll overscroll-x-contain px-5 pb-1 [clip-path:inset(0_0_0_20px)] active:cursor-grabbing [scrollbar-width:none] [&_img]:pointer-events-none [&_img]:select-none [&::-webkit-scrollbar]:hidden"
            >
              {challengeCards.map((card, index) => (
                <CardChallengeSmall
                  key={card.title}
                  img={card.img}
                  imgClassName={
                    index === 2
                      ? "absolute left-[-9.71%] top-[-28.31%] h-[139.07%] w-[119.43%] max-w-none"
                      : "size-full object-cover"
                  }
                  title={card.title}
                  desc={card.desc}
                  onAction={() => {
                    const challengeReward = {
                      challengeId: card.id,
                      points: CHALLENGE_REWARDS[card.id],
                    };
                    if (index === 0) {
                      navigate("/community", {
                        state: {
                          communityTab: "리뷰",
                          challengeReward,
                        },
                      });
                    }
                    if (index === 1) {
                      navigate("/mypage/perfumes/new", {
                        state: { challengeReward },
                      });
                    }
                    if (index === 2) {
                      navigate("/community", {
                        state: {
                          communityTab: "향 추천",
                          challengeReward,
                        },
                      });
                    }
                  }}
                  className="shrink-0"
                  aria-label={`챌린지 ${index + 1}`}
                />
              ))}
            </div>
          </section>

          <section
            ref={magazineGuideRef}
            className={`flex flex-col gap-[30px] ${
              guideStep === 4 ? "relative z-[160]" : ""
            }`}
          >
            <div className="px-5">
              <TitleMain
                title="Magazine"
                sub="당신의 향을 이야기해요"
                onMore={() => navigate("/magazine")}
              />
            </div>
            <div
              {...magazineDrag}
              className="flex cursor-grab touch-auto select-none gap-3 overflow-x-scroll overscroll-x-contain px-5 pb-1 [clip-path:inset(0_0_0_20px)] active:cursor-grabbing [scrollbar-width:none] [&_img]:pointer-events-none [&_img]:select-none [&::-webkit-scrollbar]:hidden"
            >
              <CardMag
                img={magazine1}
                title="향수 지속력 높이는 꿀팁"
                desc={"보습된 피부에 뿌려야 향이 오래 머물러요"}
                onClick={() => navigate("/magazine/tip")}
                className="shrink-0"
              />
              <CardMag
                img={magazine2}
                title="BYREDO"
                desc="기억과 감정을 향으로 담아내는 브랜드"
                onClick={() => navigate("/magazine/byredo")}
                className="shrink-0"
              />
              <CardMag
                img={magazine3}
                imgClassName="absolute inset-0 size-full object-cover object-bottom"
                title="여름 밤에 어울리는 향"
                desc={"해가 진 뒤에 피어나는 관능적인 노트들\n열대야의 공기와 어울리는 향수를 소개합니다"}
                onClick={() => navigate("/magazine/summer-perfume")}
                className="shrink-0"
              />
            </div>
          </section>

          <section className="flex flex-col gap-[30px]">
            <div className="px-5">
              <TitleMain
                variant="title3"
                title="Today's Rank"
                sub="지금 가장 많은 사랑을 받는 향을 보여드려요"
              />
              <Category
                variant="tab"
                items={["전체", "선물", "여성", "20대", "30대", "남성"]}
                active={giftCategory}
                onChange={setGiftCategory}
                className="mt-5 overflow-x-auto [scrollbar-width:none]"
              />
            </div>
            <div
              {...rankDrag}
              className="flex cursor-grab touch-auto select-none gap-3 overflow-x-scroll overscroll-x-contain px-5 pb-1 [clip-path:inset(0_0_0_20px)] active:cursor-grabbing [scrollbar-width:none] [&_img]:pointer-events-none [&_img]:select-none [&::-webkit-scrollbar]:hidden"
            >
              {rankCards.map((card, index) => (
                <CardRank
                  key={`${giftCategory}-${card.id}`}
                  rank={`${index + 1}위`}
                  img={card.img}
                  name={card.name}
                  brand={card.brand}
                  imageFrameClassName="w-20"
                  imageClassName="size-full object-contain"
                  liked={isWishlisted(card.id)}
                  onLike={() => toggleWishlist(card.id)}
                  className="shrink-0"
                />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-[30px] px-5">
            <TitleMain
              title="Gift"
              actionVariant="ai"
              sub="AI 챗봇과 함께 그 사람에게 꼭 맞는 향수를 찾아요"
              onMore={() => navigate("/chatbot?intent=gift")}
            />
            <MainBanner
              img={giftImg}
              alt="향수 선물 추천"
              imgClassName="absolute left-[-3.94%] top-[-7.78%] h-[123.92%] w-[108.12%] max-w-none"
              onClick={() => navigate("/chatbot?intent=gift")}
            />
          </section>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[430px] px-5 pb-5">
        <BottomNav
          active={activeNav}
          onChange={(tab) => {
            setActiveNav(tab);
          }}
        />
      </div>
    </div>
  );
}
