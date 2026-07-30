import { BottomNav, Header, TitleMag } from "../src/components/common";

import candle from "./assets/diptyque-detail/candle.avif";
import heroDiptyque from "./assets/diptyque-detail/hero.avif";
import store from "./assets/diptyque-detail/store.avif";
import windowPerfume from "./assets/diptyque-detail/window.avif";

export default function MagazineDiptyque({ onBack }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-x-hidden bg-background">
        <Header
          variant="detail-back"
          title="매거진"
          onBack={onBack}
          className="relative z-20 [&>div:first-child]:!gap-0 [&>div:first-child>button]:!size-[21px] [&>div:first-child>button>img]:!size-[21px]"
        />

        <main className="flex w-full flex-col gap-10 pb-[120px]">
          <section className="relative flex aspect-[430/536] w-full shrink-0 flex-col items-start justify-end py-[30px]">
            <div className="absolute inset-0 overflow-hidden bg-offwhite">
              <img
                src={heroDiptyque}
                alt="책과 드라이플라워 옆에 놓인 딥티크 향수"
                className="size-full scale-[1.01] object-cover"
              />
            </div>

            <div className="relative w-full px-5">
              <TitleMag tag="브랜드 스토리" title="DIPTYQUE" />
            </div>
          </section>

          <article className="flex w-full flex-col items-center gap-10">
            <div className="flex w-full flex-col gap-2 px-5 text-offblack">
              <h1 className="text-title-semibold-18">
                예술과 여행이 향으로 만나다
              </h1>
              <p className="text-subtitle-regular-16">
                1961년 프랑스 파리에서 세 명의 예술가가 설립한 딥티크는
                브랜드의 시작부터 일반적인 향수 브랜드와는 달랐습니다.
              </p>
            </div>

            <div className="aspect-[430/469] w-full shrink-0 overflow-hidden">
              <img
                src={candle}
                alt="책과 그림 사이에서 타고 있는 딥티크 캔들"
                className="size-full object-cover"
              />
            </div>

            <p className="w-full px-5 text-subtitle-regular-16 text-offblack">
              패브릭과 인테리어 소품을 제작하던 세 창립자는 여행 중 만난
              풍경과 기억, 예술적 영감을 향으로 표현하기 시작했고, 이는
              오늘날 딥티크만의 감성적인 세계관으로 이어졌습니다.
            </p>

            <div className="aspect-[430/469] w-full shrink-0 overflow-hidden">
              <img
                src={windowPerfume}
                alt="창가에 놓인 딥티크 도 손 향수"
                className="size-full object-cover"
              />
            </div>

            <p className="w-full px-5 text-subtitle-regular-16 text-offblack">
              딥티크의 향수는 하나의 장소와 순간을 떠올리게 하는 것이
              특징입니다. 대표 향수인 도 손은 베트남 해안의 기억을,
              오르페옹은 1960년대 파리 재즈바의 분위기를, 플레르 드 뽀는
              따뜻한 피부의 온기를 담아내고 있습니다.
            </p>

            <div className="aspect-[430/469] w-full shrink-0 overflow-hidden">
              <img
                src={store}
                alt="파리의 딥티크 매장 외관"
                className="size-full object-cover"
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
