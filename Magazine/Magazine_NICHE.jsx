import { Fragment } from "react";
import { BottomNav, Header, TitleMag } from "../src/components/common";

import collection from "./assets/niche-detail/collection.png";
import heroNiche from "./assets/niche-detail/hero.png";
import layering from "./assets/niche-detail/layering.png";
import onlineCollection from "./assets/niche-detail/online-collection.png";
import onlineHand from "./assets/niche-detail/online-hand.png";

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
                src={heroNiche}
                alt="어두운 배경의 르 라보 상탈 33 향수"
                className="size-full scale-[1.01] object-cover"
              />
            </div>

            <div className="relative w-full px-5">
              <TitleMag
                variant="subtext"
                tag="향수 상식"
                title="니치향수 트렌드"
                sub={'"향으로 나를 표현하는 시대"'}
                className="!w-full [&>div>div>p:last-child]:!text-title-semibold-18"
              />
            </div>
          </section>

          <article className="flex w-full flex-col items-center gap-10">
            <div className="flex w-full flex-col items-center justify-center gap-2 px-5 text-offblack">
              <h2 className="w-full text-title-semibold-18">
                향수가 취향을 넘어 아이덴티티가 되기까지
              </h2>
              <p className="w-full text-subtitle-regular-16">
                최근 향수 시장은 대중적인 향수에서 벗어나 자신만의 취향과 개성을
                표현할 수 있는 니치 향수 중심으로 빠르게 변화하고 있습니다.
                특히 MZ세대를 중심으로 향수를 단순한 향기가
                <span className="block">
                  아닌 자신을 표현하는 하나의 아이덴티티로 인식하는 경향이
                  강해지고 있습니다.
                </span>
              </p>
            </div>

            {SECTIONS.map((section) => (
              <Fragment key={section.img}>
                <div className="aspect-[430/469] w-full shrink-0 overflow-hidden">
                  <img
                    src={section.img}
                    alt={section.alt}
                    className="size-full object-cover"
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
          className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
        />
      </div>
    </div>
  );
}
