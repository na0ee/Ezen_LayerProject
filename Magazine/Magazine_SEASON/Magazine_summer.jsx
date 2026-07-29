import { useLayoutEffect, useRef, useState } from "react";
import {
  Header,
  Img,
  TitleMag,
} from "../../src/components/common";

import springHero from "./assets/spring-hero.png";
import springPerfume1 from "./assets/spring-perfume-1.png";
import springPerfume2 from "./assets/spring-perfume-2.png";
import springPerfume3 from "./assets/spring-perfume-3.png";
import fallHero from "./assets/fall-hero.png";
import fallPerfume1 from "./assets/fall-perfume-1.png";
import fallPerfume2 from "./assets/fall-perfume-2.png";
import fallPerfume3 from "./assets/fall-perfume-3.png";
import summerHero from "./assets/summer-hero.png";
import summerPerfume1 from "./assets/summer-perfume-1.png";
import summerPerfume2 from "./assets/summer-perfume-2.png";
import summerPerfume3 from "./assets/summer-perfume-3.png";
import winterHero from "./assets/winter-hero.png";
import winterPerfume1 from "./assets/winter-perfume-1.png";
import winterPerfume2 from "./assets/winter-perfume-2.png";
import winterPerfume3 from "./assets/winter-perfume-3.png";

const SEASONS = [
  {
    id: "spring",
    hero: springHero,
    heroAlt: "봄꽃과 함께 놓인 봄 향수",
    heroClassName: "left-[-0.01%] top-[-0.45%] h-[100.46%]",
    sub: "Spring | 봄",
    heading: "부드럽고 화사한 플로럴 향",
    description:
      "따뜻한 날씨가 시작되는 봄에는 꽃이 피는 계절과 어울리는 가볍고 생기 있는 향이 잘 어울립니다. 은은한 플로럴 향과 싱그러운 그린 노트는 봄 특유의 화사하고 산뜻한 분위기를 더욱 돋보이게 해줍니다. 새로운 시작과 설렘이 가득한 계절인 만큼, 부드럽고 밝은 느낌의 향수가 특히 매력적으로 느껴집니다.",
    keywords: [
      "#피오니",
      "#체리블라썸",
      "#로즈",
      "#프리지아",
      "#화이트 머스크",
    ],
    perfumes: [
      {
        src: springPerfume1,
        alt: "조 말론 피오니 앤 블러쉬 스웨이드",
      },
      {
        src: springPerfume2,
        alt: "끌로에 오 드 퍼퓸",
      },
      {
        src: springPerfume3,
        alt: "미스 디올 블루밍 부케",
      },
    ],
  },
  {
    id: "summer",
    hero: summerHero,
    heroAlt: "레몬과 얼음 위에 놓인 여름 향수",
    heroClassName: "left-[-0.01%] top-[0.23%] h-[99.78%]",
    sub: "Summer | 여름",
    heading: "시원하고 청량한 시트러스 향",
    description:
      "더위가 시작되는 여름에는 가볍고 산뜻한 향이 잘 어울립니다. 시트러스와 마린 계열의 노트는 무더운 공기 속에서도 청량함을 유지해 줍니다. 땀과 열기에 향이 무거워지기 쉬운 계절인 만큼, 투명하고 깨끗한 느낌의 향수가 특히 매력적으로 느껴집니다.",
    keywords: ["#시트러스", "#마린", "#베르가못", "#아쿠아틱"],
    perfumes: [
      {
        src: summerPerfume1,
        alt: "조 말론 우드 세이지 앤 씨 솔트",
      },
      {
        src: summerPerfume2,
        alt: "아쿠아 디 파르마 미르토 디 파나레아",
      },
      {
        src: summerPerfume3,
        alt: "티파니 앤 코 러브 포 허",
      },
    ],
  },
  {
    id: "fall",
    hero: fallHero,
    heroAlt: "단풍과 니트 위에 놓인 가을 향수",
    heroClassName: "left-[-0.01%] top-0 h-[100.01%]",
    sub: "Autumn | 가을",
    heading: "포근하고 깊은 우디 향",
    description:
      "공기가 서늘해지는 가을에는 따뜻하고 깊이 있는 향이 잘 어울립니다. 우디와 스파이시 계열의 노트는 쌀쌀한 바람 속에서 은은하게 피어나 계절의 분위기를 더해 줍니다. 니트와 코트에 향이 배어드는 계절인 만큼, 잔향이 부드럽게 남는 향수가 특히 매력적으로 느껴집니다.",
    keywords: ["#우디", "#샌달우드", "#스파이시", "#앰버"],
    perfumes: [
      {
        src: fallPerfume1,
        alt: "르 라보 상탈 33",
      },
      {
        src: fallPerfume2,
        alt: "딥티크 탐 다오",
      },
      {
        src: fallPerfume3,
        alt: "바이레도 모하비 고스트",
      },
    ],
  },
  {
    id: "winter",
    hero: winterHero,
    heroAlt: "캔들과 포근한 천 위에 놓인 겨울 향수",
    heroClassName: "left-[-0.01%] top-0 h-[100.01%]",
    sub: "Winter | 겨울",
    heading: "달콤하고 묵직한 머스크 향",
    description:
      "추위가 깊어지는 겨울에는 포근하게 감싸주는 향이 잘 어울립니다. 머스크와 바닐라 계열의 노트는 차가운 공기 속에서 천천히 퍼지며 따뜻한 온기를 더해 줍니다. 향이 오래 머무는 계절인 만큼, 달콤하고 묵직한 잔향의 향수가 특히 매력적으로 느껴집니다.",
    keywords: ["#머스크", "#바닐라", "#통카빈", "#앰버우드"],
    perfumes: [
      {
        src: winterPerfume1,
        alt: "톰 포드 토바코 바닐",
      },
      {
        src: winterPerfume2,
        alt: "메종 마르지엘라 바이 더 파이어플레이스",
      },
      {
        src: winterPerfume3,
        alt: "르 라보 어나더 13",
      },
    ],
  },
];

