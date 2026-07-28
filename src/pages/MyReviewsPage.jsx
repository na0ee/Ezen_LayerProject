import { useEffect, useRef, useState } from "react";
import { Badge, BottomNav, Header, Icon } from "../components/common";
import moreDots from "../assets/icons/more-dots.svg";
import diptyque from "../assets/images/mypage/diptyque.png";
import loewe from "../assets/images/mypage/loewe.png";
import matiere from "../assets/images/mypage/matiere.png";
import santamaria from "../assets/images/mypage/santamaria.png";

// 참고 파일(MyReviewsPage.tsx)의 레이아웃/기능을 이 프로젝트 컴포넌트·토큰으로 이식
const pendingReviews = [
  {
    title: "햇살 좋은 날의 베이지 룩",
    description:
      "따뜻한 햇살엔 부드럽고 깨끗한 향이 잘 어울리는 것 같아요. 블랑쉬로 포근하게 시작해서 오 로즈로 기분 전환해주고 마지막엔 잉글리시 페어로 잔향을 남겨줘요.",
    image: diptyque,
  },
  {
    title: "로에베 아이레 수틸레사 오 드 뚜왈렛 50ml",
    description: "리뷰를 작성해주세요",
    image: loewe,
  },
];

// 마우스 드래그로도 가로 스크롤 가능하게 (Mypage.jsx와 동일 패턴)
function useDragScroll() {
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const onPointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const element = event.currentTarget;
    drag.current = { active: true, startX: event.clientX, scrollLeft: element.scrollLeft };
    element.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!drag.current.active) return;
    event.currentTarget.scrollLeft = drag.current.scrollLeft - (event.clientX - drag.current.startX);
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

const writtenReviews = [
  {
    brand: "SANTA MARIA NOVELLA",
    name: "엔젤 디 피렌체 오드코롱 100ml",
    images: [diptyque, matiere, santamaria],
    date: "2026.xx.xx",
    likes: 42,
    comments: 8,
    title: "햇살 좋은 날의 베이지 룩",
    text: "따뜻한 햇살엔 부드럽고 깨끗한 향이 잘 어울리는 것 같아요. 블랑쉬로 포근하게 시작해서 오 로즈로 기분 전환해주고 마지막엔 잉글리시 페어로 잔향을 남겨줘요. 하루 종일 기분이 좋아지는 조합이에요.",
    hashtags: ["#데일리향수", "#베이지룩", "#플로럴머스크", "#지속력좋아요"],
  },
  {
    brand: "MATIERE PREMIERE",
    name: "마티에 프리미에르 메탈 라벤더 오 드 퍼퓸 50ml",
    images: [matiere],
    date: "2026.xx.xx",
    likes: 42,
    comments: 8,
    title: "깔끔한 라벤더 향",
    text: "흔히 생각하는 방향제 같은 라벤더가 아니라 차가운 느낌의 라벤더 향수인듯. 텁텁함 없이 투명한 향이라 계절 상관없이 미니멀하게 뿌리기 좋음",
    hashtags: ["#라벤더향수"],
  },
];

const reviewableItems = [
  {
    brand: "LOEWE PERFUMES",
    name: "로에베 아이레 수틸레사 오 드 뚜왈렛 50ml",
    image: loewe,
  },
];

