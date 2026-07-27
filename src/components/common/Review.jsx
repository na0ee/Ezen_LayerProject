import BtnSmall from "./BtnSmall";
import Img from "./Img";

// 피그마: review (390×127) — 리뷰 작성 유도 카드 (제품 정보 + 작성 버튼)
export default function Review({
  img,
  brand,
  name,
  actionLabel = "리뷰 작성하기",
  onAction,
  className = "",
}) {
  return (
    <div
      className={`flex w-full flex-col rounded-2xl border border-light-grey bg-offwhite p-4 ${className}`}
    >
      <div className="flex w-full flex-col items-end gap-3">
        <div className="flex w-full items-start gap-3">
          <Img size="small" color="white" src={img} />
          <div className="flex min-w-0 flex-col justify-center gap-1 overflow-hidden">
            <p className="truncate text-body-regular-14 text-grey">{brand}</p>
            <p className="truncate text-body-regular-14 text-offblack">{name}</p>
          </div>
        </div>
        <BtnSmall variant="white" onClick={onAction}>
          {actionLabel}
        </BtnSmall>
      </div>
    </div>
  );
}
