import moreDots from "../../assets/icons/more-dots.svg";
import Badge from "./Badge";
import Icon from "./Icon";
import Img from "./Img";
import KeywordList from "./KeywordList";

// 피그마: review_summary1 (390×303) — 레이어링한 향수 여러 개 + 제목/본문/키워드 + 카운트/날짜
export default function ReviewSummary1({
  badge = "good",
  perfumeImgs = [],
  title,
  text,
  keywords = [],
  likes = 0,
  comments = 0,
  date,
  onMore,
  className = "",
}) {
  return (
    <div
      className={`flex w-full flex-col rounded-2xl border border-light-grey bg-offwhite p-4 ${className}`}
    >
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-1.5">
            <div className="flex w-full items-center justify-between">
              {badge && <Badge variant={badge} />}
              <button type="button" aria-label="더보기" onClick={onMore} className="size-6">
                <img src={moreDots} alt="" className="size-6" />
              </button>
            </div>
            <div className="flex w-full items-start gap-3">
              {perfumeImgs.map((src, i) => (
                <Img key={i} size="small" color="white" src={src} />
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col gap-3">
            <div className="flex w-full flex-col justify-center gap-1.5">
              <p className="text-body-semibold-16 text-offblack">{title}</p>
              <p className="whitespace-pre-line text-body-regular-14 text-subtext">
                {text}
              </p>
            </div>
            <KeywordList variant="subtext" keywords={keywords} />
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <Icon likes={likes} comments={comments} />
          <p className="text-body-regular-14 text-grey">{date}</p>
        </div>
      </div>
    </div>
  );
}
