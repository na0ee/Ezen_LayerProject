import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Badge,
  BottomNav,
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
import { allPerfumes } from "../data/perfumeUtils";
import badgeNewbie from "../assets/images/grade-badge/badge-newbie.png";
import background from "../assets/images/mypage/background.png";
import diptyque from "../assets/images/mypage/diptyque.png";
import feedCell1 from "../assets/images/mypage/feed/feed-cell-1.png";
import feedCell2 from "../assets/images/mypage/feed/feed-cell-2.png";
import feedCell3 from "../assets/images/mypage/feed/feed-cell-3.png";
import feedCell4 from "../assets/images/mypage/feed/feed-cell-4.png";
import iconHelp from "../assets/images/mypage/icon-help.svg";
import iconInfo from "../assets/images/mypage/icon-info.svg";
import magazine1 from "../assets/images/mypage/magazine-1.png";
import magazine2 from "../assets/images/mypage/magazine-2.png";
import matiere from "../assets/images/mypage/matiere.png";
import { getUserProfile } from "../data/userProfile";
import { ONBOARDING_RESULTS } from "../data/onboardingResults";
import { getSavedOnboardingResultType } from "../data/onboardingProfile";
import { getUserPoints } from "../data/userPoints";
import reviewCell1 from "../assets/images/mypage/review-tab/review-cell-1.png";
import reviewCell2 from "../assets/images/mypage/review-tab/review-cell-2.png";
import reviewCell3 from "../assets/images/mypage/review-tab/review-cell-3.png";
import reviewCell4 from "../assets/images/mypage/review-tab/review-cell-4.png";
import usePerfumeWishlist from "../hooks/usePerfumeWishlist";

const pageTabs = ["마이페이지", "향수추천", "리뷰"];

const perfumeById = (id) => allPerfumes.find((item) => item.id === id);

const myPerfumes = [27, 46, 32].map(perfumeById).filter(Boolean);

const magazines = [
  { path: "/magazine/season", img: magazine1, label: "Scent Match", title: "계절별 향수 선택 가이드", desc: "봄, 여름, 가을 , 겨울 어떤 향이 어울릴까?" },
  { path: "/magazine/collection", img: magazine2, label: "Scent Match", title: "New Fragrance Collection 2026", desc: "올해 가장 주목해야 할 새로운 향수들" },
];

const reviews = [
  { img: diptyque, title: "햇살 좋은 날의 베이지 룩" },
  { img: matiere, title: "깔끔한 라벤더 향" },
];

// TabSub "b"(추천받은) / "a"(내가 추천한) 탭에 따라 보여줄 목록을 분리
const recommendsReceived = [
  {
    perfumeId: 41,
    img: perfumeById(41).img,
    name: "북극곰",
    perfume: perfumeById(41).name,
    comment: "부드럽고 화사한 분위기가 잘 어울릴 것 같아요",
  },
  {
    perfumeId: 17,
    img: perfumeById(17).img,
    name: "북극곰",
    perfume: perfumeById(17).name,
    comment: "편안하고 자연스러운 분위기에 잘 어울릴 것 같아요",
  },
];
const recommendsGiven = [
  {
    perfumeId: 3,
    img: perfumeById(3).img,
    name: "Juhoon",
    perfume: perfumeById(3).name,
    comment: "깊고 분위기 있는 향이 잘 어울리는 것 같아요",
  },
  {
    perfumeId: 5,
    img: perfumeById(5).img,
    name: "거노노",
    perfume: perfumeById(5).name,
    comment: "시원하고 청량한 분위기가 잘 어울릴 것 같아요",
  },
];

