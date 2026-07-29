import { BottomNav, Header, TitleMag } from "../src/components/common";

import altoAstral from "./assets/byredo-detail/alto-astral-render.png";
import gypsyWater from "./assets/byredo-detail/gypsy-water-render.png";
import heroByredo from "./assets/byredo-detail/hero-render.png";
import linenPerfumes from "./assets/byredo-detail/linen-render.png";

export default function MagazineByredo({ onBack }) {
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

        <main className="flex w-full flex-col gap-10 pb-[120px]">
          <section className="relative flex h-[536px] shrink-0 flex-col items-start justify-end py-[30px]">
            <div className="absolute left-0 top-0 h-[535px] w-full overflow-hidden bg-offwhite">
              <img
                src={heroByredo}
                alt="열대 과일과 함께 놓인 바이레도 향수"
                className="absolute left-[-2px] top-0 h-full w-[434px] max-w-none object-cover"
              />
            </div>

            <div className="relative w-full px-5">
              <TitleMag tag="브랜드 스토리" title="BYREDO" />
            </div>
          </section>

          <article className="flex h-[1982px] w-full shrink-0 flex-col items-center gap-10">
            <div className="flex w-full flex-col gap-2 px-5 text-offblack">
              <h1 className="text-title-semibold-18">
                기억과 감정을 향으로 담아내는 브랜드
              </h1>
              <p className="text-subtitle-regular-16">
                2006년 스웨덴 스톡홀름에서 설립된 바이레도는 단순히 좋은
                향을 만드는 것을 넘어, 기억과 감정, 특정 순간의 분위기를
                향으로 표현하는 것을 목표로 시작되었습니다.
              </p>
            </div>

            <div className="flex h-[467px] w-[390px] shrink-0 items-start justify-center">
              <img
                src={linenPerfumes}
                alt="리넨과 레몬 사이에 놓인 바이레도 향수"
                className="h-[469px] w-[430px] max-w-none object-cover"
              />
            </div>

            <p className="w-full px-5 text-subtitle-regular-16 text-offblack">
              창립자 벤 고햄(Ben Gorham)은 어린 시절의 경험과 여행에서 얻은
              영감을 바탕으로 향수를 하나의 예술 작품처럼 풀어냈으며,
              미니멀한 디자인과 독창적인 스토리텔링으로 니치 향수 시장을
              대표하는 브랜드로 성장했습니다.
            </p>

            <div className="flex h-[469px] w-full shrink-0 items-center justify-center overflow-visible px-5">
              <img
                src={gypsyWater}
                alt="바이레도 집시 워터 향수 라벨"
                className="h-[469px] w-[430px] max-w-none object-cover"
              />
            </div>

            <p className="w-full px-5 text-subtitle-regular-16 text-offblack">
              대표 향수인 블랑쉬는 깨끗한 리넨의 감성을, 모하비 고스트는
              사막에서 피어나는 꽃의 생명력을, 집시 워터는 자유로운 보헤미안
              라이프스타일을 담아내며 많은 사랑을 받고 있습니다.
            </p>

            <div className="flex h-[469px] w-full shrink-0 items-center justify-center overflow-visible px-5">
              <img
                src={altoAstral}
                alt="코코넛 사이에 놓인 바이레도 알토 아스트랄 향수"
                className="h-[469px] w-[430px] max-w-none object-cover"
              />
            </div>
          </article>
        </main>

        <BottomNav
          active="magazine"
          className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
        />
      </div>
    </div>
  );
}
