import { useState } from "react";
import { useNavigate } from "react-router-dom";
import feedBeachImage from "../../assets/Community/Feed/feed-beach.png";
import feedRainyWalkImage from "../../assets/Community/Feed/feed-rainy-walk.png";
import feedSunsetImage from "../../assets/Community/Feed/feed-sunset.png";
import profileFadedscent from "../../assets/Community/Profile/profile-fadedscent.png";
import profilePassingPerfumer from "../../assets/Community/Profile/profile-passing-perfumer.png";
import profileRainyScent from "../../assets/Community/Profile/profile-rainy-scent.png";
import {
  BottomNav,
  BtnSmall,
  Header,
  Profile,
  Search,
} from "../../components/common";
import CommunityRecommendationSelectSheet from "./CommunityRecommendationSelectSheet";
import type { CommunityUserPost } from "./communityUserPosts";
import { getUserProfile } from "../../data/userProfile";

const communityTabs = ["리뷰", "질문", "챌린지", "향 추천"] as const;

const feedPosts = [
  {
    id: "sunset-commute",
    profileName: "fadedscent",
    profileImage: profileFadedscent,
    image: feedSunsetImage,
    title: "노을 지는 퇴근길에 어울리는 향 찾아요",
    text: "매일 버스에서 노을 보면서 퇴근하는데, 이 시간이랑 어울리는 향이 있었으면 좋겠어요. 따뜻한데 살짝 쓸쓸한 느낌이면 완벽할 것 같아요.",
    keywords: ["데일리향수", "베이지룩", "플로럴머스크", "지속력좋아요"],
  },
  {
    id: "cloudy-seaside",
    profileName: "지나가던조향사",
    profileImage: profilePassingPerfumer,
    image: feedBeachImage,
    title: "흐린 바다 냄새 같은 향수 있을까요",
    text: "구름 낀 날 바닷가 맨발로 걷는 기분을 향으로 남기고 싶어요. 짠내 나는 인위적인 마린 말고, 물안개처럼 투명하고 서늘한 향이면 좋겠어요. 잔향은 은은한 머스크로 끝나면 완벽할 것 같아요. 비슷한 걸 아시는 분 추천 부탁드려요.",
    keywords: ["마린노트", "클린머스크", "바다향", "산책향수"],
  },
  {
    id: "rainy-evening-walk",
    profileName: "비오는날의향",
    profileImage: profileRainyScent,
    image: feedRainyWalkImage,
    title: "비 온 뒤 저녁 산책에 어울리는 향이 궁금해요",
    text: "비가 그친 뒤 젖은 나무와 흙에서 나는 차분한 향을 좋아해요. 처음에는 싱그럽고 맑지만, 시간이 지나면 포근한 우디 머스크로 남는 향수를 추천받고 싶어요.",
    keywords: ["레인노트", "그린우디", "우디머스크", "저녁산책"],
  },
] as const;

interface CommunityFeedPageProps {
  onTabChange?: (tab: (typeof communityTabs)[number]) => void;
  onWrite?: () => void;
  userPosts?: CommunityUserPost[];
}

