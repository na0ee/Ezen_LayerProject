import Heart from "./Heart";
import Tab from "./Tab";

// 피그마: card/rank (240×300) — 순위 뱃지 + 향수 이미지 + 이름/브랜드, 우하단 하트
export default function CardRank({
  rank,
  img,
  name,
  brand,
  liked = true,
  onLike,
  className = "",
}) {
  return (
    <div
      className={`relative flex h-[300px] w-[240px] items-end justify-end rounded-2xl border border-light-grey bg-offwhite p-3 ${className}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <Tab active>{rank}</Tab>
        <div className="size-[110px]">
          {img && <img src={img} alt="" className="size-full object-contain" />}
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <p className="truncate text-body-semibold-16 text-offblack">{name}</p>
          <p className="truncate text-caption-medium-12 text-grey">{brand}</p>
        </div>
      </div>
      <Heart
        variant={liked ? "abled" : "grey1"}
        onClick={onLike}
        className="relative shrink-0"
      />
    </div>
  );
}
