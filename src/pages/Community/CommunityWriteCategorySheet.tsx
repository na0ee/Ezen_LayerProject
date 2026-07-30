import { useEffect } from "react";
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

export default function CommunityWriteCategorySheet({
  open,
  onClose,
  onSelect,
}: CommunityWriteCategorySheetProps) {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  return createPortal(
    <div className="community-write-category-sheet fixed inset-0 z-[110]">
      <div className="community-write-category-sheet__viewport fixed inset-y-0 left-1/2 w-full max-w-[430px] -translate-x-1/2">
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
