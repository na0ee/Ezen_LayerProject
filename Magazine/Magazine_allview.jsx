import { useState } from "react";
import {
  BottomNav,
  Category,
  Header,
  MiddleCard,
} from "../src/components/common";

import byredo from "./assets/allview/byredo.png";
import collection from "./assets/allview/collection.png";
import diptyque from "./assets/allview/diptyque.png";
import jomalone from "./assets/allview/jomalone.png";
import santalTip from "./assets/allview/santal-tip.png";
import seasons from "./assets/allview/seasons.png";
import nicheTrend from "./assets/hero-santal.png";

const CATEGORIES = ["전체", "향수 상식", "추천", "트렌드", "선물", "브랜드"];

const MAGAZINES = [
  {
    img: seasons,
    title: "계절별 향수 선택 가이드",
    desc: "봄부터 겨울까지,\n계절에 어울리는 노트 찾기",
    target: "season",
    categories: ["추천", "선물"],
  },
  {
    img: santalTip,
    title: "향수 지속력을 높이는 꿀팁",
    desc: "오래 기억되는\n향을 위한 작은 습관",
    target: "santalTip",
    categories: ["향수 상식"],
  },
  {
    img: collection,
    title: "New Fragrance Collection 2026",
    desc: "올해 가장 주목해야 할\n새로운 향수들",
    target: "fragranceCollection",
    categories: ["트렌드"],
  },
  {
    img: diptyque,
    title: "DIPTYQUE",
    desc: "예술과 여행이\n향으로 만나다",
    target: "diptyque",
    categories: ["브랜드"],
  },
  {
    img: jomalone,
    title: "JO MALONE LONDON",
    desc: "나만의 향을 완성하는\n레이어링의 시작",
    target: "jomalone",
    categories: ["브랜드", "선물"],
  },
  {
    img: byredo,
    title: "BYREDO",
    desc: "기억과 감정을 향으로\n담아내는 브랜드",
    target: "byredo",
    categories: ["브랜드"],
  },
  {
    img: nicheTrend,
    title: "니치향수 트렌드",
    desc: "향으로\n나를 표현하는 시대",
    target: "niche",
    categories: ["트렌드"],
    className:
      "[&>img]:!left-[-0.16%] [&>img]:!top-[-12.44%] [&>img]:!h-[125.25%] [&>img]:!w-full [&>img]:!max-w-none [&>img]:!object-fill",
  },
];

export default function MagazineAllView({
  onBack,
  onSeason,
  onSantalTip,
  onFragranceCollection,
  onDiptyque,
  onJomalone,
  onByredo,
  onNiche,
}) {
  const [category, setCategory] = useState("전체");
  const [likedMagazineTargets, setLikedMagazineTargets] = useState(() => new Set());

  const toggleMagazineLike = (target) => {
    setLikedMagazineTargets((currentTargets) => {
      const nextTargets = new Set(currentTargets);

      if (nextTargets.has(target)) {
        nextTargets.delete(target);
      } else {
        nextTargets.add(target);
      }

      return nextTargets;
    });
  };

  const magazineActions = {
    season: onSeason,
    santalTip: onSantalTip,
    fragranceCollection: onFragranceCollection,
    diptyque: onDiptyque,
    jomalone: onJomalone,
    byredo: onByredo,
    niche: onNiche,
  };
  const visibleMagazines =
    category === "전체"
      ? MAGAZINES
      : MAGAZINES.filter((magazine) =>
          magazine.categories.includes(category)
        );

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-x-hidden bg-background">
        <Header
          variant="detail-back"
          title="매거진"
          onBack={onBack}
          className="relative z-20 [&>div:first-child]:!gap-0 [&>div:first-child>button]:!size-[21px] [&>div:first-child>button>img]:!size-[21px]"
        />

        <main className="mx-auto mt-6 flex w-full flex-col items-center gap-[30px] px-5 pb-[120px]">
          <h1 className="w-full text-title-semibold-24 text-offblack">
            {category}
          </h1>

          <div className="flex w-full flex-col items-start gap-4">
            <div className="scroll-rail-page-gutter no-scrollbar -mx-5 w-[calc(100%+40px)] overflow-x-auto">
              <Category
                variant="tab"
                items={CATEGORIES}
                active={category}
                onChange={setCategory}
                className="w-max [&>button]:!leading-normal [&>button:not(.bg-offblack)]:!border-[0.8px]"
              />
            </div>

            <div className="grid w-full grid-cols-2 gap-[9px]">
              {visibleMagazines.map((magazine) => (
                <MiddleCard
                  key={`${magazine.title}-${magazine.img}`}
                  img={magazine.img}
                  title={magazine.title}
                  desc={magazine.desc}
                  liked={likedMagazineTargets.has(magazine.target)}
                  onLike={() => toggleMagazineLike(magazine.target)}
                  onClick={magazineActions[magazine.target]}
                  ariaLabel={`${magazine.title} 매거진 보기`}
                  className={`!h-auto !w-full aspect-[190/256] shrink-0 [&>div:last-child]:!w-[calc(100%_-_32px)] [&>div:nth-of-type(2)]:!p-3 ${magazine.className ?? ""}`}
                />
              ))}
            </div>
          </div>
        </main>

        <BottomNav
          active="magazine"
          className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
        />
      </div>
    </div>
  );
}
