import { useEffect, useState } from "react";
import {
  BottomNav,
  BtnGo,
  CardMag,
  Category,
  FeatureGuideCard,
  Header,
  MagListCard,
  PopularTextCard,
  TitleSection,
} from "../src/components/common";

import brandByredo from "./assets/brand-byredo.png";
import exploreCollection from "./assets/explore-collection.png";
import exploreSeasons from "./assets/explore-seasons.png";
import heroSantal from "./assets/hero-santal.png";
import popularDiptyque from "./assets/popular-diptyque.png";
import popularJomalone from "./assets/popular-jomalone.png";
import popularTip from "./assets/popular-tip.png";
import exploreSummer from "./assets/summer-perfume-detail/hero.png";
import trendBanner from "./assets/trend-banner-figma.png";
import trendChevronRight from "./assets/trend-chevron-right.svg";

const CATEGORIES = ["전체", "향수 상식", "추천", "트렌드", "선물", "브랜드"];

const EXPLORE_ARTICLES = [
  {
    categories: ["트렌드"],
    img: exploreCollection,
    label: "Scent Trend",
    title: "New Fragrance Collection 2026",
    desc: "올해 가장 주목해야 할 새로운 향수들",
    target: "fragranceCollection",
  },
  {
    categories: ["추천", "선물"],
    img: exploreSeasons,
    label: "Scent Match",
    title: "계절별 향수 선택 가이드",
    desc: "봄부터 겨울까지, 계절에 어울리는 노트 찾기",
    target: "season",
  },
  {
    categories: ["향수 상식"],
    img: popularTip,
    label: "Scent Guide",
    title: "향수 지속력 높이는 꿀팁",
    desc: "같은 향도 더 오래 남기는 올바른 사용법",
    target: "santalTip",
  },
  {
    categories: ["트렌드"],
    img: heroSantal,
    label: "Scent Trend",
    title: "니치 향수 트렌드",
    desc: "향으로 나를 표현하는 시대",
    target: "niche",
  },
  {
    categories: ["브랜드"],
    img: brandByredo,
    label: "Brand Story",
    title: "BYREDO",
    desc: "기억과 감정을 향으로 담아내는 브랜드",
    target: "byredo",
  },
  {
    categories: ["브랜드", "선물"],
    img: popularJomalone,
    label: "Brand Story",
    title: "JO MALONE LONDON",
    desc: "나만의 향을 완성해가는 레이어링의 시작",
    target: "jomalone",
  },
  {
    categories: ["브랜드"],
    img: popularDiptyque,
    label: "Brand Story",
    title: "DIPTYQUE",
    desc: "예술과 여행이 향으로 만나다",
    target: "diptyque",
  },
  {
    categories: ["추천", "선물"],
    img: exploreSummer,
    imgClassName: "absolute inset-0 size-full object-cover object-bottom",
    label: "Scent Match",
    title: "여름 밤에 어울리는 향",
    desc: "열대야의 공기와 어울리는 관능적인 노트",
    target: "summerPerfume",
  },
];