export default function MagazineSummer({ onBack, initialSeason = 1 }) {
  const railRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialSeason);
  const [scrollProgress, setScrollProgress] = useState(
    (initialSeason + 1) / SEASONS.length,
  );
  const activeSeason = SEASONS[activeIndex];

  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollLeft = initialSeason * rail.clientWidth;
    setScrollProgress((initialSeason + 1) / SEASONS.length);
    setActiveIndex(initialSeason);
  }, [initialSeason]);

  const syncCarouselState = (rail) => {
    if (!rail.clientWidth) return;

    const maxScrollLeft = Math.max(0, rail.scrollWidth - rail.clientWidth);
    const safeScrollLeft = Math.max(
      0,
      Math.min(maxScrollLeft, rail.scrollLeft),
    );
    const nextIndex = Math.max(
      0,
      Math.min(
        SEASONS.length - 1,
        Math.round(safeScrollLeft / rail.clientWidth),
      ),
    );
    setActiveIndex((currentIndex) =>
      currentIndex === nextIndex ? currentIndex : nextIndex,
    );

    if (rail.scrollWidth) {
      const isAtLastSlide = maxScrollLeft - safeScrollLeft <= 1;
      const progress = isAtLastSlide
        ? 1
        : Math.max(
            1 / SEASONS.length,
            Math.min(
              1,
              (safeScrollLeft + rail.clientWidth) / rail.scrollWidth,
            ),
          );
      setScrollProgress(progress);
    }
  };

  const handleScroll = (event) => {
    syncCarouselState(event.currentTarget);
  };

  const handlePointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const rail = event.currentTarget;
    rail.dataset.dragStartX = String(event.clientX);
    rail.dataset.dragStartScroll = String(rail.scrollLeft);
    rail.dataset.dragging = "true";
    rail.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const rail = event.currentTarget;
    const isPrimaryButtonPressed = (event.buttons & 1) === 1;
    if (
      event.pointerType !== "mouse" ||
      !isPrimaryButtonPressed ||
      rail.dataset.dragging !== "true" ||
      !rail.dataset.dragStartX
    ) {
      return;
    }

    event.preventDefault();
    const distance = event.clientX - Number(rail.dataset.dragStartX);
    rail.scrollLeft = Number(rail.dataset.dragStartScroll) - distance;
  };

  const handlePointerEnd = (event) => {
    const rail = event.currentTarget;
    if (rail.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }

    delete rail.dataset.dragStartX;
    delete rail.dataset.dragStartScroll;
    delete rail.dataset.dragging;

    if (event.pointerType !== "mouse") return;

    const nextIndex = Math.max(
      0,
      Math.min(SEASONS.length - 1, Math.round(rail.scrollLeft / rail.clientWidth)),
    );
    rail.scrollTo({
      left: nextIndex * rail.clientWidth,
      behavior: "smooth",
    });
  };

  const handleScrollEnd = (event) => {
    const rail = event.currentTarget;
    if (!rail.clientWidth) return;

    const settledIndex = Math.max(
      0,
      Math.min(
        SEASONS.length - 1,
        Math.round(rail.scrollLeft / rail.clientWidth),
      ),
    );
    setActiveIndex(settledIndex);
    setScrollProgress((settledIndex + 1) / SEASONS.length);
  };

  const moveToSeason = (nextIndex) => {
    const rail = railRef.current;
    if (!rail) return;

    const safeIndex = Math.max(0, Math.min(SEASONS.length - 1, nextIndex));
    rail.scrollTo({
      left: safeIndex * rail.clientWidth,
      behavior: "smooth",
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveToSeason(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveToSeason(activeIndex + 1);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-x-hidden bg-background">
        <Header
          variant="detail-back"
          title="매거진"
          onBack={onBack}
          className="relative z-20 [&>div:first-child]:!gap-0 [&>div:first-child>button]:!size-[21px] [&>div:first-child>button>img]:!size-[21px]"
        />

        <main className="w-full pb-[max(40px,env(safe-area-inset-bottom))]">
          <div className="flex w-full flex-col gap-10">
            <section className="flex w-full flex-col items-center gap-3">
              <div
                className="h-0.5 w-[390px] overflow-hidden bg-light-grey"
                aria-label={`${activeIndex + 1}번째 계절 가이드`}
                aria-valuemax={SEASONS.length}
                aria-valuemin={1}
                aria-valuenow={activeIndex + 1}
                role="progressbar"
              >
                <div
                  className="h-0.5 w-full origin-left bg-offblack will-change-transform"
                  style={{ transform: `scaleX(${scrollProgress})` }}
                />
              </div>

              <div className="relative h-[440px] w-full overflow-hidden">
                <div
                  ref={railRef}
                  className="flex size-full cursor-grab touch-auto snap-x snap-mandatory select-none overflow-x-auto overflow-y-hidden overscroll-x-contain [-webkit-overflow-scrolling:touch] active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  onScroll={handleScroll}
                  onScrollEnd={handleScrollEnd}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerEnd}
                  onPointerCancel={handlePointerEnd}
                  onKeyDown={handleKeyDown}
                  aria-label="계절별 향수 가이드"
                  tabIndex={0}
                >
                  {SEASONS.map((season) => (
                    <div
                      key={season.id}
                      className="relative size-full shrink-0 snap-start snap-always overflow-hidden"
                    >
                      <img
                        src={season.hero}
                        alt={season.heroAlt}
                        draggable="false"
                        className={`pointer-events-none absolute w-full max-w-none ${season.heroClassName}`}
                      />
                    </div>
                  ))}
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-offblack/50" />
                <div className="pointer-events-none absolute inset-x-0 bottom-[30px] z-10 px-[22px]">
                  <TitleMag
                    variant="subtext"
                    tag="향수 상식"
                    title="계절별 향수 선택 가이드"
                    sub={activeSeason.sub}
                    className="!w-[386px] [&_button]:pointer-events-auto"
                  />
                </div>
              </div>
            </section>

            <section
              key={activeSeason.id}
              className="flex w-full flex-col gap-6"
              aria-live="polite"
            >
              <div className="flex w-full flex-col gap-6 px-5">
                <div className="flex w-full flex-col gap-2">
                  <h1 className="text-title-semibold-18 text-offblack">
                    {activeSeason.heading}
                  </h1>
                  <p className="text-subtitle-regular-16 text-offblack">
                    {activeSeason.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {activeSeason.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="shrink-0 text-center text-caption-regular-12 text-grey"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex h-[99px] w-full items-center overflow-hidden px-5">
                <div className="flex h-[101px] items-center gap-3">
                  {activeSeason.perfumes.map((perfume) => (
                    <Img
                      key={perfume.alt}
                      size="big"
                      color="grey"
                      src={perfume.src}
                      alt={perfume.alt}
                      className="!rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
