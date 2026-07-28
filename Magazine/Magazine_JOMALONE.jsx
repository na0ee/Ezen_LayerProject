import { BottomNav, Header, TitleMag } from "../src/components/common";

import gift from "./assets/jomalone-detail/gift.png";
import heroJomalone from "./assets/jomalone-detail/hero.png";
import layering from "./assets/jomalone-detail/layering.png";
import signature from "./assets/jomalone-detail/signature.png";
import batteryEnd from "./assets/status-battery-end.svg";
import batteryFill from "./assets/status-battery-fill.svg";
import batteryOutline from "./assets/status-battery-outline.svg";
import mobileSignal from "./assets/status-signal.svg";
import wifiIcon from "./assets/status-wifi.svg";

export default function MagazineJomalone({ onBack }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="relative mx-auto h-[2889px] w-full max-w-[430px] overflow-x-hidden bg-background">
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
          variant="detail-back"
          title="매거진"
          onBack={onBack}
          className="absolute left-0 top-[65px] z-20 [&>div:first-child]:!gap-0 [&>div:first-child>button]:!size-[21px] [&>div:first-child>button>img]:!size-[21px]"
        />

        <main className="absolute left-0 top-[119px] flex w-full flex-col gap-10">
          <section className="relative flex h-[536px] shrink-0 flex-col items-start justify-end py-[30px]">
            <div className="absolute left-0 top-0 h-[535px] w-full overflow-hidden bg-offwhite">
              <img
                src={heroJomalone}
                alt="꽃과 과일 사이에 놓인 조 말론 향수"
                className="absolute inset-0 size-full object-cover"
              />
            </div>

            <div className="relative w-full px-5">
              <TitleMag tag="브랜드 스토리" title="JO MALONE LONDON" />
            </div>
          </section>

          <article className="flex w-full flex-col items-center gap-16">
            <div className="flex w-full flex-col gap-2 px-5 text-offblack">
              <h1 className="text-title-semibold-18">
                나만의 향을 완성하는 레이어링의 시작
              </h1>
              <p className="text-subtitle-regular-16">
                1994년 영국 런던에서 시작된 조 말론은 자연에서 영감을 받은
                은은하고 세련된 향으로 전 세계적인 사랑을 받고 있습니다.
              </p>
            </div>

            <div className="flex h-[467px] w-full shrink-0 items-start justify-center">
              <img
                src={layering}
                alt="꽃병 양옆에 놓인 조 말론 향수"
                className="h-[469px] w-[430px] max-w-none object-cover"
              />
            </div>

            <p className="w-full px-5 text-subtitle-regular-16 text-offblack">
              조 말론은 서로 다른 향을 조합하여 자신만의 향을 만드는
              ‘프래그런스 컴바이닝(레이어링)’ 문화를 대중화하며 향수 시장에
              새로운 경험을 제안했습니다.
            </p>

            <div className="flex h-[469px] w-full shrink-0 items-center justify-center">
              <img
                src={gift}
                alt="선물 상자 안에 담긴 조 말론 향수"
                className="h-[469px] w-[430px] max-w-none object-cover"
              />
            </div>

            <p className="w-full px-5 text-subtitle-regular-16 text-offblack">
              과하지 않은 자연스러운 향과 심플한 디자인은 향수 입문자도 쉽게
              다가갈 수 있도록 만들었으며, 선물용 향수의 대표 브랜드로 자리
              잡았습니다.
            </p>

            <div className="flex h-[469px] w-full shrink-0 items-center justify-center">
              <img
                src={signature}
                alt="배와 꽃 사이에 진열된 조 말론 향수"
                className="h-[469px] w-[430px] max-w-none object-cover"
              />
            </div>

            <p className="w-[386px] text-subtitle-regular-16 text-offblack">
              대표 향수인 잉글리시 페어 앤 프리지아, 우드 세이지 앤 씨 솔트,
              피오니 앤 블러쉬 스웨이드는 브랜드의 아이덴티티를 가장 잘
              보여주는 시그니처 향수입니다.
            </p>
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
