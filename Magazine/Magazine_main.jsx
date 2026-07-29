import { useState } from "react";
import {
  BottomNav,
  BtnGo,
  CardMag,
  Category,
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

const EXPLORE_POSTS = [
  {
    img: exploreCollection,
    label: "Scent Match",
    title: "New Fragrance Collection 2026",
    desc: "올해 가장 주목해야 할 새로운 향수들",
    categories: ["추천", "트렌드"],
    target: "fragranceCollection",
  },
  {
    img: exploreSeasons,
    label: "Scent Match",
    title: "계절별 향수 선택 가이드",
    desc: "봄부터 겨울까지, 계절에 어울리는 노트 찾기",
    categories: ["향수 상식", "추천"],
    target: "season",
  },
  {
    img: exploreSummer,
    imgClassName: "absolute inset-0 size-full object-cover object-bottom",
    label: "Scent Match",
    title: "계절별 향수 선택 가이드",
    desc: "봄부터 겨울까지, 계절에 어울리는 노트 찾기",
    categories: ["향수 상식", "추천"],
    target: "summerPerfume",
  },
  {
    img: popularTip,
    label: "Scent Match",
    title: "향수 지속력 높이는 꿀팁",
    desc: "같은 향도 오래 남기는 사용법",
    categories: ["향수 상식"],
    target: "santalTip",
  },
  {
    img: heroSantal,
    imgClassName: "absolute inset-0 size-full object-cover object-[center_66.36%]",
    label: "Scent Match",
    title: "니치 향수 트렌드",
    desc: "향으로 나를 표현하는 시대",
    categories: ["트렌드"],
    target: "niche",
  },
  {
    img: popularJomalone,
    label: "Scent Match",
    title: "JO MALONE LONDON",
    desc: "나만의 향을 완성해가는 레이어링의 시작",
    categories: ["선물", "브랜드"],
    target: "jomalone",
  },
  {
    img: popularDiptyque,
    label: "Scent Match",
    title: "DIPTYQUE",
    desc: "예술과 여행이 향으로 만나다",
    categories: ["선물", "브랜드"],
    target: "diptyque",
  },
  {
    img: brandByredo,
    label: "Scent Match",
    title: "BYREDO",
    desc: "기억과 감정을 향으로 담아내는 브랜드",
    categories: ["브랜드"],
    target: "byredo",
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
  const exploreActions = {
    fragranceCollection: onFragranceCollection,
    season: onSeason,
    summerPerfume: onSummerPerfume,
    santalTip: onSantalTip,
    niche: onNiche,
    jomalone: onJomalone,
    diptyque: onDiptyque,
    byredo: onByredo,
  };
  const visibleExplorePosts =
    category === "전체"
      ? EXPLORE_POSTS
      : EXPLORE_POSTS.filter((post) => post.categories.includes(category));

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
            <div
              className="relative h-[214px] w-full cursor-pointer"
              onClick={onNiche}
              aria-label="니치 향수 트렌드 읽기"
            >
              <MainBanner
                img={heroSantal}
                imgClassName="absolute left-[-0.07%] top-[-151.83%] h-[324.65%] w-full max-w-none"
              />
              <p className="absolute left-5 top-5 font-en text-en-semibold-16 tracking-[-0.02em] text-offwhite">
                Perfume Trend
              </p>
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <h3 className="text-title-semibold-18 text-offwhite">
                  니치 향수 트랜드
                </h3>
                <BtnGo
                  variant="raffle"
                  onClick={(event) => {
                    event.stopPropagation();
                    onNiche?.();
                  }}
                  className="!border-0 !bg-offblack/20 !shadow-none !backdrop-blur-none [&>span]:!text-body-regular-14"
                >
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
                  {visibleExplorePosts.map((post) => (
                    <button
                      key={post.target}
                      type="button"
                      onClick={exploreActions[post.target]}
                      className="block shrink-0 text-left"
                      aria-label={`${post.title} 보기`}
                    >
                      <MagListCard
                        img={post.img}
                        imgClassName={post.imgClassName}
                        label={post.label}
                        title={post.title}
                        desc={post.desc}
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
