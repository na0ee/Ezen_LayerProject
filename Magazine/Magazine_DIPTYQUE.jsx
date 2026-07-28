import { BottomNav, Header, TitleMag } from "../src/components/common";

import candle from "./assets/diptyque-detail/candle.png";
import heroDiptyque from "./assets/diptyque-detail/hero.png";
import store from "./assets/diptyque-detail/store.png";
import windowPerfume from "./assets/diptyque-detail/window.png";
import batteryEnd from "./assets/status-battery-end.svg";
import batteryFill from "./assets/status-battery-fill.svg";
import batteryOutline from "./assets/status-battery-outline.svg";
import mobileSignal from "./assets/status-signal.svg";
import wifiIcon from "./assets/status-wifi.svg";

export default function MagazineDiptyque({ onBack }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="relative mx-auto h-[2777px] w-full max-w-[430px] overflow-x-hidden bg-background">
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
                src={heroDiptyque}
                alt="책과 드라이플라워 옆에 놓인 딥티크 향수"
                className="absolute inset-0 size-full object-cover"
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
