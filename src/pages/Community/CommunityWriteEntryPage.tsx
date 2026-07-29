import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FeatureGuideCard } from "../../components/common";
import { scrollAppTo } from "../../utils/appScroll";
import CommunityChallengePage from "./CommunityChallengePage";
import CommunityFeedPage from "./CommunityFeedPage";
import CommunityFreeWritePage from "./CommunityFreeWritePage";
import CommunityPerfumeSelectPage from "./CommunityPerfumeSelectPage";
import CommunityPollWritePage from "./CommunityPollWritePage";
import CommunityQuestionPage from "./CommunityQuestionPage";
import CommunityRecommendationWritePage from "./CommunityRecommendationWritePage";
import CommunityReviewPage from "./CommunityReviewPage";
import CommunityWriteCategorySheet, {
  type CommunityWriteCategoryItem,
} from "./CommunityWriteCategorySheet";
import CommunityWritePage from "./CommunityWritePage";
import {
  COMMUNITY_POSTS_STORAGE_KEY,
  loadCommunityUserPosts,
  saveCommunityUserPosts,
  type CommunityUserPost,
} from "./communityUserPosts";

type WritePageId = CommunityWriteCategoryItem["id"];
type CommunityTab = "리뷰" | "질문" | "챌린지" | "향 추천";

const categoryLabels: Record<WritePageId, string> = {
  review: "리뷰",
  free: "자유 게시글",
  poll: "하나 골라줘!",
  recommendation: "향 추천받기",
};

