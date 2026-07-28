import { BottomNav, Header, TitleMag } from "../src/components/common";

import candle from "./assets/diptyque-detail/candle.png";
import heroDiptyque from "./assets/diptyque-detail/hero.png";
import store from "./assets/diptyque-detail/store.png";
import windowPerfume from "./assets/diptyque-detail/window.png";

export default function MagazineDiptyque({ onBack }) {
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
                src={heroDiptyque}
                alt="책과 드라이플라워 옆에 놓인 딥티크 향수"
                className="absolute left-[-2px] top-0 h-full w-[434px] max-w-none object-cover"
              />
            </div>

            <div className="relative w-full px-5">
              <TitleMag tag="브랜드 스토리" title="DIPTYQUE" />
            </div>
          </section>

          <article className="flex w-full flex-col items-center gap-16">
            <div className="flex w-full flex-col gap-2 px-5 text-offblack">
              <h1 className="text-title-semibold-18">
                예술과 여행이 향으로 만나다
              </h1>
              <p className="text-subtitle-regular-16">
                1961년 프랑스 파리에서 세 명의 예술가가 설립한 딥티크는
                브랜드의 시작부터 일반적인 향수 브랜드와는 달랐습니다.
              </p>
            </div>

            <div className="flex h-[467px] w-full shrink-0 items-start justify-center">
              <img
                src={candle}
                alt="책과 그림 사이에서 타고 있는 딥티크 캔들"
                className="h-[469px] w-[430px] max-w-none object-cover"
              />
            </div>

            <p className="w-full px-5 text-subtitle-regular-16 text-offblack">
              패브릭과 인테리어 소품을 제작하던 세 창립자는 여행 중 만난
              풍경과 기억, 예술적 영감을 향으로 표현하기 시작했고, 이는
              오늘날 딥티크만의 감성적인 세계관으로 이어졌습니다.
            </p>

            <div className="flex h-[469px] w-full shrink-0 items-center justify-center">
              <img
                src={windowPerfume}
                alt="창가에 놓인 딥티크 도 손 향수"
                className="h-[469px] w-[430px] max-w-none object-cover"
              />
            </div>

            <p className="w-full px-5 text-subtitle-regular-16 text-offblack">
              딥티크의 향수는 하나의 장소와 순간을 떠올리게 하는 것이
              특징입니다. 대표 향수인 도 손은 베트남 해안의 기억을,
              오르페옹은 1960년대 파리 재즈바의 분위기를, 플레르 드 뽀는
              따뜻한 피부의 온기를 담아내고 있습니다.
            </p>

            <div className="flex h-[469px] w-full shrink-0 items-center justify-center">
              <img
                src={store}
                alt="파리의 딥티크 매장 외관"
                className="h-[469px] w-[430px] max-w-none object-cover"
              />
            </div>
          </article>
        </main>

        <BottomNav
          active="magazine"
          className="fixed bottom-5 left-1/2 z-50 !w-[390px] -translate-x-1/2"
        />
      </div>
    </div>
  );
}
