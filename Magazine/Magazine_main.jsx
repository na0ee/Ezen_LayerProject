import { useState } from "react";
import {
  BottomNav,
  BtnGo,
  CardMag,
  Category,
  Header,
  MagListCard,
  MainBanner,
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

const CATEGORIES = ["전체", "향수 상식", "추천", "트렌드", "선물", "브랜드"];

export default function MagazineMain({
  onAllView,
  onByredo,
  onNiche,
  onJomalone,
  onDiptyque,
  onFragranceCollection,
  onSeason,
  onSantalTip,
  onNavigate,
}) {
  const [category, setCategory] = useState("전체");

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
        <div
          className="h-[max(16px,env(safe-area-inset-top))] w-full bg-offwhite"
          aria-hidden="true"
        />

        <Header
          variant="detail"
          title="매거진"
          className="relative z-20"
        />

        <main className="mt-6 flex w-full flex-col gap-[60px] pb-[120px]">
          <section
            className="flex h-[236px] flex-col gap-[30px] px-5"
            aria-labelledby="trend-heading"
          >
            <TitleSection
              title="향수 트렌드"
              className="h-[29px] leading-[29px]"
            />
            <div
              className="relative h-[177px] w-full cursor-pointer"
              onClick={onNiche}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") onNiche?.();
              }}
              role="button"
              tabIndex={0}
              aria-label="니치 향수 트렌드 읽기"
            >
              <MainBanner
                img={heroSantal}
                imgClassName="size-full object-cover object-[center_66.36%]"
                className="!h-[177px] !rounded-lg"
              />
              <div className="absolute bottom-3 left-3 flex flex-col items-start gap-2.5 text-offwhite">
                <h3 className="text-title-semibold-18">니치 향수 트렌드</h3>
                <BtnGo
                  variant="more2"
                  onClick={(event) => {
                    event.stopPropagation();
                    onNiche?.();
                  }}
                  className="[&_img]:brightness-0 [&_img]:invert [&>span>span]:!text-caption-medium-12 [&>span>span]:!text-offwhite"
                >
                  지금 읽어보기
                </BtnGo>
              </div>
            </div>
          </section>

          <section className="h-[395px]" aria-labelledby="popular-heading">
            <TitleSection
              title="많이 읽은 글"
              className="ml-5 h-[29px] leading-[29px]"
            />
            <div
              className="mt-[30px] w-full cursor-grab select-none overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] active:cursor-grabbing [scrollbar-width:none] [&_img]:pointer-events-none [&::-webkit-scrollbar]:hidden"
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
              </div>
            </div>
          </section>

          <section className="h-[511px]" aria-labelledby="brand-heading">
            <TitleSection
              title="브랜드 스토리"
              className="ml-5 h-[29px] leading-[29px]"
            />
            <div
              className="mt-[30px] w-full cursor-grab select-none overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] active:cursor-grabbing [scrollbar-width:none] [&_img]:pointer-events-none [&::-webkit-scrollbar]:hidden"
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
                    imgClassName="absolute inset-0 size-full max-w-none"
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
                    imgClassName="absolute inset-0 size-full max-w-none"
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
            <div className="mx-5 flex h-[29px] w-[390px] items-center justify-between overflow-hidden">
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
                className="cursor-grab select-none overflow-x-auto overflow-y-hidden px-5 [-webkit-overflow-scrolling:touch] active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                {...dragRailProps}
              >
                <Category
                  variant="tab"
                  items={CATEGORIES}
                  active={category}
                  onChange={setCategory}
                  className="w-max !gap-2.5 [&>button]:!h-[31px] [&>button]:!border-[0.8px] [&>button]:!leading-normal"
                />
              </div>
              <div
                className="mt-4 w-full cursor-grab select-none overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] active:cursor-grabbing [scrollbar-width:none] [&_img]:pointer-events-none [&::-webkit-scrollbar]:hidden"
                {...dragRailProps}
              >
                <div className="flex w-max gap-4 px-5">
                  <button
                    type="button"
                    onClick={onFragranceCollection}
                    className="block shrink-0 text-left"
                    aria-label="New Fragrance Collection 2026 보기"
                  >
                    <MagListCard
                      img={exploreCollection}
                      label="Scent Match"
                      title="New Fragrance Collection 2026"
                      desc="올해 가장 주목해야 할 새로운 향수들"
                      className="shrink-0"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={onSeason}
                    className="block shrink-0 text-left"
                    aria-label="계절별 향수 선택 가이드 보기"
                  >
                    <MagListCard
                      img={exploreSeasons}
                      label="Scent Match"
                      title="계절별 향수 선택 가이드"
                      desc="봄부터 겨울까지, 계절에 어울리는 노트 찾기"
                      className="shrink-0"
                    />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <BottomNav
          active="magazine"
          onChange={onNavigate}
          className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 [&>div]:!w-[390px] [&>div]:!gap-[5px] [&>div>button]:!size-[72px] [&>div>div]:!h-[72px] [&>div>div]:!w-[313px] [&>div>div]:!flex-none [&>div>div>span]:!h-14 [&>div>div>span]:!w-[79px]"
        />
      </div>
    </div>
  );
}
