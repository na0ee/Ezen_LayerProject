import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import byredoBlancheProduct from "../../assets/Community/product-byredo-blanche.png";
import diptyqueEauRoseProduct from "../../assets/Community/product-diptyque-eau-rose.png";
import joMaloneEnglishPearProduct from "../../assets/Community/product-jo-malone-english-pear.png";
import lazySundayMorningProduct from "../../assets/Community/product-lazy-sunday-morning.png";
import leLaboSantal33Product from "../../assets/Community/product-le-labo-santal-33.png";
import profileCottonScent from "../../assets/Community/Profile/profile-cotton-scent.png";
import profileHaesu from "../../assets/Community/Profile/profile-haesu-v2.png";
import profileWoodyCollector from "../../assets/Community/Profile/profile-woody-collector.png";
import beigeLookImage from "../../assets/Community/review-beige-look.png";
import lazySundayMorningImage from "../../assets/Community/review-lazy-sunday-morning.png";
import santal33Image from "../../assets/Community/review-santal-33.png";
import {
  BottomNav,
  Con2,
  Header,
  Search,
} from "../../components/common";
import type { CommunityUserPost } from "./communityUserPosts";
import { getUserProfile } from "../../data/userProfile";

type ProductTagProps = {
  brandName: string;
  left: string;
  perfumeId: number;
  productName: string;
  productImage: string;
  top: number;
};

