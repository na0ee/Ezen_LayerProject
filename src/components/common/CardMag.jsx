// 피그마: card-mag (320×452) — 배경 이미지 + 하단 반투명 박스(제목/요약)
// 매거진 섹션의 MagListCard(262×289)와 다른 컴포넌트이므로 혼동 주의
export default function CardMag({
  img,
  title,
  desc,
  imgClassName = "absolute inset-0 size-full object-cover",
  className = "",
}) {
  return (
    <div
      className={`relative flex h-113 w-80 flex-col justify-end overflow-hidden rounded-3xl bg-light-grey p-3 ${className}`}
    >
      {img && (
        <img src={img} alt="" className={imgClassName} />
      )}
      {/* 피그마: inner 높이 124px 고정, 텍스트는 상단 정렬 */}
      <div className="glass-surface-dark glass-rim-light glass-depth relative flex h-31 w-full flex-col gap-1.5 overflow-hidden rounded-[20px] p-4">
        <p className="truncate text-title-semibold-18 text-offwhite">{title}</p>
        <p className="whitespace-pre-line text-caption-medium-12 leading-[1.4] text-offwhite">
          {desc}
        </p>
      </div>
    </div>
  );
}
