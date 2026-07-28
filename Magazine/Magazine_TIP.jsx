import { Fragment } from "react";
import { BottomNav, Header, TitleMag } from "../src/components/common";

import clothesHair from "./assets/tip-detail/clothes-hair.png";
import heroTip from "./assets/tip-detail/hero.png";
import moisturize from "./assets/tip-detail/moisturize.png";
import noRubbing from "./assets/tip-detail/no-rubbing.png";
import storage from "./assets/tip-detail/storage.png";
import batteryEnd from "./assets/status-battery-end.svg";
import batteryFill from "./assets/status-battery-fill.svg";
import batteryOutline from "./assets/status-battery-outline.svg";
import mobileSignal from "./assets/status-signal.svg";
import wifiIcon from "./assets/status-wifi.svg";

const SECTIONS = [
  {
    img: moisturize,
    alt: "향수를 뿌리기 전 손목에 보습제를 바르는 모습",
    title: "보습이 먼저입니다",
    desc: "향은 유분과 수분이 있는 피부에 더 오래 붙어 있습니다. 샤워 후 무향 바디로션이나 바세린을 얇게 바른 뒤 뿌리면 지속력이 눈에 띄게 좋아집니다. 건조한 피부는 향을 빠르게 날려 보냅니다.",
  },
  {
    img: noRubbing,
    alt: "손목에 향수를 가볍게 분사하는 모습",
    title: "문지르지 말고 그대로 두세요",
    desc: "손목에 뿌리고 비비는 습관은 향 분자를 부수는 지름길입니다. 맥박이 뛰는 손목, 귀 뒤, 팔 안쪽에 분사한 뒤 자연스럽게 마르도록 두는 것이 좋습니다. 체온을 따라 향이 은은하게 피어납니다.",
  },
  {
    img: clothesHair,
    alt: "옷과 헤어 브러시 옆에 놓인 향수",
    title: "옷과 머리카락도 활용하세요",
    desc: "섬유는 피부보다 향을 오래 붙잡아 둡니다. 니트나 코트 안감, 스카프에 한 번 분사해 보세요. 머리카락은 브러시에 뿌린 뒤 빗어주면 손상 없이 움직일 때마다 향이 퍼집니다",
  },
  {
    img: storage,
    alt: "서늘한 서랍 안에 보관된 향수",
    title: "보관만 잘해도 향이 살아있어요",
    desc: "향수는 빛과 온도에 민감합니다. 햇빛이 드는 화장대나 습한 욕실에 두면 향이 변질되고 지속력도 떨어집니다. 직사광선이 없는 서늘한 서랍 속에 원래 상자째 보관하면 마지막 한 방울까지 처음 그 향을 유지할 수 있습니다.",
  },
];

export default function MagazineTip({ onBack }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="relative mx-auto h-[3691px] w-full max-w-[430px] overflow-x-hidden bg-background">
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
          <section className="relative flex h-[536px] shrink-0 flex-col items-start justify-end gap-2.5 overflow-hidden py-[30px]">
            <div className="absolute left-0 top-0 h-[535px] w-[430px] overflow-hidden bg-offwhite">
              <img
                src={heroTip}
                alt="확대경 아래 놓인 르 라보 상탈 33 향수"
                className="size-full max-w-none object-cover"
              />
            </div>
            <div className="relative flex w-full items-center px-5">
              <TitleMag
                variant="subtext"
                tag="향수 상식"
                title="향수 지속력 높이는 꿀팁"
                sub={'"같은 향수도 오래 머물게 하는 법"'}
                className="!w-[386px] [&>div:last-child>div>p]:!text-offblack [&>div:last-child>div>p:first-child]:!text-title-semibold-24 [&>div:last-child>div>p:last-child]:!text-title-semibold-18"
              />
            </div>
          </section>

          <article className="flex h-[2892px] w-full flex-col items-center gap-16">
            <p className="w-full px-5 text-subtitle-regular-16 text-offblack">
              분명 아침에 뿌렸는데 점심이면 사라지는 향수. 문제는 향수가
              아니라 뿌리는 방법일 수 있습니다. 피부 상태와 분사 위치만
              바꿔도 향은 훨씬 오래 머뭅니다.
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
