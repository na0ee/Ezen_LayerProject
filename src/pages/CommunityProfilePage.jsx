import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  BottomNav,
  BtnBig,
  Category,
  LayerBadge,
} from "../components/common";
import badgeNewbie from "../assets/images/grade-badge/badge-newbie.png";
import background from "../assets/images/mypage/background.png";
import defaultProfile from "../assets/images/mypage/profile.png";
import feedCell1 from "../assets/images/mypage/feed/feed-cell-1.png";
import feedCell2 from "../assets/images/mypage/feed/feed-cell-2.png";
import feedCell3 from "../assets/images/mypage/feed/feed-cell-3.png";
import feedCell4 from "../assets/images/mypage/feed/feed-cell-4.png";
import reviewCell1 from "../assets/images/mypage/review-tab/review-cell-1.png";
import reviewCell2 from "../assets/images/mypage/review-tab/review-cell-2.png";
import reviewCell3 from "../assets/images/mypage/review-tab/review-cell-3.png";
import reviewCell4 from "../assets/images/mypage/review-tab/review-cell-4.png";
import { getCommunityGeneratedProfile } from "../data/communityGeneratedProfiles";

const tabs = ["향수추천", "리뷰"];
const emptyGeneratedPosts = [];
const profileBackgrounds = [
  background,
  feedCell1,
  feedCell2,
  feedCell3,
  feedCell4,
  reviewCell1,
  reviewCell2,
  reviewCell3,
  reviewCell4,
];

