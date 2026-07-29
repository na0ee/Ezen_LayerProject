import { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import creedOriginalVetiver from "../../assets/Community/Recommendation/product-creed-original-vetiver.png";
import diptyqueDoSon from "../../assets/Community/Recommendation/product-diptyque-do-son.png";
import {
  BtnBig,
  CardSmall,
  Input,
  Search,
  Tab,
} from "../../components/common";

interface CommunityRecommendationSelectSheetProps {
  open: boolean;
  onClose: () => void;
  recipientName?: string;
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
  recipientName = "Juhoon",
}: CommunityRecommendationSelectSheetProps) {
  const [message, setMessage] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [viewportBounds, setViewportBounds] =
    useState<ViewportBounds | null>(null);

  useEffect(() => {
    if (!open) return;
    setMessage("");
    setSelectedProductIds([]);
    setIsComplete(false);
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
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

  const handleSend = () => {
    if (selectedProductIds.length === 0) return;
    setIsComplete(true);
  };

  const toggleProduct = (productId: string) => {
    setSelectedProductIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  };

  return createPortal(
    <div className="community-recommendation-select-sheet fixed inset-0 z-[110]">
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

        {!isComplete ? (
          <section
            role="dialog"
            aria-modal="true"
            aria-label="추천할 향수 선택"
            className="community-recommendation-select-sheet__panel absolute inset-x-0 bottom-0 flex h-[min(441px,calc(100dvh_-_16px))] touch-pan-y flex-col items-center gap-4 overflow-y-auto overscroll-contain rounded-t-[20px] bg-offwhite pb-[max(24px,env(safe-area-inset-bottom))] pt-4"
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

                {recommendationProducts.map((product) => {
                  const isSelected = selectedProductIds.includes(product.id);

                  return (
                    <button
                      type="button"
                      key={product.id}
                      aria-pressed={isSelected}
                      onClick={() => toggleProduct(product.id)}
                      className="w-full text-left"
                    >
                      <CardSmall
                        variant="medium-b"
                        img={product.image}
                        brand={product.brand}
                        name={product.name}
                        className={`community-recommendation-select-sheet__product community-recommendation-select-sheet__product--${product.id} w-full! ${
                          isSelected ? "!bg-2light-grey" : ""
                        }`}
                      />
                    </button>
                  );
                })}
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
        ) : (
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="recommendation-complete-title"
            className="absolute left-5 right-5 top-1/2 -translate-y-1/2 rounded-[20px] bg-offwhite px-6 py-8 text-center"
          >
            <h2
              id="recommendation-complete-title"
              className="text-title-semibold-24 text-offblack"
            >
              추천 완료
            </h2>
            <p className="mt-4 text-body-medium-16 text-grey">
              {recipientName}님에게 향수 추천을 보냈어요.
            </p>
            <BtnBig className="mt-7" onClick={onClose}>
              확인
            </BtnBig>
          </section>
        )}
      </div>
    </div>,
    document.body,
  );
}
