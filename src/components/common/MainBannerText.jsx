import BtnGo from "./BtnGo";

// 피그마: main/banner/text (390×214) — 배경 이미지 + 영문 라벨 + 카피 + 응모 버튼
export default function MainBannerText({
  img,
  imgClassName = "absolute inset-0 size-full object-cover",
  label,
  title,
  actionLabel,
  onAction,
  className = "",
}) {
  return (
    <div
      className={`relative flex h-53.5 w-full flex-col justify-between overflow-hidden rounded-2xl bg-light-grey p-5 ${className}`}
    >
      {img && (
        <img src={img} alt="" className={imgClassName} />
      )}
      <p className="relative font-en text-en-semibold-16 text-offwhite">{label}</p>
      <div className="relative flex w-full items-end justify-between gap-4">
        <p className="whitespace-pre-line text-body-semibold-16 text-offwhite">
          {title}
        </p>
        <BtnGo variant="raffle" onClick={onAction}>
          {actionLabel}
        </BtnGo>
      </div>
    </div>
  );
}
