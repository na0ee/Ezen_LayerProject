import { useState } from "react";
import challengeCompletePopper from "../../assets/Community/Challenge/challenge-complete-popper.svg";
import challengeCommunity from "../../assets/Community/Challenge/challenge-community-warm.avif";
import challengeGiftWithAi from "../../assets/Community/Challenge/challenge-gift-with-ai-warm.avif";
import challengeMainCommunity from "../../assets/Community/Challenge/challenge-main-community-warm.avif";
import challengeMyLayer from "../../assets/Community/Challenge/challenge-my-layer-warm.avif";
import challengeRecommendPerfume from "../../assets/Community/Challenge/challenge-recommend-perfume-warm.avif";
import challengeRegisterPerfume from "../../assets/Community/Challenge/challenge-register-perfume-warm.avif";
import {
  BottomNav,
  CardChallenge,
  CardChallengeSmall,
  Header,
  Search,
  TitleSection,
} from "../../components/common";
import { useNavigate } from "react-router-dom";
import {
  CHALLENGE_REWARDS,
  getCompletedChallengeIds,
} from "../../data/challengeRewards";
import useDragScroll from "../../hooks/useDragScroll";

const communityTabs = ["리뷰", "질문", "챌린지", "향 추천"] as const;

const mainChallenges = [
  {
    id: "community-main-1",
    image: challengeMainCommunity,
    title: "커뮤니티 이용하기",
    description: "질문·답변·리뷰 남기고 최대 75p까지",
  },
  {
    id: "register-perfume",
    image: challengeRegisterPerfume,
    title: "내 향수 등록하기",
    description: "보유 향수 등록하고 포인트 받기",
  },
  {
    id: "recommend-perfume",
    image: challengeRecommendPerfume,
    title: "향수 추천하기",
    description: "어울리는 향 추천하고 포인트 받기",
  },
];

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
  const navigate = useNavigate();
  const mainChallengeRailRef = useDragScroll();
  const [completedChallengeIds] = useState<Set<string>>(
    getCompletedChallengeIds,
  );
  const [completedNoticeOpen, setCompletedNoticeOpen] = useState(false);
  const isChallengeCompleted = (challenge: (typeof challenges)[number]) =>
    challenge.id === "my-layer"
      ? challenge.completed
      : completedChallengeIds.has(challenge.id);
  const sortedChallenges = [...challenges].sort(
    (a, b) => Number(isChallengeCompleted(a)) - Number(isChallengeCompleted(b)),
  );

  const handleChallenge = (challengeId: string) => {
    if (completedChallengeIds.has(challengeId) || challengeId === "my-layer") {
      setCompletedNoticeOpen(true);
      return;
    }
    const challengeReward = {
      challengeId,
      points: CHALLENGE_REWARDS[challengeId],
    };

    if (challengeId.startsWith("community")) {
      navigate("/community", {
        state: { communityTab: "리뷰", challengeReward },
      });
      return;
    }
    if (challengeId === "register-perfume") {
      navigate("/mypage/perfumes/new", { state: { challengeReward } });
      return;
    }
    if (challengeId === "recommend-perfume") {
      navigate("/community", {
        state: { communityTab: "향 추천", challengeReward },
      });
      return;
    }
    if (challengeId === "gift-with-ai") {
      navigate("/chatbot?intent=gift", { state: { challengeReward } });
    }
  };

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
              <TitleSection title="오늘의 메인 챌린지" />
            </div>

            <div
              ref={mainChallengeRailRef}
              className="community-challenge-main__carousel scroll-rail-page-gutter no-scrollbar -mx-5 w-[calc(100%_+_40px)] cursor-grab touch-pan-x overflow-x-auto overflow-y-hidden overscroll-x-contain active:cursor-grabbing"
            >
              <div className="flex w-max gap-3">
                {mainChallenges.map((challenge) => (
                  <CardChallengeSmall
                    key={challenge.id}
                    img={challenge.image}
                    imgClassName="h-[107%] w-full max-w-none object-cover object-top"
                    title={challenge.title}
                    desc={challenge.description}
                    onAction={() => handleChallenge(challenge.id)}
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
              <TitleSection title="챌린지" />
            </div>

            <div className="community-challenge-list__cards flex flex-col gap-[16px]">
              {sortedChallenges.map((challenge) => {
                const isCompleted = isChallengeCompleted(challenge);

                return (
                <article
                  key={challenge.id}
                  className={`community-challenge-card community-challenge-card--${challenge.id} relative overflow-hidden rounded-2xl`}
                >
                  <CardChallenge
                    img={challenge.image}
                    title={challenge.title}
                    desc={challenge.description}
                    onAction={
                      isCompleted
                        ? () => setCompletedNoticeOpen(true)
                        : () => handleChallenge(challenge.id)
                    }
                  />

                  {isCompleted && (
                    <button
                      type="button"
                      aria-label={`${challenge.title}: 이미 완료된 챌린지`}
                      onClick={() => setCompletedNoticeOpen(true)}
                      className="community-challenge-card__completed absolute inset-0 z-10 overflow-hidden rounded-2xl bg-offblack/50"
                    >
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
                    </button>
                  )}
                </article>
                );
              })}
            </div>
          </section>
        </div>

        <div className="community-challenge-bottom-nav fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 px-5 pb-5">
          <BottomNav active="community" />
        </div>

      </div>
      {completedNoticeOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-offblack/35 px-10"
          onClick={() => setCompletedNoticeOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="completed-challenge-notice-title"
            className="w-full max-w-80 rounded-[20px] bg-offwhite px-6 py-7 text-center shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="completed-challenge-notice-title"
              className="text-title-medium-20 text-offblack"
            >
              이미 완료된 챌린지입니다
            </h2>
            <button
              type="button"
              onClick={() => setCompletedNoticeOpen(false)}
              className="mt-6 h-12 w-full rounded-4xl bg-offblack text-body-semibold-16 text-offwhite"
            >
              확인
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