function ReviewableCard({ item }) {
  return (
    <article className="rounded-2xl border border-light-grey bg-offwhite p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="flex size-[50px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-light-grey">
            <img alt="" className="size-full object-contain" src={item.image} />
          </div>
          <div className="flex min-w-0 flex-col gap-1.5">
            <p className="truncate text-caption-regular-12 text-grey uppercase">{item.brand}</p>
            <h3 className="truncate text-body-regular-14 text-offblack">{item.name}</h3>
          </div>
        </div>
        <button
          type="button"
          className="h-8 w-fit self-end rounded-full border border-light-grey bg-offwhite px-3.5 text-caption-medium-12 text-grey"
        >
          리뷰 작성하기
        </button>
      </div>
    </article>
  );
}

function PendingReviewCard({ review }) {
  return (
    <article className="flex h-32 w-[300px] shrink-0 flex-col gap-5 rounded-2xl border border-light-grey bg-offwhite p-4">
      <div className="flex h-[93px] items-start justify-between gap-4">
        <div className="flex h-[93px] w-full flex-col gap-3">
          <Badge variant="good" />
          <div className="flex h-[61px] w-full flex-col gap-1.5">
            <h3 className="line-clamp-2 w-full text-body-semibold-16 leading-[19px] text-offblack">
              {review.title}
            </h3>
            <p className="line-clamp-2 w-full text-body-regular-14 leading-[17px] text-subtext">
              {review.description}
            </p>
          </div>
        </div>
        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-light-grey">
          <img alt="" className="size-full object-contain" src={review.image} />
        </div>
      </div>
    </article>
  );
}

function WrittenReviewCard({ review }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <article className="rounded-2xl border border-light-grey bg-offwhite p-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex w-full items-center justify-between">
            <Badge variant="good" />
            <div className="relative" ref={menuRef}>
              <button type="button" onClick={() => setIsMenuOpen((current) => !current)}>
                <img src={moreDots} alt="더보기" className="size-6" />
              </button>
              {isMenuOpen && (
                <div className="absolute top-full right-0 z-10 mt-1 w-24 overflow-hidden rounded-lg border border-light-grey bg-offwhite shadow-lg">
                  {["수정하기", "삭제하기"].map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full px-4 py-2.5 text-center text-body-regular-14 text-offblack hover:bg-2light-grey"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-start gap-3">
            {review.images.map((image, index) => (
              <div
                key={index}
                className="flex size-[50px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-light-grey"
              >
                <img alt="" className="size-full object-contain" src={image} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-body-semibold-16 text-offblack">{review.title}</h3>
          <p className="mt-1.5 text-body-regular-14 leading-[1.4] text-subtext">{review.text}</p>
          <div className="mt-3 flex items-center gap-2.5">
            {review.hashtags.map((hashtag) => (
              <span className="text-body-regular-14 text-subtext" key={hashtag}>
                {hashtag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex w-full items-center justify-between">
        <Icon likes={review.likes} comments={review.comments} />
        <p className="text-body-regular-14 text-grey">{review.date}</p>
      </div>
    </article>
  );
}

export default function MyReviewsPage() {
  const [activeTab, setActiveTab] = useState("reviewable");
  const scrollerDrag = useDragScroll();

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-background pb-[104px]">
      <Header
        variant="detail-back"
        title="내 리뷰 관리하기"
        onBack={() => {
          window.location.href = "/mypage";
        }}
      />

      <div className="flex flex-col pt-6">
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-5 pb-0.5" {...scrollerDrag}>
          {pendingReviews.map((review) => (
            <PendingReviewCard key={review.title} review={review} />
          ))}
        </div>

        <div className="mt-4 border-b border-light-grey px-5">
          <div className="flex gap-6 pt-4">
            <button
              type="button"
              onClick={() => setActiveTab("reviewable")}
              className={`relative pb-3 text-body-medium-16 ${
                activeTab === "reviewable" ? "text-offblack" : "text-grey"
              }`}
            >
              작성 가능한 리뷰
              {activeTab === "reviewable" && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-point-orange" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("written")}
              className={`relative pb-3 text-body-medium-16 ${
                activeTab === "written" ? "text-offblack" : "text-grey"
              }`}
            >
              작성한 리뷰
              {activeTab === "written" && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-point-orange" />}
            </button>
          </div>
        </div>

        <section className="mt-[30px] flex flex-col gap-4 px-5">
          {activeTab === "reviewable"
            ? reviewableItems.map((item) => <ReviewableCard key={item.name} item={item} />)
            : writtenReviews.map((review) => <WrittenReviewCard key={review.name} review={review} />)}
        </section>
      </div>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 px-5 pb-5">
        <BottomNav
          active="my"
          onChange={(tab) => {
            if (tab === "home") window.location.href = "/";
            if (tab === "my") window.location.href = "/mypage";
          }}
        />
      </div>
    </div>
  );
}
