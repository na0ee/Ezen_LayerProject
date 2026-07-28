import commentProfileYeeunTv from "../../assets/Community/comment-profile-yeeuntv.png";
import {
  BottomNav,
  ConQuestion,
  ConQuestion1,
  Header,
  Search,
} from "../../components/common";

const communityTabs = ["리뷰", "질문", "챌린지", "향 추천"] as const;

const questionText =
  "사과향이나 오렌지같은 약간 청순하면서 발랄한? 그런 과일향이 필요해요!! 아시는 분 추천해주세요 ㅜㅜ 최소 3만원 이하로 해주시면 감사하겠습니다! 청순발랄한 향이라면 과일이 아니어도 상관 없어요!";

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
}

export default function CommunityQuestionPage({
  onTabChange,
  onWrite,
}: CommunityQuestionPageProps) {
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
          <article className="community-question-card community-question-card--recommendation">
            <ConQuestion
              profileName="예은티비"
              profileTime="5분 전"
              profileImg={commentProfileYeeunTv}
              title="향수 추천해주세요"
              text={questionText}
              likes={42}
              comments={8}
            />
          </article>

          <article className="community-question-card community-question-card--recommendation-repeat">
            <ConQuestion
              profileName="예은티비"
              profileTime="5분 전"
              profileImg={commentProfileYeeunTv}
              title="향수 추천해주세요"
              text={questionText}
              likes={42}
              comments={8}
            />
          </article>

          <article className="community-question-card community-question-card--poll">
            <ConQuestion1
              profileName="익명"
              profileTime="5분 전"
              anonymous
              sub="익명의 향덕님이 하나 골라달래요"
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
