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
import brandSantal from "./assets/brand-santal.png";
import exploreCollection from "./assets/explore-collection.png";
import exploreSeasons from "./assets/explore-seasons.png";
import heroSantal from "./assets/hero-santal.png";
import popularDiptyqueBase from "./assets/popular-diptyque-base.png";
import popularDiptyque from "./assets/popular-diptyque.png";
import popularJomaloneBase from "./assets/popular-jomalone-base.png";
import popularJomalone from "./assets/popular-jomalone.png";
import batteryEnd from "./assets/status-battery-end.svg";
import batteryFill from "./assets/status-battery-fill.svg";
import batteryOutline from "./assets/status-battery-outline.svg";
import mobileSignal from "./assets/status-signal.svg";
import wifiIcon from "./assets/status-wifi.svg";

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
    <div className="min-h-screen bg-2light-grey">
      <div className="relative mx-auto h-[1952px] w-full max-w-[430px] overflow-hidden bg-2light-grey">
        <div
          className="absolute inset-x-0 top-0 z-20 flex h-[64.555px] items-end bg-offwhite"
          aria-label="상태 표시줄"
        >
          <div className="flex h-full min-w-0 flex-1 items-center justify-center pb-[3.282px] pl-[10.941px]">
            <p className="h-[22.977px] w-[59.084px] text-center font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text',sans-serif] text-[17.51px] leading-[22.977px] font-semibold tracking-[-0.32px]">
              9:41
            </p>
          </div>
          <div className="flex h-full w-[136.768px] shrink-0 items-center justify-center">
            <span className="h-[40.483px] w-[136.768px] rounded-[100px] bg-offblack" />
          </div>
          <div className="flex h-full min-w-0 flex-1 items-center justify-center pr-[12.036px]">
            <div className="flex items-start gap-[8.753px]" aria-hidden="true">
              <img
                src={mobileSignal}
                alt=""
                className="h-[13.13px] w-[19.695px]"
              />
              <img
                src={wifiIcon}
                alt=""
                className="h-[12.948px] w-[18.601px]"
              />
              <span className="relative h-[14.224px] w-[29.981px]">
                <img
                  src={batteryOutline}
                  alt=""
                  className="absolute inset-y-0 left-0 h-[14.224px] w-[27.351px]"
                />
                <img
                  src={batteryEnd}
                  alt=""
                  className="absolute right-0 top-[4.803px] h-[4.618px] w-[1.533px]"
                />
                <img
                  src={batteryFill}
                  alt=""
                  className="absolute left-[2.19px] top-[2.188px] h-[9.847px] w-[22.971px]"
                />
              </span>
            </div>
          </div>
        </div>

        <Header
          variant="detail"
          title="매거진"
          className="absolute left-0 top-[65px] z-20"
        />

        <main className="absolute left-0 top-[143px] flex w-full flex-col gap-[60px]">
          <section className="relative h-[217px]" aria-labelledby="trend-heading">
            <TitleSection
              title="향수 트렌드"
              className="absolute left-5 top-0 h-[29px] leading-[29px]"
            />
            <div
              className="absolute left-5 top-10 h-[177px] w-[390px] cursor-pointer"
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
                className="!h-[177px] !rounded-lg [&>img]:object-[center_66.36%]"
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
                  onClick={onJomalone}
                  className="block shrink-0 text-left"
                  aria-label="JO MALONE LONDON 브랜드 스토리 보기"
                >
                  <PopularTextCard
                    variant="jomalone"
                    baseImg={popularJomaloneBase}
                    img={popularJomalone}
                    imgAlt="꽃과 과일 사이에 놓인 조 말론 향수"
                    title="JOMALONE LONDON"
                    desc="나만의 향을 완성해가는 레이어링의 시작"
                  />
                </button>
                <button
                  type="button"
                  onClick={onDiptyque}
                  className="block shrink-0 text-left"
                  aria-label="DIPTYQUE 브랜드 스토리 보기"
                >
                  <PopularTextCard
                    variant="diptyque"
                    baseImg={popularDiptyqueBase}
                    img={popularDiptyque}
                    imgAlt="모자이크 배경 위에 놓인 딥티크 향수"
                    title="DIPTYQUE"
                    desc="예술과 여행이 향으로 만나다"
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
                  onClick={onSantalTip}
                  className="block shrink-0 text-left"
                  aria-label="향수 지속력을 높이는 꿀팁 보기"
                >
                  <CardMag
                    img={brandSantal}
                    title="향수 지속력 높이는 꿀팁"
                    desc={"보습된 피부에 뿌려야 향이 오래 머물러요\n맥박 뛰는 손목·귀 뒤에 문지르지 말고 그대로 두기"}
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
                    className="shrink-0 [&>div]:!rounded-2xl [&>img]:!left-[-16.89%] [&>img]:!top-[-11.95%] [&>img]:!h-[111.97%] [&>img]:!w-[133.88%] [&>img]:!max-w-none"
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
          className="fixed bottom-5 left-1/2 z-50 !w-[390px] -translate-x-1/2 !gap-[5px] [&>button]:!size-[72px] [&>div]:!h-[72px] [&>div]:!w-[313px] [&>div]:!flex-none [&>div>div]:!px-0 [&>div>div>button]:!h-14"
        />
      </div>
    </div>
  );
}
