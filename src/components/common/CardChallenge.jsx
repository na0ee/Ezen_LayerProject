import BtnSmall from "./BtnSmall";

// 피그마: card-challenge (390×260) — 화면 폭에 맞춰 3:2 비율로 축소된다.
// 작은 가로형은 card-challenge-small(=CardChallengeSmall, 380×120)
export default function CardChallenge({
  img,
  title,
  desc,
  actionLabel = "참여하기",
  onAction,
  className = "",
}) {
  return (
    <div
      className={`relative flex aspect-[3/2] w-full min-w-0 items-end overflow-hidden rounded-2xl bg-light-grey p-[clamp(12px,4.65vw,20px)] shadow-[5px_4px_4px_0px_rgba(0,0,0,0.06)] ${className}`}
    >
      {img && (
        <img src={img} alt="" className="absolute inset-0 size-full object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-offblack/50 to-transparent" />
      <div className="relative flex w-full min-w-0 items-end justify-between gap-[clamp(8px,2.8vw,12px)]">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
          <p className="w-full truncate text-title-semibold-18 text-offwhite">{title}</p>
          <p className="w-full truncate text-body-regular-14 text-offwhite">
            {desc}
          </p>
        </div>
        <BtnSmall className="shrink-0" onClick={onAction}>
          {actionLabel}
        </BtnSmall>
      </div>
    </div>
  );
}
