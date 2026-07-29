import { useState } from "react";
import Badge from "./Badge";
import Icon from "./Icon";
import KeywordList from "./KeywordList";

// 피그마: con2 (430×687) — 이미지가 큰 피드형 게시글 카드
// imgs를 배열로 받아 가로 스와이프(캐러셀)로 표시
export default function Con2({
  profileName,
  profileTime,
  profileImg,
  imgs = [],
  badge = "good",
  title,
  text,
  keywords = [],
  likes = 0,
  comments = 0,
  imageOverlay,
  toggleImageOverlay = false,
  onProfileClick,
  onDelete,
  className = "",
}) {
  const [isImageOverlayVisible, setIsImageOverlayVisible] = useState(true);

  return (
    <div
      className={`flex w-full flex-col items-center gap-6 overflow-hidden rounded-b-2xl bg-offwhite p-5 ${className}`}
    >
      <div className="flex w-full items-center justify-between gap-3">
        <button
          type="button"
          onClick={onProfileClick}
          className="flex min-w-0 items-center gap-2.5 text-left"
        >
          <div className="size-[42px] shrink-0 overflow-hidden rounded-full bg-2light-grey">
            {profileImg && (
              <img src={profileImg} alt="" className="size-full object-cover" />
            )}
          </div>
          <div className="flex min-w-0 flex-col justify-center gap-[3px]">
            <p className="truncate text-body-semibold-16 text-offblack">{profileName}</p>
            <p className="truncate text-caption-medium-12 text-grey">{profileTime}</p>
          </div>
        </button>
        {onDelete && (
          <button
            type="button"
            aria-label="게시물 삭제"
            onClick={onDelete}
            className="flex size-8 shrink-0 items-center justify-center text-[26px] font-light leading-none text-grey"
          >
            ×
          </button>
        )}
      </div>

      <div className="flex w-full flex-col items-end gap-3">
        <div className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto">
          {imgs.length > 0 ? (
            imgs.map((src, i) => (
              <div
                key={src}
                role={toggleImageOverlay ? "button" : undefined}
                tabIndex={toggleImageOverlay ? 0 : undefined}
                aria-label={
                  toggleImageOverlay
                    ? isImageOverlayVisible
                      ? "향수 태그 숨기기"
                      : "향수 태그 보기"
                    : undefined
                }
                aria-pressed={
                  toggleImageOverlay ? isImageOverlayVisible : undefined
                }
                onClick={
                  toggleImageOverlay
                    ? () => setIsImageOverlayVisible((visible) => !visible)
                    : undefined
                }
                onKeyDown={
                  toggleImageOverlay
                    ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setIsImageOverlayVisible((visible) => !visible);
                        }
                      }
                    : undefined
                }
                className={`relative aspect-square w-full shrink-0 snap-center overflow-hidden rounded-lg ${
                  toggleImageOverlay ? "cursor-pointer" : ""
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="size-full object-cover"
                />
                {isImageOverlayVisible &&
                  (typeof imageOverlay === "function"
                    ? imageOverlay(i)
                    : imageOverlay)}
                {toggleImageOverlay && !isImageOverlayVisible && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-3 left-3 flex size-10 items-center justify-center rounded-full bg-offblack/75 shadow-sm backdrop-blur-sm"
                  >
                    <span className="relative h-3.5 w-[18px] rotate-45 rounded-[2px] bg-offwhite [clip-path:polygon(0_0,72%_0,100%_50%,72%_100%,0_100%)]">
                      <span className="absolute right-[3px] top-1/2 size-[3px] -translate-y-1/2 rounded-full bg-offblack/75" />
                    </span>
                  </span>
                )}
              </div>
            ))
          ) : (
            <div className="aspect-square w-full shrink-0 rounded-lg bg-2light-grey" />
          )}
        </div>
        <div className="flex h-6 w-full items-start justify-between">
          <Icon likes={likes} comments={comments} />
          {badge && <Badge variant={badge} />}
        </div>
      </div>

      <div className="flex w-full flex-col justify-center gap-3">
        <div className="flex w-full flex-col gap-1.5">
          <p className="text-body-semibold-16 text-offblack">{title}</p>
          <p className="text-body-regular-14 text-subtext">{text}</p>
        </div>
        <KeywordList variant="subtext" keywords={keywords} />
      </div>
    </div>
  );
}
