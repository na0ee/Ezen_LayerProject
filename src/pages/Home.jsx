import { useEffect, useRef, useState } from "react";
import {
  BottomNav,
  BtnHero,
  CardChallengeSmall,
  CardMag,
  CardMainReview,
  CardRank,
  Category,
  Header,
  MainBanner,
  MainBannerText,
  TitleMain,
} from "../components/common";
import challenge1 from "../assets/images/home/challenge-1.png";
import challenge2 from "../assets/images/home/challenge-2.png";
import challenge3 from "../assets/images/home/challenge-3.png";
import giftImg from "../assets/images/home/gift.png";
import heroCommunityImg from "../assets/images/home/hero-community.png";
import heroImg from "../assets/images/home/hero.png";
import heroRecordImg from "../assets/images/home/hero-record.png";
import magazine1 from "../assets/images/home/magazine-1.png";
import magazine2 from "../assets/images/home/magazine-2.png";
import rank1 from "../assets/images/home/rank-1.png";
import rank2 from "../assets/images/home/rank-2.png";
import rank3 from "../assets/images/home/rank-3.png";
import raffleImg from "../assets/images/home/raffle.png";
import recordBottle from "../assets/images/home/record-bottle.png";
import scent1 from "../assets/images/home/scent-1.png";
import scent2 from "../assets/images/home/scent-2.png";

const days = [
  ["Mon", "6"],
  ["Tue", "7"],
  ["Wed", "8"],
  ["Thu", "9"],
  ["Fri", "10"],
  ["Sat", "11"],
  ["Sun", "12"],
];

const heroSlides = [
  {
    img: heroImg,
    imageClassName: "absolute inset-0 size-full object-cover",
    text: "몇 가지 질문으로 당신만의 향 취향을 찾아드릴게요",
    button: "My LAYER 진단하기",
    overlay: true,
  },
  {
    img: heroRecordImg,
    imageClassName:
      "absolute left-[-0.03%] top-[-26.84%] h-[142.54%] w-full max-w-none",
    text: "오늘의 향이, 내일의 취향이 됩니다",
    button: "향수 기록 시작하기",
  },
  {
    img: heroCommunityImg,
    imageClassName: "absolute inset-0 size-full object-cover",
    text: "당신이 찾던 향, 누군가는 이미 뿌리고 있어요",
    button: "커뮤니티 입장하기",
  },
];

const scentCards = [
  {
    img: scent1,
    label: "Mood Shifter",
    name: "oat.latte",
    keywords: ["포근한", "머스크"],
  },
  {
    img: scent2,
    label: "Mood Shifter",
    name: "mellow_bin",
    keywords: ["달콤한", "바닐라"],
  },
];

const challengeCards = [
  {
    img: challenge1,
    title: "커뮤니티 이용하기",
    desc: "질문·답변·리뷰 남기고 최대 75p까지",
  },
  {
    img: challenge2,
    title: "내 향수 등록하기",
    desc: "내 보유향수 첫 등록 시 30p, 등록할 때 마다 5p씩!",
  },
  {
    img: challenge3,
    title: "향수 추천하기",
    desc: "유저에게 어울리는 향을 찾아주고, 포인트 받자!",
  },
];

function useDragScroll() {
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const onPointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const element = event.currentTarget;
    drag.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: element.scrollLeft,
    };
    element.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!drag.current.active) return;
    event.currentTarget.scrollLeft =
      drag.current.scrollLeft - (event.clientX - drag.current.startX);
  };

  const stopDragging = (event) => {
    if (!drag.current.active) return;
    drag.current.active = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return {
    onDragStart: (event) => event.preventDefault(),
    onPointerDown,
    onPointerMove,
    onPointerUp: stopDragging,
    onPointerCancel: stopDragging,
  };
}

