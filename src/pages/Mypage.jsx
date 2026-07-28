import { useRef, useState } from "react";
import {
  Badge,
  BottomNav,
  BtnBig,
  BtnSmall,
  CardSmall,
  Category,
  LayerBadge,
  MagListCard,
  TabSub,
  TitleSection,
} from "../components/common";
import chevronRightGrey from "../assets/icons/chevron-right-grey.svg";
import chevronRightWhite from "../assets/icons/chevron-right-white.svg";
import badgeNewbie from "../assets/images/grade-badge/badge-newbie.png";
import background from "../assets/images/mypage/background.png";
import buly from "../assets/images/mypage/buly.png";
import bvlgari from "../assets/images/mypage/bvlgari.png";
import diptyque from "../assets/images/mypage/diptyque.png";
import feedCell1 from "../assets/images/mypage/feed/feed-cell-1.png";
import feedCell2 from "../assets/images/mypage/feed/feed-cell-2.png";
import feedCell3 from "../assets/images/mypage/feed/feed-cell-3.png";
import feedCell4 from "../assets/images/mypage/feed/feed-cell-4.png";
import iconHelp from "../assets/images/mypage/icon-help.svg";
import iconInfo from "../assets/images/mypage/icon-info.svg";
import loewe from "../assets/images/mypage/loewe.png";
import magazine1 from "../assets/images/mypage/magazine-1.png";
import magazine2 from "../assets/images/mypage/magazine-2.png";
import masion from "../assets/images/mypage/masion.png";
import matiere from "../assets/images/mypage/matiere.png";
import profile from "../assets/images/mypage/profile.png";
import recommend from "../assets/images/mypage/recommend.png";
import reviewCell1 from "../assets/images/mypage/review-tab/review-cell-1.png";
import reviewCell2 from "../assets/images/mypage/review-tab/review-cell-2.png";
import reviewCell3 from "../assets/images/mypage/review-tab/review-cell-3.png";
import reviewCell4 from "../assets/images/mypage/review-tab/review-cell-4.png";
import santamaria from "../assets/images/mypage/santamaria.png";

const pageTabs = ["마이페이지", "피드", "리뷰"];

const myPerfumes = [
  { img: matiere, brand: "MATIERE PREMIERE", name: "마티에 프리미에르 메탈 라벤더 오 드 퍼퓸 50ML" },
  { img: santamaria, brand: "Santa Maria Novella", name: "엔젤 디 피렌체 오드코롱 100ml" },
  { img: loewe, brand: "LOEWE PERFUMES", name: "로에베 아이레 수틸레사 오 드 뚜왈렛 50ML" },
];

const magazines = [
  { img: magazine1, label: "Scent Match", title: "계절별 향수 선택 가이드", desc: "봄, 여름, 가을 , 겨울 어떤 향이 어울릴까?" },
  { img: magazine2, label: "Scent Match", title: "New Fragrance Collection 2026", desc: "올해 가장 주목해야 할 새로운 향수들" },
];

const wishlist = [
  { img: masion, brand: "MAISON MARGIELA FRAGRANCES", name: "체이싱 선셋 EDT 30ml" },
  { img: bvlgari, brand: "BVLGARI PERFUME", name: "옴니아 아메시스트 오 드 뚜왈렛 100ml" },
  { img: buly, brand: "BULY", name: "이리 드 말트 75ml" },
];

const reviews = [
  { img: diptyque, title: "햇살 좋은 날의 베이지 룩" },
  { img: matiere, title: "깔끔한 라벤더 향" },
];

const recommends = [
  { img: recommend, name: "Juhoon", perfume: "Jass Club", comment: "잘생기셔서 이 향이 참 잘 어울리는 거 같아요" },
  { img: recommend, name: "Juhoon", perfume: "Jass Club", comment: "잘생기셔서 이 향이 참 잘 어울리는 거 같아요" },
];

// 피그마 list/profile: 2열 그리드, 칸당 244px, 해시태그는 사진 위 좌하단 오버레이
// 피드/리뷰 탭이 같은 틀(그리드)을 쓰고 내용만 다름
const feedPosts = [
  { img: feedCell1, hashtags: ["#밤산책", "#개굳"] },
  { img: feedCell2, hashtags: ["#밤산책", "#개굳"] },
  { img: feedCell3, hashtags: ["#밤산책", "#개굳"] },
  { img: feedCell4, hashtags: ["#밤산책", "#개굳"] },
];

