import Heart from "./Heart";

// 피그마: middlecard (190×256) — 배경 이미지 + 하단 그라데이션 + 제목/설명, 우상단 하트
export default function MiddleCard({
  img,
  title,
  desc,
  liked = true,
  onLike,
  className = "",
}) {
  return (
    <div
      className={`relative h-64 w-[190px] overflow-hidden rounded-2xl bg-light-grey ${className}`}
    >
      {img && (
        <img src={img} alt="" className="absolute inset-0 size-full object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
      <div className="absolute right-0 top-0 p-4">
        <Heart variant={liked ? "abled" : "grey1"} onClick={onLike} />
      </div>
      {/* 텍스트 박스는 피그마와 동일하게 160px 고정 (패딩 폭 158px보다 2px 넓음) */}
      <div className="absolute bottom-4 left-4 flex w-40 flex-col gap-2">
        <p className="truncate text-body-semibold-16 text-offwhite">{title}</p>
        <p className="whitespace-pre-line text-caption-medium-12 text-offwhite">
          {desc}
        </p>
      </div>
    </div>
  );
}