export default function Home({ onRaffle }) {
  const [activeNav, setActiveNav] = useState("home");
  const [giftCategory, setGiftCategory] = useState("전체");
  const [isPastHero, setIsPastHero] = useState(false);
  const [activeHero, setActiveHero] = useState(0);
  const scentDrag = useDragScroll();
  const challengeDrag = useDragScroll();
  const magazineDrag = useDragScroll();
  const rankDrag = useDragScroll();

  useEffect(() => {
    const handleScroll = () => setIsPastHero(window.scrollY >= 536);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="relative mx-auto w-full max-w-[430px] overflow-hidden bg-background pb-32">
        <section className="relative h-[536px] overflow-hidden bg-offblack">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.button}
              aria-hidden={activeHero !== index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                activeHero === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <img
                src={slide.img}
                alt=""
                className={slide.imageClassName}
                draggable="false"
              />
              {slide.overlay && <div className="absolute inset-0 bg-offblack/20" />}
            </div>
          ))}
          <Header
            variant={isPastHero ? "main2" : "main"}
            className={`fixed inset-x-0 top-0 z-30 mx-auto max-w-[430px] transition-colors ${
              isPastHero ? "bg-offwhite" : ""
            }`}
          />
          <div className="absolute inset-x-0 bottom-[30px] flex flex-col items-center gap-4 px-5">
            <p className="text-center text-body-medium-16 text-offwhite">
              {heroSlides[activeHero].text}
            </p>
            <BtnHero>{heroSlides[activeHero].button}</BtnHero>
            <div className="relative mt-1 h-0.5 w-[120px] bg-offwhite">
              <div
                className="h-full bg-offblack transition-[width] duration-500"
                style={{ width: `${(activeHero + 1) * 40}px` }}
              />
              <div className="absolute inset-0 grid grid-cols-3">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.button}
                    type="button"
                    aria-label={`Hero ${index + 1} 보기`}
                    onClick={() => setActiveHero(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-[60px] pt-10">
          <section className="flex flex-col gap-[30px] px-5">
            <TitleMain
              title="Record"
              actionVariant="record"
              sub={
                <>
                  이번주 <span className="text-point-orange">5일</span> 기록했어요
                </>
              }
              onMore={() => {}}
            />
            <div className="flex items-start justify-between">
              {days.map(([day, date], index) => (
                <div key={day} className="flex w-10 flex-col items-center gap-1.5">
                  <span className="text-caption-medium-12 text-grey">{day}</span>
                  <div className="relative flex h-[50px] w-10 items-end justify-center pb-[7px] text-caption-medium-12 text-offwhite">
                    <span
                      aria-hidden="true"
                      className={`absolute left-[-5px] top-0 size-[50px] ${
                        index === 4 || index === 5 ? "bg-grey" : "bg-offblack"
                      }`}
                      style={{
                        WebkitMaskImage: `url(${recordBottle})`,
                        maskImage: `url(${recordBottle})`,
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                      }}
                    />
                    <span className="relative">{date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="px-5">
            <MainBannerText
              img={raffleImg}
              label="Raffle of the week"
              title={"갖고 싶던 그 향,\n운에 맡겨보세요"}
              actionLabel="응모하기"
              onAction={onRaffle}
            />
          </section>

          <section className="flex flex-col gap-[30px]">
            <div className="px-5">
              <TitleMain
                title="Scent Pick"
                sub="사진 속 분위기에 어울리는 향수를 추천해보세요"
              />
            </div>
            <div
              {...scentDrag}
              className="flex cursor-grab touch-pan-x select-none gap-3 overflow-x-scroll overscroll-x-contain px-5 pb-1 active:cursor-grabbing [scrollbar-width:none] [&_img]:pointer-events-none [&_img]:select-none [&::-webkit-scrollbar]:hidden"
            >
              {scentCards.map((card) => (
                <CardMainReview key={card.name} {...card} className="shrink-0" />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-[30px]">
            <div className="px-5">
              <TitleMain
                title="Challenge"
                sub="함께하는 챌린지로 꾸준함을 만들어요"
              />
            </div>
            <div
              {...challengeDrag}
              className="flex cursor-grab touch-pan-x select-none gap-3 overflow-x-scroll overscroll-x-contain px-5 pb-1 active:cursor-grabbing [scrollbar-width:none] [&_img]:pointer-events-none [&_img]:select-none [&::-webkit-scrollbar]:hidden"
            >
              {challengeCards.map((card, index) => (
                <CardChallengeSmall
                  key={card.title}
                  img={card.img}
                  imgClassName={
                    index === 2
                      ? "absolute left-[-9.71%] top-[-28.31%] h-[139.07%] w-[119.43%] max-w-none"
                      : "size-full object-cover"
                  }
                  title={card.title}
                  desc={card.desc}
                  className="shrink-0"
                  aria-label={`챌린지 ${index + 1}`}
                />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-[30px]">
            <div className="px-5">
              <TitleMain
                title="Magazine"
                sub="당신의 향을 이야기해요"
              />
            </div>
            <div
              {...magazineDrag}
              className="flex cursor-grab touch-pan-x select-none gap-3 overflow-x-scroll overscroll-x-contain px-5 pb-1 active:cursor-grabbing [scrollbar-width:none] [&_img]:pointer-events-none [&_img]:select-none [&::-webkit-scrollbar]:hidden"
            >
              <CardMag
                img={magazine1}
                title="향수 지속력 높이는 꿀팁"
                desc={"같은 향도 오래 남기는 사용법\n매거진 내용 두줄정도 요약해서 나오면 좋을듯"}
                className="shrink-0"
              />
              <CardMag
                img={magazine2}
                title="BYREDO"
                desc="기억과 감정을 향으로 담아내는 브랜드"
                className="shrink-0"
              />
            </div>
          </section>

          <section className="flex flex-col gap-[30px]">
            <div className="px-5">
              <TitleMain
                variant="title3"
                title="Today's Rank"
                sub="지금 가장 많은 사랑을 받는 향을 보여드려요"
              />
              <Category
                variant="tab"
                items={["전체", "선물", "여성", "20대", "30대", "남성"]}
                active={giftCategory}
                onChange={setGiftCategory}
                className="mt-5 overflow-x-auto [scrollbar-width:none]"
              />
            </div>
            <div
              {...rankDrag}
              className="flex cursor-grab touch-pan-x select-none gap-3 overflow-x-scroll overscroll-x-contain px-5 pb-1 active:cursor-grabbing [scrollbar-width:none] [&_img]:pointer-events-none [&_img]:select-none [&::-webkit-scrollbar]:hidden"
            >
              <CardRank
                rank="1위"
                img={rank1}
                name="블랙베리 앤 베이"
                brand="JO MALONE LONDON"
                imageFrameClassName="w-[44px]"
                imageClassName="absolute h-[154.55px] w-[155.83px] left-[-55.92px] top-[-27.27px] max-w-none"
                className="shrink-0"
              />
              <CardRank
                rank="1위"
                img={rank2}
                name="블랙베리 앤 베이"
                brand="JO MALONE LONDON"
                imageFrameClassName="w-[57px]"
                imageClassName="absolute h-[106.25px] w-[105.32px] left-[-24.16px] top-0 max-w-none"
                className="shrink-0"
              />
              <CardRank
                rank="1위"
                img={rank3}
                name="블랙베리 앤 베이"
                brand="JO MALONE LONDON"
                imageFrameClassName="w-[61px]"
                imageClassName="absolute h-[142.86px] w-[142.06px] left-[-40.11px] top-[-21.85px] max-w-none"
                className="shrink-0"
              />
            </div>
          </section>

          <section className="flex flex-col gap-[30px] px-5">
            <TitleMain
              title="Gift"
              actionVariant="ai"
              sub="AI 챗봇과 함께 그 사람에게 꼭 맞는 향수를 찾아요"
            />
            <MainBanner
              img={giftImg}
              alt="향수 선물 추천"
              imgClassName="absolute left-[-3.94%] top-[-7.78%] h-[123.92%] w-[108.12%] max-w-none"
            />
          </section>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[430px] px-5 pb-5">
        <BottomNav active={activeNav} onChange={setActiveNav} />
      </div>
    </div>
  );
}
