import BtnSmall from "./BtnSmall";

// 피그마: card-challenge (390×260) — 배경 이미지 + 어두운 그라데이션 + 하단 제목/설명 + 참여 버튼
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
      className={`relative flex h-[260px] w-[390px] items-end overflow-hidden rounded-2xl bg-light-grey p-5 shadow-[5px_4px_4px_0px_rgba(0,0,0,0.06)] ${className}`}
    >
      {img && (
        <img src={img} alt="" className="absolute inset-0 size-full object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-offblack/50 to-transparent" />
      <div className="relative flex w-full items-end justify-between">
        <div className="flex w-[271px] shrink-0 flex-col items-start gap-1">
          <p className="text-title-semibold-18 text-offwhite">{title}</p>
          <p className="whitespace-nowrap text-body-regular-14 text-offwhite">
            {desc}
          </p>
        </div>
        <BtnSmall onClick={onAction}>{actionLabel}</BtnSmall>
      </div>
    </div>
  );
}