// 피그마 list/profile: 2열 그리드, 칸당 244px, 해시태그는 사진 위 좌하단 오버레이
// 피드/리뷰 탭이 같은 틀(그리드)을 쓰고 내용만 다름
const feedPosts = [
  {
    id: "my-night-walk",
    img: feedCell1,
    hashtags: ["#밤산책", "#우디향수"],
    title: "밤 산책에 어울리는 향을 찾고 있어요",
    text: "선선한 밤공기와 잘 어울리는 차분한 우디 향을 추천해주세요.",
  },
  {
    id: "my-warm-sunlight",
    img: feedCell2,
    hashtags: ["#햇살무드", "#포근한향"],
    title: "따뜻한 햇살 같은 향이 궁금해요",
    text: "부드럽고 포근하게 오래 남는 향수를 찾고 있어요.",
  },
  {
    id: "my-daily-mood",
    img: feedCell3,
    hashtags: ["#데일리향수", "#클린머스크"],
    title: "매일 편하게 뿌릴 향을 추천해주세요",
    text: "부담 없이 사용할 수 있는 깨끗한 머스크 향이면 좋겠어요.",
  },
  {
    id: "my-weekend-outing",
    img: feedCell4,
    hashtags: ["#주말나들이", "#시트러스"],
    title: "주말 나들이에 어울리는 향 찾아요",
    text: "가볍고 산뜻해서 기분 전환이 되는 향수를 추천받고 싶어요.",
  },
];

const reviewPosts = [
  {
    id: "my-cozy-musk-review",
    img: reviewCell1,
    hashtags: ["#머스크", "#포근함"],
    title: "포근한 머스크 향을 써봤어요",
    text: "깨끗하게 시작해서 부드러운 머스크로 남는 잔향이 마음에 들었어요. 매일 편하게 사용하기 좋은 향이에요.",
    likes: 42,
    comments: 8,
    perfumeIds: [36, 21, 16],
  },
  {
    id: "my-woody-review",
    img: reviewCell2,
    hashtags: ["#우디", "#데일리"],
    title: "매일 손이 가는 차분한 우디 향",
    text: "무겁지 않고 은은하게 남아서 출근할 때 자주 사용하고 있어요.",
    likes: 35,
    comments: 6,
    perfumeIds: [27, 32],
  },
  {
    id: "my-citrus-review",
    img: reviewCell3,
    hashtags: ["#시트러스", "#산뜻함"],
    title: "기분 전환에 좋은 시트러스 향",
    text: "상큼한 첫 향 덕분에 더운 날에도 부담 없이 사용하기 좋았습니다.",
    likes: 28,
    comments: 4,
    perfumeIds: [4, 28],
  },
  {
    id: "my-floral-review",
    img: reviewCell4,
    hashtags: ["#플로럴", "#은은함"],
    title: "은은하게 오래 남는 플로럴",
    text: "꽃향이 과하지 않고 피부에 부드럽게 남아서 편안하게 사용할 수 있어요.",
    likes: 31,
    comments: 5,
    perfumeIds: [37, 7],
  },
];