function DraggableProductTag({
  brandName,
  left,
  perfumeId,
  productName,
  productImage,
  top,
}: ProductTagProps) {
  const navigate = useNavigate();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef({
    active: false,
    dragged: false,
    pointerId: 0,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
  });

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    drag.current = {
      active: true,
      dragged: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!drag.current.active || drag.current.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - drag.current.startX;
    const deltaY = event.clientY - drag.current.startY;
    if (Math.hypot(deltaX, deltaY) > 4) drag.current.dragged = true;
    if (!drag.current.dragged) return;
    setOffset({
      x: drag.current.offsetX + deltaX,
      y: drag.current.offsetY + deltaY,
    });
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!drag.current.active || drag.current.pointerId !== event.pointerId) return;
    drag.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (drag.current.dragged) {
      event.preventDefault();
      drag.current.dragged = false;
      return;
    }
    navigate(`/perfume/${perfumeId}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="absolute flex touch-none select-none flex-col items-center gap-[2px]"
      style={{
        left,
        top,
        transform: `translate(calc(-50% + ${offset.x}px), ${offset.y}px)`,
      }}
    >
      <span className="community-review-product-tag flex w-[155px] items-center gap-2 rounded-lg bg-offblack70 p-2">
        <span className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-2light-grey">
          <img
            src={productImage}
            alt=""
            draggable="false"
            className="size-full object-contain"
          />
        </span>
        <span className="flex flex-col gap-1 text-left">
          <span className="text-caption-medium-12 font-normal text-2light-grey">
            {brandName}
          </span>
          <span className="text-caption-medium-12 font-normal text-offwhite">
            {productName}
          </span>
        </span>
      </span>
      <span
        aria-hidden="true"
        className="community-review-product-marker relative block size-3 rounded-full bg-point-orange"
      >
        <span className="absolute left-1/2 top-1/2 h-[1.5px] w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-offwhite" />
        <span className="absolute left-1/2 top-1/2 h-1.5 w-[1.5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-offwhite" />
      </span>
    </button>
  );
}

function ProductOverlay({ tags }: { tags: readonly ProductTagProps[] }) {
  return (
    <div className="community-review-card__product-overlays absolute inset-0">
      {tags.map((tag) => (
        <DraggableProductTag key={tag.perfumeId} {...tag} />
      ))}
    </div>
  );
}

const firstReviewTags = [
    {
      brandName: "Diptyque",
      left: "30%",
      top: 29,
      perfumeId: 36,
      productName: "오 로즈 오 드 퍼퓸",
      productImage: diptyqueEauRoseProduct,
    },
    {
      brandName: "Byredo",
      left: "70%",
      top: 91,
      perfumeId: 21,
      productName: "블랑쉬 오 드 퍼퓸",
      productImage: byredoBlancheProduct,
    },
    {
      brandName: "Jo Malone London",
      left: "52%",
      top: 181,
      perfumeId: 16,
      productName: "블랙베리 앤 베이 코롱",
      productImage: joMaloneEnglishPearProduct,
    },
] as const;

const secondReviewTags = [
    {
      brandName: "Le Labo",
      left: "38%",
      top: 80,
      perfumeId: 27,
      productName: "상탈 33",
      productImage: leLaboSantal33Product,
    },
] as const;

const thirdReviewTags = [
    {
      brandName: "Maison Margiela",
      left: "67%",
      top: 64,
      perfumeId: 1,
      productName: "레이지 선데이 모닝",
      productImage: lazySundayMorningProduct,
    },
] as const;

const reviewPosts = [
  {
    id: "beige-look",
    profileName: "최해수",
    profileTime: "30분 전",
    profileImage: profileHaesu,
    image: beigeLookImage,
    productTags: firstReviewTags,
    title: "햇살 좋은 날의 베이지 룩",
    text: "따뜻한 햇살엔 부드럽고 깨끗한 향이 잘 어울리는 것 같아요. 블랑쉬로 포근하게 시작해서 오 로즈로 기분 전환해주고 마지막엔 잉글리쉬 페어로 잔향을 남겨줘요. 하루 종일 기분이 좋아지는 조합이에요.",
    keywords: ["데일리향수", "베이지룩", "플로럴머스크", "지속력좋아요"],
    likes: 42,
    comments: 8,
  },
  {
    id: "santal-33",
    profileName: "우디수집가",
    profileTime: "1시간 전",
    profileImage: profileWoodyCollector,
    image: santal33Image,
    productTags: secondReviewTags,
    title: "퇴근하고 나한테 주는 상",
    text: "상탈33은 아껴 쓰게 되는 향이에요. 하루 끝나고 손목에 한 번 뿌리면 이상하게 마음이 가라앉아요. 우디 입문으로도 추천.",
    keywords: ["우디", "가을", "퇴근후"],
    likes: 35,
    comments: 6,
  },
  {
    id: "lazy-sunday-morning",
    profileName: "솜이불향",
    profileTime: "3시간 전",
    profileImage: profileCottonScent,
    image: lazySundayMorningImage,
    productTags: thirdReviewTags,
    title: "이불 냄새를 향수로 만든다면",
    text: "레이지 선데이 모닝은 자기 전에 뿌리는 향수예요. 갓 세탁한 이불에 파묻히는 느낌. 수면향 찾으시는 분들께 강추.",
    keywords: ["머스크", "잠들기전", "포근함", "지속력좋아요"],
    likes: 28,
    comments: 4,
  },
] as const;

const communityTabs = ["리뷰", "질문", "챌린지", "향 추천"] as const;

interface CommunityReviewPageProps {
  onTabChange?: (tab: (typeof communityTabs)[number]) => void;
  onWrite?: () => void;
  userPosts?: CommunityUserPost[];
  onDeletePost?: (postId: string) => void;
}

export default function CommunityReviewPage({
  onTabChange,
  onWrite,
  userPosts = [],
  onDeletePost,
}: CommunityReviewPageProps) {
  const navigate = useNavigate();
  const userProfile = getUserProfile();

  return (
    <main className="community-review-page min-h-[100dvh] bg-subtext">
      <div className="community-review-page__wrap mx-auto min-h-[100dvh] w-full max-w-[430px] bg-background pb-28">
        <section className="community-review-header bg-offwhite">
          <Header
            variant="community"
            title="커뮤니티"
            onEdit={onWrite}
          />
          <div className="community-review-header__search px-5 py-3">
            <Search variant="no-icon" />
          </div>
          <nav
            aria-label="커뮤니티 카테고리"
            className="community-review-tabs flex items-end gap-6 border-b border-light-grey px-5 pt-4"
          >
            {communityTabs.map((tab) => {
              const isActive = tab === "리뷰";

              return (
                <button
                  type="button"
                  key={tab}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => onTabChange?.(tab)}
                  className={`community-review-tabs__item flex shrink-0 items-start justify-center whitespace-nowrap border-b-2 pb-[11.5px] text-center text-body-medium-16 ${
                    isActive
                      ? "border-point-orange text-offblack"
                      : "border-transparent text-grey"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </nav>
        </section>

        <section
          aria-label="커뮤니티 리뷰 피드"
          className="community-review-feed flex flex-col gap-[12px]"
        >
          {userPosts.map((post) => (
            <article
              key={post.id}
              className="community-review-card rounded-t-2xl"
            >
              <Con2
                profileName={userProfile.nickname}
                profileTime="방금 전"
                profileImg={userProfile.image}
                imgs={post.images}
                title={post.title}
                text={post.text}
                keywords={post.keywords}
                likes={0}
                comments={0}
                commentKey={post.id}
                onDelete={() => onDeletePost?.(post.id)}
                className="rounded-t-2xl"
              />
            </article>
          ))}
          {reviewPosts.map((post) => (
            <article
              key={post.id}
              className={`community-review-card community-review-card--${post.id}`}
            >
              <Con2
                profileName={post.profileName}
                profileTime={post.profileTime}
                profileImg={post.profileImage}
                imgs={[post.image]}
                imageOverlay={<ProductOverlay tags={post.productTags} />}
                toggleImageOverlay
                title={post.title}
                text={post.text}
                keywords={[...post.keywords]}
                likes={post.likes}
                comments={post.comments}
                commentKey={post.id}
                onProfileClick={() =>
                  navigate(`/community/profile/${post.id}`, {
                    state: {
                      profile: {
                        name: post.profileName,
                        image: post.profileImage,
                      },
                    },
                  })
                }
                className={
                  post.id === "beige-look" ? "" : "rounded-t-2xl"
                }
              />
            </article>
          ))}
        </section>

        <div className="community-review-bottom-nav fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 px-5 pb-5">
          <BottomNav active="community" />
        </div>

      </div>
    </main>
  );
}
