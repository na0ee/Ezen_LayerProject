import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const initialCommunityTab =
    (location.state as { communityTab?: CommunityTab } | null)
      ?.communityTab ?? "리뷰";
  const [activePage, setActivePage] = useState<WritePageId>("review");
  const [activeCommunityTab, setActiveCommunityTab] =
    useState<CommunityTab>(initialCommunityTab);
  const [isWriting, setIsWriting] = useState(false);
  const [isPerfumeSelecting, setIsPerfumeSelecting] = useState(false);
  const [selectedPerfumeIds, setSelectedPerfumeIds] = useState<string[]>([]);
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
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
    if (requestedTab) setActiveCommunityTab(requestedTab);
  }, [location.key, location.state]);

  useEffect(() => {
    const syncSavedPosts = (event: StorageEvent) => {
      if (event.key === null || event.key === COMMUNITY_POSTS_STORAGE_KEY) {
        setUserPosts(loadCommunityUserPosts());
      }
    };

    window.addEventListener("storage", syncSavedPosts);
    return () => window.removeEventListener("storage", syncSavedPosts);
  }, []);

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