export default function CommunityFeedPage({
  onTabChange,
  onWrite,
  userPosts = [],
}: CommunityFeedPageProps) {
  const navigate = useNavigate();
  const userProfile = getUserProfile();
  const [recommendationRecipient, setRecommendationRecipient] = useState<
    string | null
  >(null);

  return (
    <>
      <main className="community-feed-page min-h-[100dvh] bg-subtext">
        <div className="community-feed-page__wrap mx-auto min-h-[100dvh] w-full max-w-[430px] bg-background pb-28">
          <section className="community-feed-header bg-offwhite">
            <Header
              variant="community"
              title="커뮤니티"
              onEdit={onWrite}
            />

            <div className="community-feed-header__search px-5 py-3">
              <Search variant="no-icon" />
            </div>

            <nav
              aria-label="커뮤니티 카테고리"
              className="community-feed-tabs flex items-end gap-6 border-b border-light-grey px-5 pt-4"
            >
              {communityTabs.map((tab) => {
                const isActive = tab === "향 추천";

                return (
                  <button
                    type="button"
                    key={tab}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => onTabChange?.(tab)}
                    className={`community-feed-tabs__item flex shrink-0 items-start justify-center whitespace-nowrap border-b-2 pb-[11.5px] text-center text-body-medium-16 ${
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
            aria-label="커뮤니티 향 추천 피드"
            className="community-feed-list flex flex-col gap-[12px]"
          >
            {userPosts.map((post, index) => (
              <article
                key={post.id}
                className={`community-feed-card flex w-full flex-col gap-6 bg-offwhite p-5 ${
                  index === 0 ? "rounded-b-2xl" : "rounded-2xl"
                }`}
              >
                <Profile
                  name={userProfile.nickname}
                  time="방금 전"
                  img={userProfile.image}
                />
                <div className="flex h-[430px] w-full snap-x snap-mandatory gap-3 overflow-x-auto rounded-lg">
                  {post.images.map((image, imageIndex) => (
                    <img
                      key={`${post.id}-${imageIndex}`}
                      src={image}
                      alt={`게시물 사진 ${imageIndex + 1}`}
                      className="size-full shrink-0 snap-center object-cover"
                    />
                  ))}
                </div>
                <div className="flex w-full flex-col gap-[6px]">
                  <h2 className="text-body-semibold-16 text-offblack">{post.title}</h2>
                  <p className="text-body-regular-14 text-subtext">{post.text}</p>
                  {post.keywords.length > 0 && (
                    <p className="mt-[6px] text-caption-regular-12 text-subtext">
                      {post.keywords.map((keyword) => `#${keyword}`).join("　")}
                    </p>
                  )}
                </div>
                <BtnSmall
                  className="self-end"
                  onClick={() => setRecommendationRecipient(userProfile.nickname)}
                >
                  추천하기
                </BtnSmall>
              </article>
            ))}
            {feedPosts.map((post, index) => (
              <article
                key={post.id}
                className={`community-feed-card community-feed-card--${post.id} flex w-full flex-col gap-6 bg-offwhite p-5 ${
                  index === 0 ? "rounded-b-2xl" : "rounded-2xl"
                }`}
              >
                <Profile
                  name={post.profileName}
                  time="5분 전"
                  img={post.profileImage}
                  onClick={() =>
                    navigate(`/community/profile/${post.id}`, {
                      state: {
                        profile: {
                          name: post.profileName,
                          image: post.profileImage,
                        },
                      },
                    })
                  }
                />

                <div className="community-feed-card__image relative h-[430px] w-full overflow-hidden rounded-lg bg-light-grey">
                  <img
                    src={post.image}
                    alt=""
                    className="size-full object-cover"
                  />
                  <span className="community-feed-card__mood absolute right-4 top-4 inline-flex items-center rounded-[24px] bg-offblack/50 px-[10px] py-[4px] font-en text-[16px] font-bold leading-normal tracking-[-0.02em] text-2light-grey shadow-[inset_0_0_0_1px_rgba(255,255,255,0.28)] backdrop-blur-[2px]">
                    Mood Shifter
                  </span>
                </div>

                <div className="community-feed-card__content flex w-full flex-col gap-[6px]">
                  <h2 className="text-body-semibold-16 text-offblack">
                    {post.title}
                  </h2>
                  <p className="text-body-regular-14 text-subtext">{post.text}</p>
                  <p className="community-feed-card__hashtags mt-[6px] text-caption-regular-12 text-subtext">
                    {post.keywords.map((keyword) => `#${keyword}`).join("　")}
                  </p>
                </div>

                <BtnSmall
                  className="community-feed-card__recommend self-end"
                  onClick={() => setRecommendationRecipient(post.profileName)}
                >
                  추천하기
                </BtnSmall>
              </article>
            ))}
          </section>

          <div className="community-feed-bottom-nav fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 px-5 pb-5">
            <BottomNav active="community" />
          </div>
        </div>
      </main>

      <CommunityRecommendationSelectSheet
        open={recommendationRecipient !== null}
        recipientName={recommendationRecipient ?? undefined}
        onClose={() => setRecommendationRecipient(null)}
      />
    </>
  );
}
