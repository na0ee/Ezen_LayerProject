import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import creedOriginalVetiver from "../../assets/Community/Recommendation/product-creed-original-vetiver.png";
import diptyqueDoSon from "../../assets/Community/Recommendation/product-diptyque-do-son.png";
import { CardSmall, Input, Search, Tab } from "../../components/common";

interface CommunityRecommendationSelectSheetProps {
  open: boolean;
  onClose: () => void;
}

interface ViewportBounds {
  left: number;
  width: number;
}

const recommendationProducts = [
  {
    id: "creed-original-vetiver",
    brand: "Creed",
    name: "오리지날 베티버 오 드 퍼퓸",
    image: creedOriginalVetiver,
  },
  {
    id: "diptyque-do-son",
    brand: "Diptyque",
    name: "도 손 오 드 퍼퓸",
    image: diptyqueDoSon,
  },
] as const;

export default function CommunityRecommendationSelectSheet({
  open,
  onClose,
}: CommunityRecommendationSelectSheetProps) {
  const [message, setMessage] = useState("");
  const [viewportBounds, setViewportBounds] =
    useState<ViewportBounds | null>(null);

  useLayoutEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const preventDocumentScroll = (event: Event) => {
      event.preventDefault();
    };
    const syncViewportBounds = () => {
      const pageWrap = document.querySelector<HTMLElement>(
        ".community-feed-page__wrap",
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
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", syncViewportBounds);
    window.addEventListener("wheel", preventDocumentScroll, {
      passive: false,
    });
    window.addEventListener("touchmove", preventDocumentScroll, {
      passive: false,
    });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", syncViewportBounds);
      window.removeEventListener("wheel", preventDocumentScroll);
      window.removeEventListener("touchmove", preventDocumentScroll);
    };
  }, [onClose, open]);

  if (!open || !viewportBounds) return null;

  const handleSend = () => {
    if (!message.trim()) return;
    setMessage("");
  };

  return createPortal(
    <div className="community-recommendation-select-sheet fixed inset-0 z-50">
      <div
        className="community-recommendation-select-sheet__viewport absolute inset-y-0"
        style={{
          left: `${viewportBounds.left}px`,
          width: `${viewportBounds.width}px`,
        }}
      >
        <button
          type="button"
          aria-label="향수 추천 선택 창 닫기"
          className="community-recommendation-select-sheet__backdrop absolute inset-0 bg-offblack/30"
          onClick={onClose}
        />

        <section
          role="dialog"
          aria-modal="true"
          aria-label="추천할 향수 선택"
          className="community-recommendation-select-sheet__panel absolute inset-x-0 bottom-0 flex h-[441px] max-h-[100dvh] flex-col items-center gap-4 overflow-hidden rounded-t-[20px] bg-offwhite pb-[40px] pt-4"
        >
          <div className="community-recommendation-select-sheet__handle h-1 w-8 shrink-0 rounded-[24px] bg-2light-grey" />

          <div className="community-recommendation-select-sheet__products flex w-full flex-col gap-[16px] px-[20px]">
            <Search
              variant="no-icon"
              aria-label="추천 향수 검색"
              className="community-recommendation-select-sheet__search"
            />

            <div className="community-recommendation-select-sheet__results flex flex-col gap-4">
              <div className="community-recommendation-select-sheet__filters flex items-center gap-[6px]">
                <Tab>위시리스트</Tab>
                <Tab>내 보관함</Tab>
              </div>

              {recommendationProducts.map((product) => (
                <CardSmall
                  key={product.id}
                  variant="medium-b"
                  img={product.image}
                  brand={product.brand}
                  name={product.name}
                  className={`community-recommendation-select-sheet__product community-recommendation-select-sheet__product--${product.id} w-full!`}
                />
              ))}
            </div>
          </div>

          <div className="community-recommendation-select-sheet__input mt-[14px] w-full px-[20px]">
            <Input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onSend={handleSend}
              placeholder="추천메시지를 입력하세요"
            />
          </div>
        </section>
      </div>
    </div>,
    document.body,
  );
}
