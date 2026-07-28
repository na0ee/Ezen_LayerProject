import Badge from "./Badge";

// 피그마: review_Aisummary (390×108) — AI가 요약한 리뷰 한 덩어리
// icon: 제목 앞에 붙일 아이콘 경로 (향수 상세의 AI 요약은 lucide/sparkles를 쓴다)
export default function ReviewAiSummary({
  title = "AI리뷰 요약",
  icon,
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
          <div className="flex items-center gap-1">
            {icon && <img src={icon} alt="" className="size-3" />}
            <p className="text-body-semibold-16 text-offblack">{title}</p>
          </div>
          {badge && <Badge variant={badge} />}
        </div>
        <p className="text-body-regular-14 text-subtext">{summary}</p>
      </div>
    </div>
  );
}