const reviewPosts = [
  { img: reviewCell1, hashtags: ["#밤산책", "#개굳"] },
  { img: reviewCell2, hashtags: ["#밤산책", "#개굳"] },
  { img: reviewCell3, hashtags: ["#밤산책", "#개굳"] },
  { img: reviewCell4, hashtags: ["#밤산책", "#개굳"] },
];

// 마우스 드래그로도 가로 스크롤 가능하게 (Home.jsx와 동일 패턴, 스크롤바는 index.css의 no-scrollbar로 숨김)
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

function MoreLink({ label = "전체보기", href }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (href) window.location.href = href;
      }}
      className="flex items-center gap-1.5"
    >
      <span className="text-body-regular-14 text-grey">{label}</span>
      <img src={chevronRightGrey} alt="" className="size-[18px]" />
    </button>
  );
}

// 피그마 list/profile — 피드/리뷰 탭 공용 틀: 2열 그리드, 칸당 244px, 해시태그 오버레이
function PostGrid({ items }) {
  return (
    <div className="grid grid-cols-2">
      {items.map((item, i) => (
        <div key={i} className="relative flex h-[244px] items-end overflow-hidden p-4">
          <img src={item.img} alt="" className="absolute inset-0 size-full object-cover" />
          <div className="relative flex items-center gap-2">
            {item.hashtags.map((tag) => (
              <span key={tag} className="text-caption-regular-12 text-offwhite">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FaqCard({ icon, label }) {
  return (
    <button
      type="button"
      className="flex w-full cursor-default items-center gap-3 rounded-2xl border-[0.8px] border-light-grey bg-offwhite p-3"
    >
      <span className="flex size-[30px] items-center justify-center rounded-full bg-offblack">
        <img src={icon} alt="" className="size-4" />
      </span>
      <span className="text-body-medium-14 text-offblack">{label}</span>
    </button>
  );
}

export default function Mypage() {
  const [activeTab, setActiveTab] = useState("마이페이지");
  const perfumeDrag = useDragScroll();
  const magazineDrag = useDragScroll();

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-background pb-[104px]">
      {/* background + profile — 배경(305px) 중 프로필 카드에 가려지지 않고 보이는 높이가 210px */}
      <div className="relative h-[305px] w-full overflow-hidden">
        <img src={background} alt="" className="absolute inset-0 size-full object-cover" />
        <LayerBadge className="absolute top-5 right-5" />
      </div>

      {/* 배경 이미지 위 흰 카드: 프로필 + 카테고리 탭만 흰 배경(offwhite), 그 아래 콘텐츠 영역은 페이지 배경색(background) */}
      <div className="relative -mt-[95px] overflow-hidden rounded-t-3xl">
        {/* sec/profile */}
        <div className="flex flex-col gap-6 bg-offwhite p-5">
          <div className="flex items-center gap-[18px]">
            <img src={profile} alt="" className="size-20 shrink-0 rounded-full object-cover" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p className="text-title-semibold-18 text-offblack">북극곰</p>
                <span className="flex items-center gap-0.5">
                  <img src={badgeNewbie} alt="" className="size-4 object-contain" />
                  <span className="text-body-medium-14 text-subtext">NEWBIE</span>
                </span>
              </div>
              <div className="flex items-center gap-3 text-caption-medium-12">
                <p className="text-subtext">
                  팔로워 <span className="text-offblack">12</span>
                </p>
                <p className="text-subtext">
                  팔로잉 <span className="text-offblack">2</span>
                </p>
              </div>
            </div>
          </div>
          <BtnBig>프로필 편집</BtnBig>
        </div>

        {/* category tabs */}
        <Category variant="page" items={pageTabs} active={activeTab} onChange={setActiveTab} />

        {/* content */}
        {activeTab !== "마이페이지" ? (
          <PostGrid items={activeTab === "피드" ? feedPosts : reviewPosts} />
        ) : (
        <div className="flex flex-col gap-[60px] bg-background px-5 py-6">
          {/* sec/grade + test */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-6 rounded-2xl border border-light-grey bg-offwhite p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={badgeNewbie} alt="" className="h-[59px] w-[60px] object-contain" />
                  <div className="flex flex-col">
                    <p className="text-title-medium-20 text-offblack">NEWBIE</p>
                    <p className="flex items-center gap-1 text-body-regular-14 text-grey">
                      포인트 <span className="text-body-medium-14 text-point-orange">1,200</span>
                    </p>
                  </div>
                </div>
                <BtnSmall variant="white">멤버십 등급 보기</BtnSmall>
              </div>
              <p className="pl-1.5 text-body-regular-14 text-grey">
                <span className="text-body-semibold-16 text-offblack">800P</span> 더 쌓으면 다음
                등급으로 올라갈 수 있어요!
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/onboarding";
              }}
              className="flex h-[43px] items-center justify-between rounded-lg bg-offblack px-3"
            >
              <span className="text-body-medium-14 text-offwhite">
                <span className="font-en">My LAYER</span> 다시하기
              </span>
              <img src={chevronRightWhite} alt="" className="size-[18px]" />
            </button>
          </div>

          {/* 내 향수 관리하기 ~ FAQ: 60px 간격 묶음 */}
          <div className="flex flex-col gap-[60px]">
            {/* sec/perfumes */}
            <div className="flex flex-col gap-[30px]">
              <TitleSection
                variant="button"
                title="내 향수 관리하기"
                onMore={() => {
                  window.location.href = "/mypage/perfumes";
                }}
              />
              <div
                className="no-scrollbar -mx-5 flex touch-pan-x select-none gap-4 overflow-x-auto px-5 [&_img]:pointer-events-none [&_img]:select-none"
                {...perfumeDrag}
              >
                {myPerfumes.map((item) => (
                  <div
                    key={item.name}
                    className="flex shrink-0 flex-col items-center gap-[30px] rounded-2xl border border-light-grey bg-offwhite px-5 pt-5 pb-[30px]"
                  >
                    <div className="flex size-[120px] items-center justify-center overflow-hidden rounded-lg">
                      <img src={item.img} alt="" className="h-[100px] w-auto object-contain" />
                    </div>
                    <div className="flex w-[170px] flex-col items-center gap-1">
                      <p className="truncate text-body-semibold-16 text-offblack">{item.brand}</p>
                      <p className="w-full truncate text-center text-caption-medium-12 text-grey">
                        {item.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* sec/magazine */}
            <div className="flex flex-col items-center gap-[30px]">
              <h3 className="w-full text-title-semibold-24 text-offblack">최근 본 매거진</h3>
              <div
                className="no-scrollbar -mx-5 flex touch-pan-x select-none self-stretch gap-4 overflow-x-auto px-5 [&_img]:pointer-events-none [&_img]:select-none"
                {...magazineDrag}
              >
                {magazines.map((item) => (
                  <MagListCard key={item.title} {...item} className="shrink-0" />
                ))}
              </div>
            </div>

            {/* sec/wishlist */}
            <div className="flex flex-col items-center gap-[30px]">
              <div className="flex w-full items-center justify-between">
                <h3 className="text-title-semibold-24 text-offblack">위시리스트</h3>
                <MoreLink href="/mypage/wishlist" />
              </div>
              <div className="flex w-full flex-col gap-4">
                {wishlist.map((item) => (
                  <CardSmall key={item.name} variant="medium-b" showHeart {...item} />
                ))}
              </div>
            </div>

            {/* sec/review */}
            <div className="flex flex-col items-center gap-[30px]">
              <div className="flex w-full items-center justify-between">
                <h3 className="text-title-semibold-24 text-offblack">내 리뷰 관리하기</h3>
                <MoreLink href="/mypage/reviews" />
              </div>
              <div className="flex w-full flex-col gap-4">
                {reviews.map((item) => (
                  <div
                    key={item.title}
                    className="flex w-full items-start gap-3 rounded-2xl border-[0.8px] border-light-grey bg-offwhite p-3"
                  >
                    <div className="flex size-[60px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-2light-grey">
                      <img src={item.img} alt="" className="h-[40px] w-auto object-contain" />
                    </div>
                    <div className="flex flex-col justify-center gap-1.5">
                      <Badge variant="good" />
                      <p className="text-body-medium-14 text-offblack">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* sec/perfumerecommend */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-title-semibold-24 text-offblack">추천향수</h3>
                <div className="flex items-center gap-2">
                  <TabSub variant="b" />
                  <TabSub variant="a" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {recommends.map((item, i) => (
                  <CardSmall key={i} variant="medium-recommend" {...item} />
                ))}
              </div>
            </div>

            {/* sec/info */}
            <div className="flex flex-col gap-4">
              <FaqCard icon={iconHelp} label="고객센터" />
              <FaqCard icon={iconInfo} label="계정정보" />
            </div>
          </div>
        </div>
        )}
      </div>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 px-5 pb-5">
        <BottomNav active="my" />
      </div>
    </div>
  );
}
