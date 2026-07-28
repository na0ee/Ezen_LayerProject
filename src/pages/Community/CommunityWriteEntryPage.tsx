import { useLayoutEffect, useRef, useState } from "react";
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

type WritePageId = CommunityWriteCategoryItem["id"];
type CommunityTab = "리뷰" | "질문" | "챌린지" | "향 추천";

const categoryLabels: Record<WritePageId, string> = {
  review: "리뷰",
  free: "자유 게시글",
  poll: "하나 골라줘!",
  recommendation: "향 추천받기",
};

export default function CommunityWriteEntryPage() {
  const [activePage, setActivePage] = useState<WritePageId>("review");
  const [activeCommunityTab, setActiveCommunityTab] =
    useState<CommunityTab>("리뷰");
  const [isWriting, setIsWriting] = useState(false);
  const [isPerfumeSelecting, setIsPerfumeSelecting] = useState(false);
  const [selectedPerfumeIds, setSelectedPerfumeIds] = useState<string[]>([]);
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
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

  const openCategorySheet = () => setIsCategorySheetOpen(true);
  const changeCommunityTab = (tab: CommunityTab) => {
    setActiveCommunityTab(tab);
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

  return (
    <>
      {!isWriting && activeCommunityTab === "리뷰" && (
        <CommunityReviewPage
          onTabChange={changeCommunityTab}
          onWrite={openCategorySheet}
        />
      )}
      {!isWriting && activeCommunityTab === "질문" && (
        <CommunityQuestionPage
          onTabChange={changeCommunityTab}
          onWrite={openCategorySheet}
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
          onTabChange={changeCommunityTab}
          onWrite={openCategorySheet}
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

      {isWriting && !isPerfumeSelecting && activePage === "review" && (
        <CommunityWritePage
          {...commonPageProps}
          category={categoryLabels.review}
          selectedPerfumeIds={selectedPerfumeIds}
          onPerfumeAdd={() => {
            writeScrollPosition.current = window.scrollY;
            pendingScrollPosition.current = 0;
            setIsPerfumeSelecting(true);
          }}
        />
      )}
      {isWriting && !isPerfumeSelecting && activePage === "free" && (
        <CommunityFreeWritePage {...commonPageProps} />
      )}
      {isWriting && !isPerfumeSelecting && activePage === "poll" && (
        <CommunityPollWritePage {...commonPageProps} />
      )}
      {isWriting && !isPerfumeSelecting && activePage === "recommendation" && (
        <CommunityRecommendationWritePage {...commonPageProps} />
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