// 마우스 드래그로도 가로 스크롤 가능하게 (Home.jsx와 동일 패턴, 스크롤바는 index.css의 no-scrollbar로 숨김)
function useDragScroll() {
  const drag = useRef({ active: false, dragged: false, startX: 0, scrollLeft: 0 });

  const onPointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const element = event.currentTarget;
    drag.current = {
      active: true,
      dragged: false,
      startX: event.clientX,
      scrollLeft: element.scrollLeft,
    };
  };

  const onPointerMove = (event) => {
    if (!drag.current.active) return;
    const distance = event.clientX - drag.current.startX;
    if (!drag.current.dragged && Math.abs(distance) > 8) {
      drag.current.dragged = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (!drag.current.dragged) return;
    event.currentTarget.scrollLeft =
      drag.current.scrollLeft - distance;
  };

  const stopDragging = (event) => {
    if (!drag.current.active) return;
    drag.current.active = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onClickCapture = (event) => {
    if (!drag.current.dragged) return;
    event.preventDefault();
    event.stopPropagation();
    drag.current.dragged = false;
  };

  return {
    onDragStart: (event) => event.preventDefault(),
    onClickCapture,
    onPointerDown,
    onPointerMove,
    onPointerUp: stopDragging,
    onPointerCancel: stopDragging,
  };
}

function MoreLink({ label = "전체보기", onClick, className = "" }) {
  return (
    <button type="button" onClick={onClick} className={`flex items-center gap-1.5 ${className}`}>
      <span className="text-body-regular-14 text-grey">{label}</span>
      <img src={chevronRightGrey} alt="" className="size-4.5" />
    </button>
  );
}

// 피그마 list/profile — 피드/리뷰 탭 공용 틀: 2열 그리드, 칸당 244px, 해시태그 오버레이
function PostGrid({ items, onItemClick }) {
  return (
    <div className="grid grid-cols-2">
      {items.map((item, i) => (
        <button
          type="button"
          key={item.id ?? i}
          onClick={() => onItemClick?.(item)}
          className="relative flex h-61 items-end overflow-hidden p-4"
        >
          <img src={item.img} alt="" className="absolute inset-0 size-full object-cover" />
          <div className="relative flex items-center gap-2">
            {item.hashtags.map((tag) => (
              <span key={tag} className="text-caption-regular-12 text-offwhite">
                {tag}
              </span>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}

function FaqCard({ icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl border-[0.8px] border-light-grey bg-offwhite p-3"
    >
      <span className="flex size-7.5 items-center justify-center rounded-full bg-offblack">
        <img src={icon} alt="" className="size-4" />
      </span>
      <span className="text-body-medium-14 text-offblack">{label}</span>
    </button>
  );
}

function PreparingModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-offblack/35 px-10"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="preparing-modal-title"
        className="flex w-full max-w-80 flex-col items-center gap-5 rounded-2xl bg-offwhite px-6 py-7 text-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col gap-2">
          <h2 id="preparing-modal-title" className="text-title-semibold-18 text-offblack">
            페이지 준비 중
          </h2>
          <p className="text-body-regular-14 text-grey">
            페이지를 준비중입니다.
          </p>
        </div>
        <BtnSmall onClick={onClose}>확인</BtnSmall>
      </section>
    </div>
  );
}

export default function Mypage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ids: wishlistIds, isWishlisted, toggleWishlist } =
    usePerfumeWishlist();
  const wishlist = wishlistIds.map(perfumeById).filter(Boolean);
  const wishlistPreview = wishlist.slice(0, 3);
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab ?? "마이페이지",
  );
  const [activeRecommendTab, setActiveRecommendTab] = useState("b");
  const [isPreparingOpen, setIsPreparingOpen] = useState(false);
  const [userPoints] = useState(getUserPoints);
  const recommends = activeRecommendTab === "b" ? recommendsReceived : recommendsGiven;
  const perfumeDrag = useDragScroll();
  const magazineDrag = useDragScroll();
  const userProfile = getUserProfile();
  const onboardingResult =
    ONBOARDING_RESULTS[getSavedOnboardingResultType()] ??
    ONBOARDING_RESULTS["mood-shifter"];

  return (
    <div className="mx-auto min-h-screen w-full max-w-107.5 bg-background pb-26">
      {/* background + profile — 배경(305px) 중 프로필 카드에 가려지지 않고 보이는 높이가 210px */}
      <div className="relative h-76.25 w-full overflow-hidden">
        <img src={background} alt="" className="absolute inset-0 size-full object-cover" />
        <LayerBadge className="absolute right-5 top-[calc(20px+env(safe-area-inset-top))]">
          {onboardingResult.englishTitle}
        </LayerBadge>
      </div>

      {/* 배경 이미지 위 흰 카드: 프로필 + 카테고리 탭만 흰 배경(offwhite), 그 아래 콘텐츠 영역은 페이지 배경색(background) */}
      <div className="relative -mt-23.75 overflow-hidden rounded-t-3xl">
        {/* sec/profile */}
        <div className="flex items-center justify-between gap-4.5 bg-offwhite p-5">
          <div className="flex items-center gap-4.5">
            <img src={userProfile.image} alt="" className="size-20 shrink-0 rounded-full object-cover" />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="text-title-semibold-18 text-offblack">{userProfile.nickname}</p>
                <span className="flex items-center gap-0.5">
                  <img src={badgeNewbie} alt="" className="size-4 object-contain" />
                  <span className="text-body-medium-14 text-subtext">NEWBIE</span>
                </span>
              </div>
              <div className="flex items-center gap-3 text-body-medium-14">
                <p className="text-subtext">
                  팔로워 <span className="text-offblack">12</span>
                </p>
                <p className="text-subtext">
                  팔로잉 <span className="text-offblack">2</span>
                </p>
              </div>
            </div>
          </div>
          <BtnSmall
            variant="white"
            onClick={() =>
              navigate("/profile", {
                state: { mode: "edit", returnTo: "/my" },
              })
            }
          >
            프로필 편집
          </BtnSmall>
        </div>

        {/* category tabs */}
        <Category variant="page" items={pageTabs} active={activeTab} onChange={setActiveTab} />

        {/* content */}
        {activeTab !== "마이페이지" ? (
          <PostGrid
            items={activeTab === "향수추천" ? feedPosts : reviewPosts}
            onItemClick={(post) =>
              navigate(`/community/post/${post.id}`, {
                state: {
                  returnTo: "/my",
                  returnTab: activeTab,
                  post: {
                    type:
                      activeTab === "향수추천" ? "recommendation" : "review",
                    profileName: userProfile.nickname,
                    profileImage: userProfile.image,
                    time: "30분 전",
                    image: post.img,
                    mood:
                      activeTab === "향수추천" ? "Mood Shifter" : undefined,
                    title: post.title,
                    text: post.text,
                    likes: post.likes,
                    comments: post.comments,
                    badge: "good",
                    perfumeIds: post.perfumeIds,
                    keywords: post.hashtags.map((tag) =>
                      tag.replace(/^#/, ""),
                    ),
                  },
                },
              })
            }
          />
        ) : (
        <div className="flex flex-col gap-15 bg-background px-5 py-6">
          {/* sec/grade + test */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-6 rounded-2xl border border-light-grey bg-offwhite p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={badgeNewbie} alt="" className="h-14.75 w-15 object-contain" />
                  <div className="flex flex-col">
                    <p className="text-title-medium-20 text-offblack">NEWBIE</p>
                    <p className="flex items-center gap-1 text-body-regular-14 text-grey">
                      포인트{" "}
                      <span className="text-body-medium-14 text-point-orange">
                        {userPoints.toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
                <BtnSmall
                  variant="white"
                  onClick={() => navigate("/mypage/membership", { state: { backgroundLocation: location } })}
                >
                  멤버십 등급 보기
                </BtnSmall>
              </div>
              <p className="pl-1.5 text-body-regular-14 text-grey">
                <span className="text-body-semibold-16 text-offblack">
                  {Math.max(0, 2000 - userPoints).toLocaleString()}P
                </span>{" "}
                더 쌓으면 다음
                등급으로 올라갈 수 있어요!
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                navigate("/onboarding/1", { state: { returnTo: "/my" } })
              }
              className="flex h-10.75 items-center justify-between rounded-lg bg-offblack px-3"
            >
              <span className="text-body-medium-14 text-offwhite">
                <span className="font-en">My LAYER</span> 다시하기
              </span>
              <img src={chevronRightWhite} alt="" className="size-4.5" />
            </button>
          </div>

          {/* 내 향수 관리하기 ~ FAQ: 60px 간격 묶음 */}
          <div className="flex flex-col gap-15">
            {/* sec/perfumes */}
            <div className="flex flex-col gap-7.5">
              <TitleSection
                variant="button"
                title="내 향수 관리하기"
                onMore={() => navigate("/mypage/perfumes")}
              />
              <div
                className="no-scrollbar -mx-5 flex touch-auto select-none gap-4 overflow-x-auto px-5 [&_img]:pointer-events-none [&_img]:select-none"
                {...perfumeDrag}
              >
                {myPerfumes.map((item) => (
                  <button
                    type="button"
                    key={item.name}
                    onClick={() => navigate(`/perfume/${item.id}`)}
                    className="flex shrink-0 flex-col items-center gap-7.5 rounded-2xl border border-light-grey bg-offwhite px-5 pt-5 pb-7.5"
                  >
                    <div className="flex size-30 items-center justify-center overflow-hidden rounded-lg">
                      <img src={item.img} alt="" className="h-25 w-auto object-contain" />
                    </div>
                    <div className="flex w-42.5 flex-col items-center gap-1">
                      <p className="truncate text-body-semibold-16 text-offblack">{item.brand}</p>
                      <p className="w-full truncate text-center text-caption-medium-12 text-grey">
                        {item.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* sec/magazine */}
            <div className="flex flex-col items-center gap-7.5">
              <h3 className="w-full text-title-semibold-24 text-offblack">최근 본 매거진</h3>
              <div
                className="no-scrollbar -mx-5 flex touch-auto select-none self-stretch gap-4 overflow-x-auto px-5 [&_img]:pointer-events-none [&_img]:select-none"
                {...magazineDrag}
              >
                {magazines.map((item) => (
                  <MagListCard
                    key={item.title}
                    {...item}
                    onClick={() => navigate(item.path)}
                    className="shrink-0"
                  />
                ))}
              </div>
            </div>

            {/* sec/wishlist */}
            <div className="flex flex-col items-center gap-7.5">
              <div className="flex w-full items-center justify-between">
                <h3 className="text-title-semibold-24 text-offblack">위시리스트</h3>
                <MoreLink onClick={() => navigate("/mypage/wishlist")} />
              </div>
              <div className="flex w-full flex-col gap-4">
                {wishlistPreview.map((item) => (
                  <CardSmall
                    key={item.name}
                    variant="medium-b"
                    showHeart
                    {...item}
                    liked={isWishlisted(item.id)}
                    onLike={() => toggleWishlist(item.id)}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/perfume/${item.id}`)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        navigate(`/perfume/${item.id}`);
                      }
                    }}
                  />
                ))}
              </div>
            </div>

            {/* sec/review */}
            <div className="flex flex-col items-center gap-7.5">
              <div className="flex w-full items-center justify-between">
                <h3 className="text-title-semibold-24 text-offblack">내 리뷰 관리하기</h3>
                <MoreLink onClick={() => navigate("/mypage/reviews")} />
              </div>
              <div className="flex w-full flex-col gap-4">
                {reviews.map((item) => (
                  <button
                    type="button"
                    key={item.title}
                    onClick={() => {
                      setActiveTab("리뷰");
                      window.scrollTo(0, 0);
                    }}
                    className="flex w-full items-start gap-3 rounded-2xl border-[0.8px] border-light-grey bg-offwhite p-3"
                  >
                    <div className="flex size-15 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-2light-grey">
                      <img src={item.img} alt="" className="h-10 w-auto object-contain" />
                    </div>
                    <div className="flex flex-col justify-center gap-1.5">
                      <Badge variant="good" />
                      <p className="text-body-medium-14 text-offblack">{item.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* sec/perfumerecommend */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-7.5">
                <div className="flex w-full items-center">
                  <h3 className="text-title-semibold-24 text-offblack">추천향수</h3>
                </div>
                <div className="flex items-center gap-2">
                  <TabSub
                    variant={activeRecommendTab === "b" ? "b" : "a"}
                    icon="b"
                    onClick={() => setActiveRecommendTab("b")}
                  >
                    추천받은
                  </TabSub>
                  <TabSub
                    variant={activeRecommendTab === "a" ? "b" : "a"}
                    icon="a"
                    onClick={() => setActiveRecommendTab("a")}
                  >
                    내가 추천한
                  </TabSub>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {recommends.map((item, i) => (
                  <CardSmall
                    key={i}
                    variant="medium-recommend"
                    imgFit="contain"
                    {...item}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/perfume/${item.perfumeId}`)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        navigate(`/perfume/${item.perfumeId}`);
                      }
                    }}
                  />
                ))}
              </div>
            </div>

            {/* sec/info */}
            <div className="flex flex-col gap-4">
              <FaqCard
                icon={iconHelp}
                label="고객센터"
                onClick={() => navigate("/chatbot")}
              />
              <FaqCard
                icon={iconInfo}
                label="계정정보"
                onClick={() => setIsPreparingOpen(true)}
              />
            </div>
          </div>
        </div>
        )}
      </div>

      <div className="fixed bottom-0 left-1/2 w-full max-w-107.5 -translate-x-1/2 px-5 pb-5">
        <BottomNav active="my" />
      </div>
      <PreparingModal
        open={isPreparingOpen}
        onClose={() => setIsPreparingOpen(false)}
      />
    </div>
  );
}
