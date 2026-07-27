import Badge from "./Badge";
import Img from "./Img";

// 피그마: review_summary2 (300×128) — 뱃지 + 제목/본문 + 우측 제품 썸네일 (가로 목록용)
export default function ReviewSummary2({
  badge = "good",
  title,
  text,
  img,
  className = "",
}) {
  return (
    <div
      className={`flex h-[128px] w-[300px] flex-col justify-center overflow-hidden rounded-2xl border border-light-grey bg-offwhite p-4 ${className}`}
    >
      <div className="flex w-full flex-1 items-start justify-between">
        <div className="flex h-full w-[172px] flex-col gap-3">
          {badge && <Badge variant={badge} />}
          <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden">
            <p className="truncate text-body-semibold-16 text-offblack">{title}</p>
            {/* 피그마: 본문 영역 높이 40px = 2줄까지만 노출하고 말줄임 */}
            <p className="line-clamp-2 text-body-regular-14 text-subtext">{text}</p>
          </div>
        </div>
        <Img size="medium" color="white" src={img} />
      </div>
    </div>
  );
}