export default function MagazineMain({
  onAllView,
  onByredo,
  onNiche,
  onJomalone,
  onDiptyque,
  onFragranceCollection,
  onSeason,
  onSummerPerfume,
  onSantalTip,
  onNavigate,
}) {
  const [category, setCategory] = useState("전체");
  const [isGuideOpen, setIsGuideOpen] = useState(
    () => document.documentElement.dataset.guideEnabled !== "false",
  );
  const articleActions = {
    fragranceCollection: onFragranceCollection,
    season: onSeason,
    santalTip: onSantalTip,
    niche: onNiche,
    byredo: onByredo,
    jomalone: onJomalone,
    diptyque: onDiptyque,
    summerPerfume: onSummerPerfume,
  };
  const visibleArticles =
    category === "전체"
      ? EXPLORE_ARTICLES
      : EXPLORE_ARTICLES.filter((article) =>
          article.categories.includes(category)
        );

  useEffect(() => {
    const handleGuideChange = (event) => {
      setIsGuideOpen(Boolean(event.detail));
    };

    window.addEventListener("layer:guide-change", handleGuideChange);
    return () =>
      window.removeEventListener("layer:guide-change", handleGuideChange);
  }, []);

  useEffect(() => {
    if (!isGuideOpen) return undefined;

    const dismissGuide = (event) => {
      const target = event.target;
      if (
        !(target instanceof Element) ||
        !target.closest(".desktop-app, [data-bottom-nav]")
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      setIsGuideOpen(false);
    };

    document.addEventListener("click", dismissGuide, true);
    return () => document.removeEventListener("click", dismissGuide, true);
  }, [isGuideOpen]);

  const handleRailPointerDown = (event) => {
    const rail = event.currentTarget;
    rail.dataset.dragging = "false";
    if (event.pointerType !== "mouse") return;

    rail.dataset.dragStartX = String(event.clientX);
    rail.dataset.dragStartScroll = String(rail.scrollLeft);
  };

  const handleRailPointerMove = (event) => {
    const rail = event.currentTarget;
    if (event.pointerType !== "mouse" || !rail.dataset.dragStartX) {
      return;
    }

    const distance = event.clientX - Number(rail.dataset.dragStartX);
    if (Math.abs(distance) > 3) {
      rail.dataset.dragging = "true";
      if (!rail.hasPointerCapture(event.pointerId)) {
        rail.setPointerCapture(event.pointerId);
      }
    }
    rail.scrollLeft = Number(rail.dataset.dragStartScroll) - distance;
  };

  const handleRailPointerEnd = (event) => {
    const rail = event.currentTarget;
    if (rail.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }
    delete rail.dataset.dragStartX;
    delete rail.dataset.dragStartScroll;
  };

  const handleRailClick = (event) => {
    if (event.currentTarget.dataset.dragging !== "true") return;

    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.dataset.dragging = "false";
  };

  const dragRailProps = {
    onPointerDown: handleRailPointerDown,
    onPointerMove: handleRailPointerMove,
    onPointerUp: handleRailPointerEnd,
    onPointerCancel: handleRailPointerEnd,
    onClickCapture: handleRailClick,
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-2light-grey">
      {isGuideOpen && (
        <>
          <div className="feature-guide-overlay pointer-events-none fixed inset-0 z-[150] bg-black/55" />
          <div className="pointer-events-none fixed left-1/2 top-1/2 z-[170] -translate-x-1/2 -translate-y-1/2">
            <FeatureGuideCard size="compact" characterPosition="left">
              향수 트렌드부터 브랜드 이야기,
              <br />
              취향에 맞는 추천 콘텐츠까지 만나보세요!
            </FeatureGuideCard>
          </div>
        </>
      )}
      <div className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-x-hidden bg-2light-grey">
        <Header
          variant="detail"
          title="매거진"
          className="relative z-20"
        />

        <main className="mt-6 flex w-full flex-col gap-[60px] pb-[120px]">
          <section
            className="flex h-[273px] flex-col gap-[30px] px-5"
            aria-labelledby="trend-heading"
          >
            <TitleSection
              title="향수 트렌드"
              className="h-[29px] leading-[29px]"
            />
            <button
              type="button"
              className="relative flex h-[214px] w-full cursor-pointer flex-col items-start justify-between overflow-hidden rounded-2xl p-5 text-left"
              onClick={onNiche}
              aria-label="니치 향수 트렌드 읽기"
            >
              <img
                src={trendBanner}
                alt=""
                className="pointer-events-none absolute left-[-0.07%] top-[-151.83%] h-[324.65%] w-full max-w-none"
              />
              <span className="relative font-en text-en-semibold-16 tracking-[-0.02em] text-offwhite">
                Perfume Trend
              </span>

              <span className="relative flex w-full items-end justify-between">
                <span className="text-title-semibold-18 tracking-[-0.02em] text-offwhite">
                  니치 향수 트랜드
                </span>
                <span className="glass-surface-dark flex items-center gap-1.5 rounded-full py-2 pl-4 pr-2.5 text-body-regular-14 tracking-[-0.02em] text-offwhite">
                  지금 읽어보기
                  <img
                    src={trendChevronRight}
                    alt=""
                    className="size-[18px] shrink-0"
                  />
                </span>
              </span>
            </button>
          </section>

          <section className="h-[395px]" aria-labelledby="popular-heading">
            <TitleSection
              title="많이 읽은 글"
              className="ml-5 h-[29px] leading-[29px]"
            />
            <div
              className="mt-[30px] w-full cursor-grab touch-auto select-none overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] active:cursor-grabbing [scrollbar-width:none] [&_img]:pointer-events-none [&::-webkit-scrollbar]:hidden"
              {...dragRailProps}
            >
              <div className="flex w-max gap-2.5 px-5">
                <button
                  type="button"
                  onClick={onSantalTip}
                  className="block shrink-0 text-left"
                  aria-label="향수 지속력을 높이는 꿀팁 보기"
                >
                  <PopularTextCard
                    variant="tip"
                    img={popularTip}
                    imgAlt="확대경 아래 놓인 상탈 33 향수"
                    title="향수 지속력 높이는 꿀팁"
                    desc="같은 향도 오래 남기는 사용법"
                  />
                </button>
                <button
                  type="button"
                  onClick={onByredo}
                  className="block shrink-0 text-left"
                  aria-label="BYREDO 브랜드 스토리 보기"
                >
                  <PopularTextCard
                    variant="byredo"
                    img={brandByredo}
                    imgAlt="과일 사이에 놓인 바이레도 향수"
                    title="BYREDO"
                    desc="기억과 감정을 향으로 담아내는 브랜드"
                  />
                </button>
                <button
                  type="button"
                  onClick={onJomalone}
                  className="block shrink-0 text-left"
                  aria-label="JO MALONE LONDON 브랜드 스토리 보기"
                >
                  <PopularTextCard
                    variant="jomalone"
                    img={popularJomalone}
                    imgAlt="꽃과 과일 사이에 놓인 조 말론 향수"
                    title="JO MALONE LONDON"
                    desc="나만의 향을 완성해가는 레이어링의 시작"
                  />
                </button>
              </div>
            </div>
          </section>

          <section className="h-[511px]" aria-labelledby="brand-heading">
            <TitleSection
              title="브랜드 스토리"
              className="ml-5 h-[29px] leading-[29px]"
            />
            <div
              className="mt-[30px] w-full cursor-grab touch-auto select-none overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] active:cursor-grabbing [scrollbar-width:none] [&_img]:pointer-events-none [&::-webkit-scrollbar]:hidden"
              {...dragRailProps}
            >
              <div className="flex w-max gap-4 px-5">
                <button
                  type="button"
                  onClick={onJomalone}
                  className="block shrink-0 text-left"
                  aria-label="JO MALONE LONDON 브랜드 스토리 보기"
                >
                  <CardMag
                    img={popularJomalone}
                    imgClassName="absolute left-[0.03%] top-[0.01%] h-[100.12%] w-full max-w-none"
                    title="JO MALONE LONDON"
                    desc="나만의 향을 완성해가는 레이어링의 시작"
                    className="shrink-0"
                  />
                </button>
                <button
                  type="button"
                  onClick={onDiptyque}
                  className="block shrink-0 text-left"
                  aria-label="DIPTYQUE 브랜드 스토리 보기"
                >
                  <CardMag
                    img={popularDiptyque}
                    imgClassName="absolute left-[-0.13%] top-[0.13%] h-[99.79%] w-full max-w-none"
                    title="DIPTYQUE"
                    desc="예술과 여행이 향으로 만나다"
                    className="shrink-0"
                  />
                </button>
                <button
                  type="button"
                  onClick={onByredo}
                  className="block shrink-0 text-left"
                  aria-label="BYREDO 브랜드 스토리 보기"
                >
                  <CardMag
                    img={brandByredo}
                    title="BYREDO"
                    desc={"기억과 감정을 향으로 표현하는 스웨덴 니치 브랜드\n미니멀한 디자인과 스토리텔링으로 니치 시장 대표로 성장"}
                    imgClassName="absolute left-[-16.9%] top-[-19.24%] h-[119.27%] w-[133.88%] max-w-none"
                    className="shrink-0 [&>div]:!rounded-2xl"
                  />
                </button>
              </div>
            </div>
          </section>

          <section
            className="h-[395px]"
            id="magazine-list"
            aria-labelledby="explore-heading"
          >
            <div className="mx-5 flex h-[29px] items-center justify-between overflow-hidden">
              <TitleSection
                title="더 둘러보기"
                className="h-[29px] leading-[29px]"
              />
              <BtnGo
                variant="more"
                onClick={onAllView}
                className="[&>span>span]:!text-caption-medium-12"
              />
            </div>

            <div className="mt-[30px]">
              <div
                className="cursor-grab touch-auto select-none overflow-x-auto overflow-y-hidden px-5 [-webkit-overflow-scrolling:touch] active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                {...dragRailProps}
              >
                <Category
                  variant="tab"
                  items={CATEGORIES}
                  active={category}
                  onChange={setCategory}
                  className="w-max [&>button]:!border-[0.8px] [&>button]:!leading-normal"
                />
              </div>
              <div
                className="mt-4 w-full cursor-grab touch-auto select-none overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] active:cursor-grabbing [scrollbar-width:none] [&_img]:pointer-events-none [&::-webkit-scrollbar]:hidden"
                {...dragRailProps}
              >
                <div className="flex w-max gap-4 px-5">
                  {visibleArticles.map((article) => (
                    <button
                      key={article.target}
                      type="button"
                      onClick={articleActions[article.target]}
                      className="block shrink-0 text-left"
                      aria-label={`${article.title} 보기`}
                    >
                      <MagListCard
                        img={article.img}
                        imgClassName={article.imgClassName}
                        label={article.label}
                        title={article.title}
                        desc={article.desc}
                        className="shrink-0"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <BottomNav
          active="magazine"
          onChange={onNavigate}
          className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
        />
      </div>
    </div>
  );
}