export default function CommunityWriteEntryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState<WritePageId>("review");
  const [activeCommunityTab, setActiveCommunityTab] =
    useState<CommunityTab>("리뷰");
  const [isWriting, setIsWriting] = useState(false);
  const [isPerfumeSelecting, setIsPerfumeSelecting] = useState(false);
  const [selectedPerfumeIds, setSelectedPerfumeIds] = useState<string[]>([]);
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [guideStep, setGuideStep] = useState<number | null>(() =>
    document.documentElement.dataset.guideEnabled === "false" ? null : 1,
  );
  const [userPosts, setUserPosts] = useState<CommunityUserPost[]>(
    loadCommunityUserPosts,
  );
  const communityScrollPosition = useRef(0);
  const writeScrollPosition = useRef(0);
  const pendingScrollPosition = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (pendingScrollPosition.current === null) return;

    window.scrollTo({
      top: pendingScrollPosition.current,
      behavior: "auto",
    });
    pendingScrollPosition.current = null;
  }, [activePage, isPerfumeSelecting, isWriting]);

  useEffect(() => {
    const requestedTab =
      (location.state as { communityTab?: CommunityTab } | null)
        ?.communityTab;
    if (requestedTab && guideStep == null) {
      setActiveCommunityTab(requestedTab);
    }
  }, [guideStep, location.key, location.state]);

  useEffect(() => {
    const syncSavedPosts = (event: StorageEvent) => {
      if (event.key === null || event.key === COMMUNITY_POSTS_STORAGE_KEY) {
        setUserPosts(loadCommunityUserPosts());
      }
    };

    window.addEventListener("storage", syncSavedPosts);
    return () => window.removeEventListener("storage", syncSavedPosts);
  }, []);

  useEffect(() => {
    const handleGuideChange = (event: Event) => {
      const isEnabled = Boolean((event as CustomEvent<boolean>).detail);
      setGuideStep(isEnabled ? 1 : null);
      if (isEnabled) {
        setActiveCommunityTab("리뷰");
        setIsWriting(false);
        setIsPerfumeSelecting(false);
        setIsCategorySheetOpen(false);
      }
    };

    window.addEventListener("layer:guide-change", handleGuideChange);
    return () =>
      window.removeEventListener("layer:guide-change", handleGuideChange);
  }, []);

  useEffect(() => {
    if (guideStep == null || isWriting) {
      delete document.documentElement.dataset.communityGuideStep;
      return undefined;
    }

    document.documentElement.dataset.communityGuideStep = String(guideStep);
    scrollAppTo({ top: 0, behavior: "smooth" });

    return () => {
      delete document.documentElement.dataset.communityGuideStep;
    };
  }, [guideStep, isWriting]);

  const advanceCommunityGuide = useCallback((event: Event) => {
    if (guideStep == null) return;

    event.preventDefault();
    event.stopPropagation();

    if (guideStep < 5) {
      const nextStep = guideStep + 1;
      setGuideStep(nextStep);
      return;
    }

    setGuideStep(null);
    setActiveCommunityTab("리뷰");
    navigate("/community", {
      replace: true,
      state: { communityTab: "리뷰" },
    });
    scrollAppTo({ top: 0, behavior: "smooth" });
  }, [guideStep, navigate]);

  useEffect(() => {
    if (guideStep == null || isWriting) return undefined;

    const handleGuideClick = (event: MouseEvent) => {
      const target = event.target;
      if (
        !(target instanceof Element) ||
        !target.closest(".desktop-app, [data-bottom-nav]")
      ) {
        return;
      }

      advanceCommunityGuide(event);
    };

    document.addEventListener("click", handleGuideClick, true);
    return () => document.removeEventListener("click", handleGuideClick, true);
  }, [advanceCommunityGuide, guideStep, isWriting]);

  const openCategorySheet = () => setIsCategorySheetOpen(true);
  const changeCommunityTab = (tab: CommunityTab) => {
    setActiveCommunityTab(tab);
    navigate("/community", {
      replace: true,
      state: { communityTab: tab },
    });
    window.scrollTo({ top: 0 });
  };
  const closeWritePage = () => {
    pendingScrollPosition.current = communityScrollPosition.current;
    setIsCategorySheetOpen(false);
    setIsPerfumeSelecting(false);
    setIsWriting(false);
  };

  const commonPageProps = {
    onCategoryClick: openCategorySheet,
    onClose: closeWritePage,
  };
  const publishPost = (
    post: Omit<CommunityUserPost, "id" | "createdAt">,
  ) => {
    const nextPost: CommunityUserPost = {
      ...post,
      id: `user-${Date.now()}`,
      createdAt: Date.now(),
    };
    const nextPosts = [nextPost, ...userPosts];
    setUserPosts(nextPosts);
    try {
      saveCommunityUserPosts(nextPosts);
    } catch {
      // 저장 공간이 부족해도 현재 세션의 게시물 등록은 유지한다.
    }
    pendingScrollPosition.current = 0;
    setActiveCommunityTab(post.category);
    setIsCategorySheetOpen(false);
    setIsPerfumeSelecting(false);
    setIsWriting(false);
    setSelectedPerfumeIds([]);
    navigate("/community", {
      replace: true,
      state: { communityTab: post.category },
    });
  };
  const deletePost = (postId: string) => {
    const nextPosts = userPosts.filter((post) => post.id !== postId);
    setUserPosts(nextPosts);
    try {
      saveCommunityUserPosts(nextPosts);
    } catch {
      // 저장소 접근이 제한된 환경에서도 현재 화면에서는 삭제 상태를 유지한다.
    }
  };

  return (
    <>
      {guideStep != null && !isWriting && (
        <>
          <div className="feature-guide-overlay pointer-events-none fixed inset-0 z-[150] bg-black/55" />
          <div className="pointer-events-none fixed left-1/2 top-[48%] z-[170] -translate-x-1/2 -translate-y-1/2">
            <FeatureGuideCard
              characterPosition={guideStep % 2 === 0 ? "right" : "left"}
              size="compact"
              progress={`${guideStep} / 5`}
              className="!gap-1"
            >
              {guideStep === 1 && (
                <>
                  사용한 향수의 후기를 확인하고
                  <br />
                  나의 경험도 공유해 보세요.
                </>
              )}
              {guideStep === 2 && (
                <>
                  향수에 대해 궁금한 점을 묻고
                  <br />
                  유저들의 답변을 받아보세요.
                </>
              )}
              {guideStep === 3 && (
                <>
                  다양한 챌린지에 참여하여
                  <br />
                  포인트를 받을 수 있어요.
                </>
              )}
              {guideStep === 4 && (
                <>
                  사진과 사연을 보고 어울리는 향수를
                  <br />
                  유저에게 추천해 보세요.
                </>
              )}
              {guideStep === 5 && (
                <>
                  글쓰기 버튼을 눌러 리뷰와 질문 등
                  <br />
                  다양한 향수 이야기를 나눠보세요!
                </>
              )}
            </FeatureGuideCard>
          </div>
        </>
      )}
      {!isWriting && activeCommunityTab === "리뷰" && (
        <CommunityReviewPage
          userPosts={userPosts.filter((post) => post.category === "리뷰")}
          onTabChange={changeCommunityTab}
          onWrite={openCategorySheet}
          onDeletePost={deletePost}
        />
      )}
      {!isWriting && activeCommunityTab === "질문" && (
        <CommunityQuestionPage
          userPosts={userPosts.filter((post) => post.category === "질문")}
          onTabChange={changeCommunityTab}
          onWrite={openCategorySheet}
          onDeletePost={deletePost}
        />
      )}
      {!isWriting && activeCommunityTab === "챌린지" && (
        <CommunityChallengePage
          onTabChange={changeCommunityTab}
          onWrite={openCategorySheet}
        />
      )}
      {!isWriting && activeCommunityTab === "향 추천" && (
        <CommunityFeedPage
          userPosts={userPosts.filter((post) => post.category === "향 추천")}
          onTabChange={changeCommunityTab}
          onWrite={openCategorySheet}
          onDeletePost={deletePost}
        />
      )}

      {isWriting && isPerfumeSelecting && activePage === "review" && (
        <CommunityPerfumeSelectPage
          initialSelectedIds={selectedPerfumeIds}
          onBack={() => {
            pendingScrollPosition.current = writeScrollPosition.current;
            setIsPerfumeSelecting(false);
          }}
          onSubmit={(selectedIds) => {
            setSelectedPerfumeIds(selectedIds);
            pendingScrollPosition.current = writeScrollPosition.current;
            setIsPerfumeSelecting(false);
          }}
        />
      )}

      {isWriting && activePage === "review" && (
        <div className={isPerfumeSelecting ? "hidden" : undefined}>
          <CommunityWritePage
            {...commonPageProps}
            category={categoryLabels.review}
            selectedPerfumeIds={selectedPerfumeIds}
            onPerfumeAdd={() => {
              writeScrollPosition.current = window.scrollY;
              pendingScrollPosition.current = 0;
              setIsPerfumeSelecting(true);
            }}
            onSubmit={publishPost}
          />
        </div>
      )}
      {isWriting && !isPerfumeSelecting && activePage === "free" && (
        <CommunityFreeWritePage {...commonPageProps} onSubmit={publishPost} />
      )}
      {isWriting && !isPerfumeSelecting && activePage === "poll" && (
        <CommunityPollWritePage {...commonPageProps} onSubmit={publishPost} />
      )}
      {isWriting && !isPerfumeSelecting && activePage === "recommendation" && (
        <CommunityRecommendationWritePage
          {...commonPageProps}
          onSubmit={publishPost}
        />
      )}

      <CommunityWriteCategorySheet
        open={isCategorySheetOpen}
        onClose={() => setIsCategorySheetOpen(false)}
        onSelect={(item) => {
          if (!isWriting) {
            communityScrollPosition.current = window.scrollY;
          }
          pendingScrollPosition.current = 0;
          setActivePage(item.id);
          setIsWriting(true);
          setIsPerfumeSelecting(false);
          setIsCategorySheetOpen(false);
        }}
      />
    </>
  );
}
