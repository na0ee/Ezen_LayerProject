import BtnGo from "./BtnGo";

// 피그마: card-challenge-small (380×120) — 19:6 비율을 유지하며 화면 폭에 맞춰 축소된다.
export default function CardChallengeSmall({
  img,
  imgClassName = "size-full object-cover",
  title,
  desc,
  actionLabel = "참여하기",
  onAction,
  className = "",
}) {
  const handleKeyDown = (event) => {
    if (!onAction || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    onAction(event);
  };

  const handleActionClick = (event) => {
    event.stopPropagation();
    onAction?.(event);
  };

  return (
    <div
      data-challenge-small
      role={onAction ? "button" : undefined}
      tabIndex={onAction ? 0 : undefined}
      onClick={onAction}
      onKeyDown={handleKeyDown}
      className={`flex aspect-[19/6] w-[min(380px,calc(100vw_-_40px))] max-w-full min-w-0 items-center overflow-hidden rounded-2xl border border-light-grey bg-offwhite ${
        onAction ? "cursor-pointer" : ""
      } ${className}`}
    >
      <div className="relative aspect-square h-full shrink-0 overflow-hidden bg-2light-grey">
        {img && <img src={img} alt="" className={imgClassName} />}
      </div>
      <div className="flex h-full min-w-0 flex-1 flex-col justify-center gap-[clamp(6px,2.8vw,12px)] py-[clamp(8px,2.8vw,12px)] pl-[clamp(10px,4.65vw,20px)] pr-[clamp(8px,2.8vw,12px)]">
        <div className="flex min-w-0 flex-col gap-1">
          <p className="w-full truncate text-[clamp(12px,3.72vw,16px)] font-semibold leading-normal text-offblack">
            {title}
          </p>
          <p className="w-full truncate text-[clamp(10px,2.8vw,12px)] leading-normal text-offblack">
            {desc}
          </p>
        </div>
        <BtnGo
          variant="go"
          onClick={handleActionClick}
          className="text-[clamp(11px,3.25vw,14px)]"
        >
          {actionLabel}
        </BtnGo>
      </div>
    </div>
  );
}
