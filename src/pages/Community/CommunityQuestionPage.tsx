import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profileFruityLover from "../../assets/Community/Profile/profile-fruity-lover.png";
import profileOfficeScent from "../../assets/Community/Profile/profile-office-scent.png";
import {
  BottomNav,
  ConQuestion,
  ConQuestion1,
  Header,
  Search,
} from "../../components/common";
import type { CommunityUserPost } from "./communityUserPosts";
import { getUserProfile } from "../../data/userProfile";
import { getCommunityGeneratedProfile } from "../../data/communityGeneratedProfiles";

const communityTabs = ["리뷰", "질문", "챌린지", "향 추천"] as const;

const fruitQuestionText =
  "사과향이나 오렌지같은 약간 청순하면서 발랄한? 그런 과일향이 필요해요!! 아시는 분 추천해주세요 ㅜㅜ 최소 3만원 이하로 해주시면 감사하겠습니다! 청순발랄한 향이라면 과일이 아니어도 상관 없어요!";

const cleanQuestionText =
  "향수를 처음 사보려고 해요. 출근할 때 매일 뿌려도 부담 없고, 막 세탁한 셔츠처럼 깨끗한 비누향이면 좋겠어요. 너무 달거나 파우더리하지 않은 제품으로 추천 부탁드려요!";

const pollOptions = [
  {
    label: "조말론 우드 세이지 앤 씨솔트",
    percent: 60,
    selected: true,
  },
  {
    label: "딥디크 오 데 썽",
    percent: 40,
    selected: false,
  },
] as const;

interface CommunityQuestionPageProps {
  onTabChange?: (tab: (typeof communityTabs)[number]) => void;
  onWrite?: () => void;
  userPosts?: CommunityUserPost[];
  onDeletePost?: (postId: string) => void;
}

export default function CommunityQuestionPage({
  onTabChange,
  onWrite,
  userPosts = [],
  onDeletePost,
}: CommunityQuestionPageProps) {
  const navigate = useNavigate();
  const userProfile = getUserProfile();
  const [pollSelections, setPollSelections] = useState<Record<string, number>>({});

  return (
    <main className="community-question-page min-h-[100dvh] bg-subtext">
      <div className="community-question-page__wrap mx-auto min-h-[100dvh] w-full max-w-[430px] bg-background pb-28">
        <section className="community-question-header bg-offwhite">
          <Header
            variant="community"
            title="커뮤니티"
            onEdit={onWrite}
          />

          <div className="community-question-header__search px-5 py-3">
            <Search variant="no-icon" />
          </div>

          <nav
            aria-label="커뮤니티 카테고리"
            className="community-question-tabs flex items-end gap-6 border-b border-light-grey px-5 pt-4"
          >
            {communityTabs.map((tab) => {
              const isActive = tab === "질문";

              return (
                <button
                  type="button"
                  key={tab}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => onTabChange?.(tab)}
                  className={`community-question-tabs__item flex shrink-0 items-start justify-center whitespace-nowrap border-b-2 pb-[11.5px] text-center text-body-medium-16 ${
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
          aria-label="커뮤니티 질문 피드"
          className="community-question-feed flex flex-col gap-4 px-5 pt-3"
        >
          {userPosts.map((post) => {
            if (post.kind !== "poll") {
              return (
                <article
                  key={post.id}
                  className="community-question-card community-question-card--user-post"
                >
                  <ConQuestion
                    profileName={userProfile.nickname}
                    profileTime="방금 전"
                    profileImg={userProfile.image}
                    title={post.title}
                    text={post.text}
                    likes={0}
                    comments={0}
                    commentKey={post.id}
                    onDelete={() => onDeletePost?.(post.id)}
                  />
                </article>
              );
            }

            const selectedIndex = pollSelections[post.id];
            const options = post.pollOptions ?? [];

            return (
              <article key={post.id} className="community-question-card community-question-card--user-poll">
                <ConQuestion1
                  profileName={userProfile.nickname}
                  profileTime="방금 전"
                  profileImg={userProfile.image}
                  sub={post.text}
                  title={post.title}
                  options={options.map((label, index) => ({
                    label,
                    percent:
                      selectedIndex === undefined ? 0 : selectedIndex === index ? 100 : 0,
                    selected: selectedIndex === index,
                  }))}
                  onSelect={(_, index) =>
                    setPollSelections((current) => ({ ...current, [post.id]: index }))
                  }
                  onDelete={() => onDeletePost?.(post.id)}
                />
              </article>
            );
          })}
          <article className="community-question-card community-question-card--recommendation">
            <ConQuestion
              profileName="과일향러버"
              profileTime="5분 전"
              profileImg={
                getCommunityGeneratedProfile(
                  "fruity-lover-과일향러버",
                )?.profile ?? profileFruityLover
              }
              title="상큼한 과일향 향수 추천해주세요"
              text={fruitQuestionText}
              likes={42}
              comments={8}
              commentKey="fruity-lover-question"
              onProfileClick={() =>
                navigate("/community/profile/fruity-lover", {
                  state: {
                    profile: {
                      name: "과일향러버",
                      image:
                        getCommunityGeneratedProfile(
                          "fruity-lover-과일향러버",
                        )?.profile ?? profileFruityLover,
                    },
                  },
                })
              }
            />
          </article>

          <article className="community-question-card community-question-card--recommendation-repeat">
            <ConQuestion
              profileName="출근향찾는중"
              profileTime="18분 전"
              profileImg={
                getCommunityGeneratedProfile(
                  "office-scent-출근향찾는중",
                )?.profile ?? profileOfficeScent
              }
              title="매일 뿌리기 좋은 깨끗한 비누향 있을까요?"
              text={cleanQuestionText}
              likes={19}
              comments={5}
              commentKey="office-scent-question"
              onProfileClick={() =>
                navigate("/community/profile/office-scent", {
                  state: {
                    profile: {
                      name: "출근향찾는중",
                      image:
                        getCommunityGeneratedProfile(
                          "office-scent-출근향찾는중",
                        )?.profile ?? profileOfficeScent,
                    },
                  },
                })
              }
            />
          </article>

          <article className="community-question-card community-question-card--poll">
            <ConQuestion1
              profileName="익명"
              profileTime="32분 전"
              anonymous
              sub="익명의 향덕님이 여름 향수를 고민 중이에요"
              title="여름용 데일리 향수, 어떤 게 더 좋을까요?"
              options={[...pollOptions]}
            />
          </article>
        </section>

        <div className="community-question-bottom-nav fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 px-5 pb-5">
          <BottomNav active="community" />
        </div>
      </div>
    </main>
  );
}
