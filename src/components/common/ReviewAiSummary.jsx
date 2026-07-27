import Badge from "./Badge";

// 피그마: review_Aisummary (390×108) — AI가 요약한 리뷰 한 덩어리
export default function ReviewAiSummary({
  title = "AI리뷰 요약",
  badge = "good",
  summary,
  className = "",
}) {
  return (
    <div
      className={`flex w-full flex-col rounded-2xl border border-light-grey bg-offwhite p-4 ${className}`}
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-start justify-between">
          <p className="text-body-semibold-16 text-offblack">{title}</p>
          {badge && <Badge variant={badge} />}
        </div>
        <p className="text-body-regular-14 text-subtext">{summary}</p>
      </div>
    </div>
  );
}
