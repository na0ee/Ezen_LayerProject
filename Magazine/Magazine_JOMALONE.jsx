import { BottomNav, Header, TitleMag } from "../src/components/common";

import gift from "./assets/jomalone-detail/gift.avif";
import heroJomalone from "./assets/jomalone-detail/hero.avif";
import layering from "./assets/jomalone-detail/layering.avif";
import signature from "./assets/jomalone-detail/signature.avif";

export default function MagazineJomalone({ onBack }) {
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
                src={heroJomalone}
                alt="꽃과 과일 사이에 놓인 조 말론 향수"
                className="size-full scale-[1.01] object-cover"
              />
            </div>

            <div className="relative w-full px-5">
              <TitleMag tag="브랜드 스토리" title="JO MALONE LONDON" />
            </div>
          </section>

          <article className="flex w-full flex-col items-center gap-10">
            <div className="flex w-full flex-col gap-2 px-5 text-offblack">
              <h1 className="text-title-semibold-18">
                나만의 향을 완성하는 레이어링의 시작
              </h1>
              <p className="text-subtitle-regular-16">
                1994년 영국 런던에서 시작된 조 말론은 자연에서 영감을 받은
                은은하고 세련된 향으로 전 세계적인 사랑을 받고 있습니다.
              </p>
            </div>

            <div className="aspect-[430/469] w-full shrink-0 overflow-hidden">
              <img
                src={layering}
                alt="꽃병 양옆에 놓인 조 말론 향수"
                className="size-full object-cover"
              />
            </div>

            <p className="w-full px-5 text-subtitle-regular-16 text-offblack">
              조 말론은 서로 다른 향을 조합하여 자신만의 향을 만드는
              ‘프래그런스 컴바이닝(레이어링)’ 문화를 대중화하며 향수 시장에
              새로운 경험을 제안했습니다.
            </p>

            <div className="aspect-[430/469] w-full shrink-0 overflow-hidden">
              <img
                src={gift}
                alt="선물 상자 안에 담긴 조 말론 향수"
                className="size-full object-cover"
              />
            </div>

            <p className="w-full px-5 text-subtitle-regular-16 text-offblack">
              과하지 않은 자연스러운 향과 심플한 디자인은 향수 입문자도 쉽게
              다가갈 수 있도록 만들었으며, 선물용 향수의 대표 브랜드로 자리
              잡았습니다.
            </p>

            <div className="aspect-[430/469] w-full shrink-0 overflow-hidden">
              <img
                src={signature}
                alt="배와 꽃 사이에 진열된 조 말론 향수"
                className="size-full object-cover"
              />
            </div>

            <p className="w-full px-5 text-subtitle-regular-16 text-offblack">
              대표 향수인 잉글리시 페어 앤 프리지아, 우드 세이지 앤 씨 솔트,
              피오니 앤 블러쉬 스웨이드는 브랜드의 아이덴티티를 가장 잘
              보여주는 시그니처 향수입니다.
            </p>
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
