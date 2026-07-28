import chevronDown from "../../assets/icons/chevron-down.svg";
import Heart from "./Heart";

// 피그마: card-small (속성 1=small|medium, 속성 2=a|b|recommend, 속성 3=heart)
// variant로 통합: "small" | "medium-a" | "medium-b" | "medium-recommend"
// medium-b는 showHeart로 하트 유무 선택 (피그마 속성 3)
export default function CardSmall({
  variant = "small",
  img,
  brand,
  name,
  sub,
  perfume,
  comment,
  showHeart = false,
  liked = true,
  onLike,
  className = "",
  ...rest
}) {
  // 이미지 위에 올리는 반투명 소형 카드
  if (variant === "small") {
    return (
      <div
        className={`inline-flex items-center gap-2 overflow-hidden rounded-lg bg-offblack70 p-2 ${className}`}
        {...rest}
      >
        <div className="size-[38px] shrink-0 overflow-hidden rounded-lg bg-2light-grey">
          {img && <img src={img} alt="" className="size-full object-cover" />}
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <p className="truncate text-caption-regular-12 text-offwhite">{brand}</p>
          <p className="truncate text-caption-medium-12 text-offwhite">{name}</p>
        </div>
      </div>
    );
  }

  // 목록에서 펼치는 행 (오른쪽 chevron)
  if (variant === "medium-a") {
    return (
      <div
        className={`flex w-[390px] items-center justify-between rounded-2xl border border-light-grey bg-offwhite p-3 ${className}`}
        {...rest}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="size-[38px] shrink-0 overflow-hidden rounded-lg bg-2light-grey">
            {img && <img src={img} alt="" className="size-full object-cover" />}
          </div>
          <div className="flex min-w-0 flex-col justify-center gap-1">
            <p className="truncate text-body-regular-14 text-offblack">{name}</p>
            <p className="truncate text-caption-regular-12 text-grey">{sub}</p>
          </div>
        </div>
        <img src={chevronDown} alt="" className="size-[18px] shrink-0" />
      </div>
    );
  }

  // 추천 코멘트 카드
  if (variant === "medium-recommend") {
    return (
      <div
        className={`flex w-full items-start gap-3 overflow-hidden rounded-2xl border border-light-grey bg-offwhite p-3 ${className}`}
        {...rest}
      >
        <div className="size-[60px] shrink-0 overflow-hidden rounded-lg">
          {img && <img src={img} alt="" className="size-full object-cover" />}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1 overflow-hidden">
          <div className="flex items-end gap-2">
            <p className="truncate text-body-semibold-16 text-offblack">{name}</p>
            <p className="truncate text-caption-regular-12 text-grey">{perfume}</p>
          </div>
          <p className="truncate text-body-regular-14 text-grey">{comment}</p>
        </div>
      </div>
    );
  }

  // medium-b: 브랜드/제품명 (+ 하트)
  return (
    <div
      className={`flex w-full justify-between gap-3 overflow-hidden rounded-2xl border border-light-grey bg-offwhite p-3 ${
        showHeart ? "items-end" : "items-start"
      } ${className}`}
      {...rest}
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex size-[60px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-2light-grey">
          {img && <img src={img} alt="" className="h-[40px] w-auto object-contain" />}
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <p className="truncate text-caption-regular-12 text-grey">{brand}</p>
          <p className="truncate text-body-semibold-16 text-offblack">{name}</p>
        </div>
      </div>
      {showHeart && (
        <Heart variant={liked ? "abled" : "grey1"} onClick={onLike} className="shrink-0" />
      )}
    </div>
  );
}
