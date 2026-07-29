import { useState } from "react";
import {
  BottomNav,
  Header,
  Heart,
  MagazineCard,
  TagMag,
} from "../src/components/common";

import byredo from "./assets/fragrance-collection/byredo.png";
import dior from "./assets/fragrance-collection/dior.png";
import heroCollection from "./assets/fragrance-collection/hero.png";
import margiela from "./assets/fragrance-collection/margiela.png";
import milky from "./assets/fragrance-collection/milky.png";

const COLLECTIONS = [
  {
    img: dior,
    tag: "Dior",
    title: "Paradise",
    desc: "프랑스 리비에라의 휴양지의 분위기를 담았습니다. 만다린의 상큼함과 아몬드, 통카빈의 부드러운 달콤함이 어우러져 여름 휴가를 떠올리게 하는 향으로 주목받고 있습니다.",
  },
  {
    img: margiela,
    tag: "Maison Margiela",
    title: "Replica Chasing Sunsets",
    desc: "노을이 지는 해변의 순간을 표현한 향수로, 망고와 플로럴 노트, 샌달우드가 조화를 이룹니다. 과일의 생동감과 따뜻한 여름 저녁의 분위기를 동시에 느낄 수 있는 것이 특징입니다.",
    className: "[&>div:last-child>div>p]:!tracking-[-0.07em]",
  },
  {
    img: byredo,
    tag: "BYREDO",
    title: "Alto Astral",
    desc: "코코넛과 앰버를 중심으로 한 부드럽고 따뜻한 향으로, 올해 주목받고 있는 스킨센트 트렌드를 반영한 컬렉션입니다. 피부에 자연스럽게 스며드는 듯한 은은한 분위기가 특징입니다.",
    className:
      "[&>img]:!left-[-7.66%] [&>img]:!top-[-20.27%] [&>img]:!h-[120.24%] [&>img]:!w-[115.65%] [&>img]:!max-w-none",
  },
  {
    img: milky,
    tag: "Trend",
    title: "Milky Gourmand",
    desc: "2026년에는 바닐라, 라이스, 밀크 노트를 활용한 밀키 구르망 향수가 큰 인기를 얻고 있습니다. 달콤하면서도 포근한 분위기를 연출해 사계절 데일리 향수로 주목받고 있습니다.",
    className: "[&>div:last-child>div>p]:!text-body-semibold-16",
  },
];

const CARD_TEXT_CLASS =
  "[&>div:last-child>div>p]:!text-title-semibold-18 [&>div:last-child>p]:!text-caption-regular-12 [&>div:last-child>p]:!leading-[1.4] [&>div:last-child>p]:!tracking-[-0.05em]";

export default function MagazineFragranceCollection({ onBack }) {
  const [liked, setLiked] = useState(false);

  const handleRailPointerDown = (event) => {
    const rail = event.currentTarget;
    rail.dataset.dragging = "false";
    if (event.pointerType !== "mouse") return;

    rail.dataset.dragStartX = String(event.clientX);
    rail.dataset.dragStartScroll = String(rail.scrollLeft);
  };

  const handleRailPointerMove = (event) => {
    const rail = event.currentTarget;
    if (event.pointerType !== "mouse" || !rail.dataset.dragStartX) return;

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

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-x-hidden bg-background">
        <Header
          variant="detail-back"
          title="매거진"
          onBack={onBack}
          className="relative z-20 [&>div:first-child]:!gap-0 [&>div:first-child>button]:!size-[21px] [&>div:first-child>button>img]:!size-[21px]"
        />

        <main className="mt-6 w-full pb-[120px]">
          <section className="mx-auto flex w-[390px] flex-col gap-[30px]">
            <div className="flex w-full flex-col gap-2.5">
              <TagMag className="!bg-offblack">향수 트렌드</TagMag>
              <div className="flex w-full items-center justify-between">
                <h1 className="text-title-semibold-24 text-offblack">
                  New Fragrance Collection 2026
                </h1>
                <Heart
                  variant={liked ? "abled" : "grey3"}
                  onClick={() => setLiked((current) => !current)}
                />
              </div>
            </div>

            <div className="flex w-full flex-col items-center gap-10">
              <img
                src={heroCollection}
                alt="2026년 주목할 향수 컬렉션"
                className="h-[220px] w-[430px] max-w-none object-cover"
              />
              <div className="flex w-full flex-col gap-2 text-offblack">
                <h2 className="text-title-semibold-18">
                  올해 가장 주목해야 할 새로운 향수들
                </h2>
                <p className="text-subtitle-regular-16">
                  2026년 향수 시장은 여행의 감성을 담은 향, 부드러운 스킨센트,
                  그리고 달콤한 밀키 구르망 계열이 새로운 트렌드로 떠오르고
                  있습니다. 개성을 중시하는 소비 트렌드와 함께, 향수 역시
                  단순한 향기가 아닌 하나의 라이프스타일로 확장되고 있습니다.
                </p>
              </div>
            </div>
          </section>

          <div
            className="mt-10 w-full cursor-grab touch-auto select-none overflow-x-auto overflow-y-hidden px-5 [-webkit-overflow-scrolling:touch] active:cursor-grabbing [scrollbar-width:none] [&_img]:pointer-events-none [&::-webkit-scrollbar]:hidden"
            onPointerDown={handleRailPointerDown}
            onPointerMove={handleRailPointerMove}
            onPointerUp={handleRailPointerEnd}
            onPointerCancel={handleRailPointerEnd}
          >
            <div className="flex w-max gap-4">
              {COLLECTIONS.map((collection) => (
                <MagazineCard
                  key={collection.title}
                  img={collection.img}
                  tag={collection.tag}
                  title={collection.title}
                  desc={collection.desc}
                  className={`shrink-0 ${CARD_TEXT_CLASS} ${collection.className ?? ""}`}
                />
              ))}
            </div>
          </div>
        </main>

        <BottomNav
          active="magazine"
          className="fixed bottom-5 left-1/2 z-50 !w-[390px] -translate-x-1/2"
        />
      </div>
    </div>
  );
}
