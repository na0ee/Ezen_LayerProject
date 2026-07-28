import { Fragment } from "react";
import { BottomNav, Header, TitleMag } from "../src/components/common";

import collection from "./assets/niche-detail/collection.png";
import heroNiche from "./assets/niche-detail/hero.png";
import layering from "./assets/niche-detail/layering.png";
import onlineCollection from "./assets/niche-detail/online-collection.png";
import onlineHand from "./assets/niche-detail/online-hand.png";
import batteryEnd from "./assets/status-battery-end.svg";
import batteryFill from "./assets/status-battery-fill.svg";
import batteryOutline from "./assets/status-battery-outline.svg";
import mobileSignal from "./assets/status-signal.svg";
import wifiIcon from "./assets/status-wifi.svg";

const SECTIONS = [
  {
    img: collection,
    alt: "여러 니치 향수 병이 모여 있는 모습",
    title: "나만의 향을 찾는 소비 증가",
    desc: "과거에는 브랜드 인지도와 대중적인 향이 중요했다면, 최근에는 남들과 다른 향을 찾는 소비자가 증가하고 있습니다. 개성 있는 원료와 독창적인 스토리를 가진 니치 브랜드가 꾸준히 주목받는 이유입니다.",
  },
  {
    img: layering,
    alt: "침구 위에 함께 놓인 두 개의 향수",
    title: "레이어링 문화 확산",
    desc: "하나의 향수만 사용하는 것이 아니라 여러 향수를 조합하여 자신만의 향을 만드는 레이어링이 새로운 트렌드로 자리 잡고 있습니다. 향수를 직접 조합하며 취향을 탐색하는 경험 자체가 하나의 즐거움으로 인식되고 있습니다.",
  },
  {
    img: onlineHand,
    alt: "야경을 배경으로 손에 든 향수",
    title: "온라인 향수 콘텐츠 소비 증가",
    desc: "유튜브, SNS, 커뮤니티를 통해 향수 정보를 탐색하는 사용자가 증가하면서 향수 구매 방식 또한 변화하고 있습니다. 실제 리뷰와 사용자 경험을 기반으로 향수를 선택하는 경향이 강해지고 있습니다.",
  },
  {
    img: onlineCollection,
    alt: "다양한 니치 향수가 진열된 모습",
    title: "온라인 향수 콘텐츠 소비 증가",
    desc: "유튜브, SNS, 커뮤니티를 통해 향수 정보를 탐색하는 사용자가 증가하면서 향수 구매 방식 또한 변화하고 있습니다. 실제 리뷰와 사용자 경험을 기반으로 향수를 선택하는 경향이 강해지고 있습니다.",
  },
];

export default function MagazineNiche({ onBack }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="relative mx-auto h-[3803px] w-full max-w-[430px] overflow-x-hidden bg-background">
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
                src={heroNiche}
                alt="어두운 배경의 르 라보 상탈 33 향수"
                className="absolute inset-0 size-full object-cover"
              />
            </div>

            <div className="relative w-full px-5">
              <TitleMag
                variant="subtext"
                tag="향수 상식"
                title="니치향수 트렌드"
                sub={'"향으로 나를 표현하는 시대"'}
                className="!w-[386px] [&>div>div>p:last-child]:!text-title-semibold-18"
              />
            </div>
          </section>

          <article className="flex w-full flex-col items-center gap-16">
            <p className="w-full px-5 text-subtitle-regular-16 text-offblack">
              최근 향수 시장은 대중적인 향수에서 벗어나 자신만의 취향과
              개성을 표현할 수 있는 니치 향수 중심으로 빠르게 변화하고
              있습니다. 특히 MZ세대를 중심으로 향수를 단순한 향기가 아닌
              자신을 표현하는 하나의 아이덴티티로 인식하는 경향이 강해지고
              있습니다.
            </p>

            {SECTIONS.map((section, index) => (
              <Fragment key={section.img}>
                <div
                  className={`flex w-full shrink-0 items-start justify-center ${
                    index === 0 ? "h-[467px]" : "h-[469px]"
                  }`}
                >
                  <img
                    src={section.img}
                    alt={section.alt}
                    className="h-[469px] w-[430px] max-w-none object-cover"
                  />
                </div>
                <div className="flex w-full flex-col gap-2 px-5 text-offblack">
                  <h2 className="text-title-semibold-18">{section.title}</h2>
                  <p className="text-subtitle-regular-16">{section.desc}</p>
                </div>
              </Fragment>
            ))}
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
