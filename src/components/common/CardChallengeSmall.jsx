import BtnGo from "./BtnGo";

// 피그마: card-challenge-small (380×120) — 왼쪽 정사각 이미지 + 제목/설명 + 참여하기 링크
export default function CardChallengeSmall({
  img,
  imgClassName = "size-full object-cover",
  title,
  desc,
  actionLabel = "참여하기",
  onAction,
  className = "",
}) {
  return (
    <div
      className={`flex h-30 w-95 items-center overflow-hidden rounded-2xl border border-light-grey bg-offwhite ${className}`}
    >
      <div className="relative size-30 shrink-0 overflow-hidden bg-2light-grey">
        {img && <img src={img} alt="" className={imgClassName} />}
      </div>
      <div className="flex h-full min-w-0 flex-1 flex-col justify-center gap-3 py-3 pl-5 pr-3">
        <div className="flex flex-col gap-1">
          <p className="text-body-semibold-16 text-offblack">{title}</p>
          <p className="text-caption-regular-12 text-offblack">{desc}</p>
        </div>
        <BtnGo variant="go" onClick={onAction}>
          {actionLabel}
        </BtnGo>
      </div>
    </div>
  );
}
