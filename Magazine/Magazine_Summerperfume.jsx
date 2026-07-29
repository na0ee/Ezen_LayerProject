import { Fragment } from "react";
import { BottomNav, Header, TitleMag } from "../src/components/common";

import diptyqueDoSon from "./assets/summer-perfume-detail/diptyque-do-son.png";
import heroSummerNight from "./assets/summer-perfume-detail/hero.png";
import joMaloneMyrrhTonka from "./assets/summer-perfume-detail/jo-malone-myrrh-tonka.png";
import narcisoForHer from "./assets/summer-perfume-detail/narciso-for-her.png";
import tomFordSoleilBlanc from "./assets/summer-perfume-detail/tom-ford-soleil-blanc.png";

const PERFUMES = [
  {
    img: diptyqueDoSon,
    alt: "여름 밤의 꽃 옆에 놓인 딥티크 도 손",
    title: "딥티크 도 손",
    desc: "밤에 더 짙어지는 꽃, 튜베로즈의 대표작입니다. 낮에는 청초하던 화이트 플로럴이 밤공기 속에서는 크리미하고 관능적으로 변합니다. 여름 밤 흰 셔츠에 가장 잘 어울리는 향입니다.",
  },
  {
    img: narcisoForHer,
    alt: "검은 천 위에 놓인 나르시소 로드리게즈 포 허",
    title: "나르시소 로드리게즈 포 허",
    desc: "살결에 가깝게 붙는 머스크의 정석입니다. 강하게 퍼지지 않고 스칠 때만 느껴지는 잔향이 여름 밤 산책과 잘 어울립니다. 관능적이지만 과하지 않은, 밤의 스킨 센트입니다.",
  },
  {
    img: tomFordSoleilBlanc,
    alt: "해가 진 해변에 놓인 톰 포드 솔레이 블랑",
    title: "톰 포드 솔레이 블랑",
    desc: "한낮의 해변이 아닌, 해가 진 뒤의 해변을 닮은 향입니다. 코코넛과 앰버가 어우러진 솔라 노트가 밤의 열기 속에서 나른하게 피어납니다. 여름 밤 휴양지의 무드를 그대로 옮겨줍니다.",
  },
  {
    img: joMaloneMyrrhTonka,
    alt: "루프탑 테이블 위의 조 말론 미르 앤 통카",
    title: "조 말론 미르 앤 통카",
    desc: "달콤하고 묵직한 통카빈과 미르의 조합은 여름 밤 모임의 마지막 인상을 완성합니다. 루프탑이나 테라스처럼 향이 흩어지기 쉬운 공간에서도 존재감이 남습니다. 여름에 뿌리는 가장 관능적인 스위트입니다.",
  },
];

export default function MagazineSummerPerfume({ onBack }) {
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
                src={heroSummerNight}
                alt="도시의 여름 밤을 배경으로 놓인 딥티크 향수"
                className="absolute left-0 top-[-98px] h-[634px] w-[431px] max-w-none"
              />
            </div>

            <div className="relative flex w-full items-center px-5">
              <TitleMag
                variant="subtext"
                tag="향수 상식"
                title="여름 밤에 어울리는 향"
                sub={'“해가 진 뒤에 피어나는 관능적인 노트들”'}
                className="!w-[386px] [&>div:last-child>div>p:last-child]:!text-title-semibold-18"
              />
            </div>
          </section>

          <article className="flex w-full flex-col items-center gap-16">
            <div className="flex w-full flex-col gap-2 px-5 text-offblack">
              <h1 className="text-title-semibold-18">
                열대야의 공기와 어울리는 향수를 소개합니다
              </h1>
              <p className="text-subtitle-regular-16">
                낮의 열기가 가라앉은 여름 밤, 미지근한 공기는 향을 천천히
                그리고 깊게 퍼뜨립니다. 낮에는 부담스러웠던 관능적인 노트들이
                이 시간만큼은 은은하게 피어납니다. 여름 밤의 온도에 가장 잘
                어울리는 네 가지 향수를 골랐습니다.
              </p>
            </div>

            {PERFUMES.map((perfume, index) => (
              <Fragment key={perfume.title}>
                <div
                  className={`flex w-full shrink-0 items-start justify-center ${
                    index === 0 ? "h-[467px]" : "h-[469px]"
                  }`}
                >
                  <img
                    src={perfume.img}
                    alt={perfume.alt}
                    className="h-[469px] w-[430px] max-w-none object-cover"
                  />
                </div>
                <div className="flex w-full flex-col gap-2 px-5 text-offblack">
                  <h2 className="text-title-semibold-18">{perfume.title}</h2>
                  <p className="text-subtitle-regular-16">{perfume.desc}</p>
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
