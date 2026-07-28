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
  },
  {
    img: santalTip,
    title: "향수 지속력을 높이는 꿀팁",
    desc: "오래 기억되는\n향을 위한 작은 습관",
    target: "santalTip",
  },
  {
    img: collection,
    title: "New Fragrance Collection 2026",
    desc: "올해 가장 주목해야 할\n새로운 향수들",
    target: "fragranceCollection",
  },
  {
    img: diptyque,
    title: "DIPTYQUE",
    desc: "예술과 여행이\n향으로 만나다",
    target: "diptyque",
  },
  {
    img: jomalone,
    title: "JO MALONE LONDON",
    desc: "나만의 향을 완성하는\n레이어링의 시작",
    target: "jomalone",
  },
  {
    img: byredo,
    title: "BYREDO",
    desc: "기억과 감정을 향으로\n담아내는 브랜드",
    target: "byredo",
  },
  {
    img: nicheTrend,
    title: "니치향수 트렌드",
    desc: "향으로\n나를 표현하는 시대",
    target: "niche",
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
  const magazineActions = {
    season: onSeason,
    santalTip: onSantalTip,
    fragranceCollection: onFragranceCollection,
    diptyque: onDiptyque,
    jomalone: onJomalone,
    byredo: onByredo,
    niche: onNiche,
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-x-hidden bg-background">
        <div
          className="h-[max(16px,env(safe-area-inset-top))] w-full bg-offwhite"
          aria-hidden="true"
        />

        <Header
          variant="detail-back"
          title="매거진"
          onBack={onBack}
          className="relative z-20 [&>div:first-child]:!gap-0 [&>div:first-child>button]:!size-[21px] [&>div:first-child>button>img]:!size-[21px]"
        />

        <main className="mx-auto mt-6 flex w-[390px] flex-col items-center gap-[30px] pb-[120px]">
          <h1 className="w-[390px] text-title-semibold-24 text-offblack">
            전체
          </h1>

          <div className="flex w-[388px] flex-col items-start gap-4">
            <Category
              variant="tab"
              items={CATEGORIES}
              active={category}
              onChange={setCategory}
              className="w-max !gap-2.5 [&>button]:!h-[31px] [&>button]:!leading-normal [&>button:not(.bg-offblack)]:!border-[0.8px]"
            />

            <div className="grid w-[389px] grid-cols-2 gap-[9px]">
              {MAGAZINES.map((magazine) => (
                <MiddleCard
                  key={`${magazine.title}-${magazine.img}`}
                  img={magazine.img}
                  title={magazine.title}
                  desc={magazine.desc}
                  onClick={magazineActions[magazine.target]}
                  ariaLabel={`${magazine.title} 매거진 보기`}
                  className={`shrink-0 [&>div:nth-of-type(2)]:!p-3 ${magazine.className ?? ""}`}
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
