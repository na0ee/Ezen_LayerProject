import Badge from "./Badge";
import Img from "./Img";

// 피그마: review_summary2 (300×128) — 최대 크기를 유지하며 좁은 부모에 맞춰 줄어든다.
export default function ReviewSummary2({
  badge = "good",
  title,
  text,
  img,
  className = "",
}) {
  return (
    <div
      className={`flex aspect-[75/32] w-full max-w-75 min-w-0 flex-col justify-center overflow-hidden rounded-2xl border border-light-grey bg-offwhite p-[clamp(10px,3.72vw,16px)] ${className}`}
    >
      <div className="flex w-full min-w-0 flex-1 items-start justify-between gap-3">
        <div className="flex h-full min-w-0 flex-1 flex-col gap-3">
          {badge && <Badge variant={badge} />}
          <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden">
            <p className="truncate text-body-semibold-16 text-offblack">{title}</p>
            {/* 피그마: 본문 영역 높이 40px = 2줄까지만 노출하고 말줄임 */}
            <p className="line-clamp-2 text-body-regular-14 text-subtext">{text}</p>
          </div>
        </div>
        <Img
          size="medium"
          color="white"
          src={img}
          className="!size-[clamp(48px,13.95vw,60px)]"
        />
      </div>
    </div>
  );
}
