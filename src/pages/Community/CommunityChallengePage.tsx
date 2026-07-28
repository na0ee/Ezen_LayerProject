import challengeCompletePopper from "../../assets/Community/Challenge/challenge-complete-popper.svg";
import challengeCommunity from "../../assets/Community/Challenge/challenge-community-warm.png";
import challengeGiftWithAi from "../../assets/Community/Challenge/challenge-gift-with-ai-warm.png";
import challengeMainCommunity from "../../assets/Community/Challenge/challenge-main-community-warm.png";
import challengeMyLayer from "../../assets/Community/Challenge/challenge-my-layer-warm.png";
import challengeRecommendPerfume from "../../assets/Community/Challenge/challenge-recommend-perfume-warm.png";
import challengeRegisterPerfume from "../../assets/Community/Challenge/challenge-register-perfume-warm.png";
import {
  BottomNav,
  CardChallenge,
  CardChallengeSmall,
  Header,
  Search,
  TitleSection,
} from "../../components/common";

const communityTabs = ["리뷰", "질문", "챌린지", "향 추천"] as const;

const mainChallenges = Array.from({ length: 3 }, (_, index) => ({
  id: `community-main-${index + 1}`,
  image: challengeMainCommunity,
  title: "커뮤니티 이용하기",
  description: "질문·답변·리뷰 남기고 최대 75p까지",
}));

const challenges = [
  {
    id: "community",
    image: challengeCommunity,
    title: "커뮤니티 이용하기",
    description: "커뮤니티 활동하고 최대 75p 받기",
  },
  {
    id: "register-perfume",
    image: challengeRegisterPerfume,
    title: "내 향수 등록하기",
    description: "보유 향수 첫 등록 30p, 추가 등록 5p",
  },
  {
    id: "recommend-perfume",
    image: challengeRecommendPerfume,
    title: "향수 추천하기",
    description: "어울리는 향 추천하고 포인트 받기",
  },
  {
    id: "gift-with-ai",
    image: challengeGiftWithAi,
    title: "Gift with AI",
    description: "AI 향수 추천받고 최대 95p 받기",
  },
  {
    id: "my-layer",
    image: challengeMyLayer,
    title: "My Layer",
    description: "첫 진단 100p, 취향 공유 추가 적립",
    completed: true,
  },
] as const;

interface CommunityChallengePageProps {
  onTabChange?: (tab: (typeof communityTabs)[number]) => void;
  onWrite?: () => void;
}

export default function CommunityChallengePage({
  onTabChange,
  onWrite,
}: CommunityChallengePageProps) {
  return (
    <main className="community-challenge-page min-h-[100dvh] bg-subtext">
      <div className="community-challenge-page__wrap mx-auto min-h-[100dvh] w-full max-w-[430px] bg-background pb-28">
        <section className="community-challenge-header bg-offwhite">
          <Header
            variant="community"
            title="커뮤니티"
            onEdit={onWrite}
          />

          <div className="community-challenge-header__search px-5 py-3">
            <Search variant="no-icon" />
          </div>

          <nav
            aria-label="커뮤니티 카테고리"
            className="community-challenge-tabs flex items-end gap-6 border-b border-light-grey px-5 pt-4"
          >
            {communityTabs.map((tab) => {
              const isActive = tab === "챌린지";

              return (
                <button
                  type="button"
                  key={tab}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => onTabChange?.(tab)}
                  className={`community-challenge-tabs__item flex shrink-0 items-start justify-center whitespace-nowrap border-b-2 pb-[11.5px] text-center text-body-medium-16 ${
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

        <div className="community-challenge-content flex flex-col gap-16 px-5 pt-6">
          <section
            aria-labelledby="community-main-challenge-title"
            className="community-challenge-main flex flex-col gap-[30px]"
          >
            <div id="community-main-challenge-title">
              <TitleSection variant="button" title="오늘의 메인 챌린지" />
            </div>

            <div className="community-challenge-main__carousel -mr-5 w-[410px] overflow-hidden">
              <div className="flex w-max gap-3">
                {mainChallenges.map((challenge) => (
                  <CardChallengeSmall
                    key={challenge.id}
                    img={challenge.image}
                    title={challenge.title}
                    desc={challenge.description}
                    className="[&>div:last-child]:justify-center"
                  />
                ))}
              </div>
            </div>
          </section>

          <section
            aria-labelledby="community-challenge-list-title"
            className="community-challenge-list flex flex-col gap-[30px]"
          >
            <div id="community-challenge-list-title">
              <TitleSection variant="button" title="챌린지" />
            </div>

            <div className="community-challenge-list__cards flex flex-col gap-[16px]">
              {challenges.map((challenge) => (
                <article
                  key={challenge.id}
                  className={`community-challenge-card community-challenge-card--${challenge.id} relative overflow-hidden rounded-2xl`}
                >
                  <CardChallenge
                    img={challenge.image}
                    title={challenge.title}
                    desc={challenge.description}
                  />

                  {challenge.completed && (
                    <div className="community-challenge-card__completed pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl bg-offblack/50">
                      <div className="absolute left-1/2 top-[42%] size-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-point-orange/40 blur-3xl" />
                      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
                        <img
                          src={challengeCompletePopper}
                          alt=""
                          className="size-9"
                        />
                        <p className="whitespace-nowrap text-title-semibold-24 text-offwhite">
                          챌린지 완료!
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="community-challenge-bottom-nav fixed bottom-3 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 px-5">
          <BottomNav active="community" />
        </div>
      </div>
    </main>
  );
}
