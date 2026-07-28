import type { ReactNode } from "react";
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

type ProductTagProps = {
  brandName: string;
  className: string;
  markerClassName: string;
  productName: string;
  productImage: string;
};

function renderProductTag({
  brandName,
  className,
  markerClassName,
  productName,
  productImage,
}: ProductTagProps): ReactNode {
  return (
    <div className={`absolute ${className}`}>
      <div
        className="community-review-product-tag flex w-[155px] items-center gap-2 rounded-lg bg-offblack70 p-2"
      >
        <span className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-2light-grey">
          <img
            src={productImage}
            alt=""
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
      </div>
      <span
        aria-hidden="true"
        className={`community-review-product-marker absolute top-[calc(100%+6px)] flex size-3 items-center justify-center rounded-full bg-point-orange text-caption-semibold-10 leading-none text-offwhite ${markerClassName}`}
      >
        +
      </span>
    </div>
  );
}

const firstReviewOverlay = (
  <div className="community-review-card__product-overlays absolute inset-0">
    {renderProductTag({
      brandName: "Diptyque",
      className: "left-[51px] top-[29px]",
      markerClassName: "left-[69px]",
      productName: "오 로즈 오 드 퍼퓸",
      productImage: diptyqueEauRoseProduct,
    })}
    {renderProductTag({
      brandName: "Byredo",
      className: "left-[206px] top-[91px]",
      markerClassName: "left-[73px]",
      productName: "블랑쉬 오 드 퍼퓸",
      productImage: byredoBlancheProduct,
    })}
    {renderProductTag({
      brandName: "Jo Malone London",
      className: "left-[146px] top-[181px]",
      markerClassName: "left-[72px]",
      productName: "블랙베리 앤 베이 코롱",
      productImage: joMaloneEnglishPearProduct,
    })}
  </div>
);

const secondReviewOverlay = (
  <div className="community-review-card__product-overlays absolute inset-0">
    {renderProductTag({
      brandName: "Le Labo",
      className: "left-10 top-20",
      markerClassName: "left-[158px]",
      productName: "상탈 33",
      productImage: leLaboSantal33Product,
    })}
  </div>
);

const thirdReviewOverlay = (
  <div className="community-review-card__product-overlays absolute inset-0">
    {renderProductTag({
      brandName: "Maison Margiela",
      className: "right-2 top-16",
      markerClassName: "-left-[69px]",
      productName: "REPLICA",
      productImage: lazySundayMorningProduct,
    })}
  </div>
);

const reviewPosts = [
  {
    id: "beige-look",
    profileName: "최해수",
    profileTime: "30분 전",
    profileImage: profileHaesu,
    image: beigeLookImage,
    imageOverlay: firstReviewOverlay,
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
    imageOverlay: secondReviewOverlay,
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
    imageOverlay: thirdReviewOverlay,
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
}

export default function CommunityReviewPage({
  onTabChange,
  onWrite,
}: CommunityReviewPageProps) {
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
                imageOverlay={post.imageOverlay}
                title={post.title}
                text={post.text}
                keywords={[...post.keywords]}
                likes={post.likes}
                comments={post.comments}
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