const hashProfileId = (value) =>
  [...value].reduce(
    (hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0,
    0,
  );

const shuffleForProfile = (items, seed) => {
  const next = [...items];
  let state = seed || 1;

  for (let index = next.length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const targetIndex = state % (index + 1);
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
  }

  return next;
};

const recommendationPosts = [
  {
    id: "night-walk",
    img: feedCell1,
    hashtags: ["#밤산책", "#차분한우디"],
    title: "밤 산책에 어울리는 향을 찾고 있어요",
    text: "선선한 밤공기와 잘 어울리는 차분한 우디 향을 추천해주세요.",
  },
  {
    id: "warm-sunlight",
    img: feedCell2,
    hashtags: ["#햇살무드", "#포근한향"],
    title: "따뜻한 햇살 같은 향이 궁금해요",
    text: "부드럽고 포근하게 오래 남는 향수를 찾고 있어요.",
  },
  {
    id: "daily-mood",
    img: feedCell3,
    hashtags: ["#데일리향수", "#클린머스크"],
    title: "매일 편하게 뿌릴 향을 추천해주세요",
    text: "부담 없이 사용할 수 있는 깨끗한 머스크 향이면 좋겠어요.",
  },
  {
    id: "weekend-outing",
    img: feedCell4,
    hashtags: ["#주말나들이", "#산뜻한향"],
    title: "주말 나들이에 어울리는 향 찾아요",
    text: "가볍고 산뜻해서 기분 전환이 되는 향수를 추천받고 싶어요.",
  },
];
const reviewPosts = [
  {
    id: "cozy-musk-review",
    img: reviewCell1,
    hashtags: ["#머스크", "#포근함"],
    title: "포근한 머스크 향을 써봤어요",
    text: "첫 향은 깨끗하고 산뜻하지만 잔향이 부드러운 머스크로 남아서 데일리로 사용하기 좋았어요.",
    likes: 42,
    comments: 8,
    perfumeIds: [36, 21, 16],
  },
  {
    id: "woody-daily-review",
    img: reviewCell2,
    hashtags: ["#우디", "#데일리"],
    title: "매일 손이 가는 차분한 우디 향",
    text: "무겁지 않은 우디 노트라 출근할 때도 부담 없이 사용하기 좋았습니다.",
    likes: 35,
    comments: 6,
    perfumeIds: [27, 32],
  },
  {
    id: "fresh-citrus-review",
    img: reviewCell3,
    hashtags: ["#시트러스", "#산뜻함"],
    title: "기분 전환에 좋은 시트러스 향",
    text: "상큼한 첫 향이 자연스럽게 잔잔해져서 더운 날 특히 잘 어울렸어요.",
    likes: 28,
    comments: 4,
    perfumeIds: [4, 28],
  },
  {
    id: "floral-review",
    img: reviewCell4,
    hashtags: ["#플로럴", "#은은함"],
    title: "은은하게 오래 남는 플로럴",
    text: "꽃향이 과하지 않고 피부에 부드럽게 남아서 편안하게 사용하고 있어요.",
    likes: 31,
    comments: 5,
    perfumeIds: [37, 7],
  },
];

function PostGrid({ items, onItemClick }) {
  return (
    <div className="grid grid-cols-2">
      {items.map((item, index) => (
        <button
          type="button"
          key={`${item.img}-${index}`}
          onClick={() => onItemClick?.(item)}
          className="relative flex h-61 items-end overflow-hidden p-4"
        >
          <img
            src={item.img}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
          <div className="relative flex gap-2">
            {item.hashtags.map((hashtag) => (
              <span
                key={hashtag}
                className="text-caption-regular-12 text-offwhite"
              >
                {hashtag}
              </span>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}

export default function CommunityProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profileId = "community-user" } = useParams();
  const profile = location.state?.profile ?? {};
  const [activeTab, setActiveTab] = useState("향수추천");
  const [isFollowing, setIsFollowing] = useState(false);
  const profileKey = `${profileId}-${profile.name ?? "community-user"}`;
  const profileSeed = hashProfileId(profileKey);
  const generatedProfile = useMemo(
    () => getCommunityGeneratedProfile(profileKey),
    [profileKey],
  );
  const profileBackground =
    generatedProfile?.background ??
    profileBackgrounds[profileSeed % profileBackgrounds.length];
  const profileImage = generatedProfile?.profile ?? profile.image ?? defaultProfile;
  const generatedPostImages = generatedProfile?.posts ?? emptyGeneratedPosts;
  const visibleRecommendationPosts = useMemo(
    () =>
      shuffleForProfile(recommendationPosts, profileSeed)
        .slice(0, 3)
        .map((post, index) => ({
          ...post,
          img: generatedPostImages[index] ?? post.img,
        })),
    [generatedPostImages, profileSeed],
  );
  const visibleReviewPosts = useMemo(
    () =>
      shuffleForProfile(reviewPosts, profileSeed + 97)
        .slice(0, 3)
        .map((post, index) => ({
          ...post,
          img:
            generatedPostImages[index + 3] ??
            generatedPostImages[index] ??
            post.img,
        })),
    [generatedPostImages, profileSeed],
  );

  return (
    <main className="mx-auto min-h-[100dvh] w-full max-w-[430px] bg-background pb-28">
      <div className="relative h-76.25 overflow-hidden">
        <img
          src={profileBackground}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <LayerBadge className="absolute right-5 top-5" />
      </div>

      <div className="relative -mt-23.75 overflow-hidden rounded-t-3xl bg-offwhite">
        <section className="flex flex-col gap-6 p-5">
          <div className="flex items-center gap-4.5">
            <img
              src={profileImage}
              alt=""
              className="size-20 shrink-0 rounded-full object-cover"
            />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <h1 className="text-title-semibold-18 text-offblack">
                  {profile.name ?? "북극곰"}
                </h1>
                <span className="flex items-center gap-0.5">
                  <img
                    src={badgeNewbie}
                    alt=""
                    className="size-4 object-contain"
                  />
                  <span className="text-body-medium-14 text-subtext">
                    NEWBIE
                  </span>
                </span>
              </div>
              <div className="flex gap-3 text-body-medium-14 text-subtext">
                <span>
                  팔로워 <strong className="font-medium text-offblack">12</strong>
                </span>
                <span>
                  팔로잉 <strong className="font-medium text-offblack">2</strong>
                </span>
              </div>
            </div>
          </div>

          <BtnBig
            onClick={() => setIsFollowing((current) => !current)}
            className={isFollowing ? "!bg-grey" : ""}
          >
            {isFollowing ? "팔로잉" : "팔로우"}
          </BtnBig>
        </section>

        <Category
          variant="page"
          items={tabs}
          active={activeTab}
          onChange={setActiveTab}
        />

        <PostGrid
          items={
            activeTab === "향수추천"
              ? visibleRecommendationPosts
              : visibleReviewPosts
          }
          onItemClick={
            (post) =>
              navigate(`/community/post/profile-${post.id}`, {
                state: {
                  post: {
                    type:
                      activeTab === "향수추천" ? "recommendation" : "review",
                    profileName: profile.name ?? "북극곰",
                    profileImage,
                    time: "5분 전",
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
      </div>

      <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 px-5 pb-5">
        <BottomNav active="community" />
      </div>
    </main>
  );
}
