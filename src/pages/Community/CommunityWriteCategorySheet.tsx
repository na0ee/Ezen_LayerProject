import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CommunityComment } from "../../components/common";

const categoryItems = [
  {
    id: "review",
    name: "리뷰",
    desc: "사용하는 향수의 후기를 남겨주세요",
  },
  {
    id: "free",
    name: "자유 게시글",
    desc: "궁금한 걸 자유롭게 물어보세요",
  },
  {
    id: "poll",
    name: "하나 골라줘!",
    desc: "궁금한 걸 투표 형식으로 물어보세요",
  },
  {
    id: "recommendation",
    name: "향 추천받기",
    desc: "유저들에게 향수 추천을 받아보세요",
  },
] as const;

export type CommunityWriteCategoryItem = (typeof categoryItems)[number];

interface CommunityWriteCategorySheetProps {
  open: boolean;
  onClose: () => void;
  onSelect: (item: CommunityWriteCategoryItem) => void;
}

interface ViewportBounds {
  left: number;
  width: number;
}

export default function CommunityWriteCategorySheet({
  open,
  onClose,
  onSelect,
}: CommunityWriteCategorySheetProps) {
  const [viewportBounds, setViewportBounds] = useState<ViewportBounds | null>(
    null,
  );

  useLayoutEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const syncViewportBounds = () => {
      const pageWrap = document.querySelector<HTMLElement>(
        ".community-write-page__wrap, .community-review-page__wrap, .community-question-page__wrap, .community-challenge-page__wrap, .community-feed-page__wrap",
      );

      if (pageWrap) {
        const { left, width } = pageWrap.getBoundingClientRect();
        setViewportBounds({ left, width });
        return;
      }

      const width = Math.min(window.innerWidth, 430);
      setViewportBounds({
        left: (window.innerWidth - width) / 2,
        width,
      });
    };

    syncViewportBounds();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", syncViewportBounds);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", syncViewportBounds);
    };
  }, [onClose, open]);

  if (!open || !viewportBounds) return null;

  return createPortal(
    <div className="community-write-category-sheet fixed inset-0 z-[110]">
      <div
        className="community-write-category-sheet__viewport absolute inset-y-0"
        style={{
          left: `${viewportBounds.left}px`,
          width: `${viewportBounds.width}px`,
        }}
      >
        <button
          type="button"
          aria-label="카테고리 선택 창 닫기"
          className="community-write-category-sheet__backdrop absolute inset-0 bg-offblack/30"
          onClick={onClose}
        />

        <section
          role="dialog"
          aria-modal="true"
          aria-label="글 카테고리 선택"
          className="community-write-category-sheet__panel absolute inset-x-0 bottom-0 h-[min(550px,calc(100dvh_-_16px))] touch-pan-y overflow-y-auto overscroll-contain"
        >
          <CommunityComment
            items={categoryItems}
            onSelect={onSelect}
            className="h-full"
          />
        </section>
      </div>
    </div>,
    document.body,
  );
}
