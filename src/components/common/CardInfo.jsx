import Bell from "./Bell";
import CheckBox from "./CheckBox";
import Heart from "./Heart";
import KeywordList from "./KeywordList";

// 피그마: card-info (속성 1=perfume|raffle, 속성 2=a|b|c|d) — 390px 가로 리스트 카드
// perfume-a: 하트 / perfume-b: 체크박스 / perfume-c: 없음 / perfume-d: 사용기록+메모
// raffle-a: 이미지 위 마감시간 + 벨 / raffle-b: 벨
export default function CardInfo({
  variant = "perfume",
  type = "a",
  img,
  brand,
  name,
  keywords = [],
  liked = true,
  onLike,
  checked = true,
  onCheck,
  onBell,
  day,
  time,
  lastUsed,
  memo,
  className = "",
}) {
  const isRaffle = variant === "raffle";
  const isD = variant === "perfume" && type === "d";
  const alignStart = isRaffle || (variant === "perfume" && type === "b");

  return (
    <div
      className={`flex w-[390px] justify-end gap-5 overflow-hidden rounded-2xl border border-light-grey bg-offwhite p-3 ${
        alignStart ? "items-start" : "items-end"
      } ${className}`}
    >
      <div className="flex min-w-0 flex-1 items-start gap-5">
        <div className="relative size-[100px] shrink-0 overflow-hidden rounded-lg bg-2light-grey">
          {img && <img src={img} alt="" className="size-full object-cover" />}
          {isRaffle && type === "a" && (
            <>
              <div className="absolute inset-0 bg-offblack/50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                <p className="text-caption-semibold-10 text-offwhite">{day}</p>
                <p className="text-body-semibold-16 text-offwhite">{time}</p>
              </div>
            </>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          {isD ? (
            <>
              {/* 피그마: info + 사용기록은 8px, 그 아래 메모는 12px 간격 */}
              <div className="flex flex-col gap-2">
                <div className="flex h-[37px] flex-col justify-center gap-1 overflow-hidden">
                  <p className="truncate text-caption-regular-12 text-grey">{brand}</p>
                  <p className="truncate text-body-semibold-16 text-offblack">{name}</p>
                </div>
                <p className="text-caption-regular-12 text-subtext">{lastUsed}</p>
              </div>
              {memo && (
                <div className="rounded-lg bg-2light-grey p-2">
                  <p className="text-caption-regular-12 text-subtext">{memo}</p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex h-[37px] flex-col justify-center gap-1 overflow-hidden">
                <p className="truncate text-caption-regular-12 text-grey">{brand}</p>
                <p className="truncate text-body-semibold-16 text-offblack">{name}</p>
              </div>
              <KeywordList variant="grey" keywords={keywords} />
            </>
          )}
        </div>
      </div>

      {variant === "perfume" && type === "a" && (
        <Heart variant={liked ? "abled" : "grey1"} onClick={onLike} className="shrink-0" />
      )}
      {variant === "perfume" && type === "b" && (
        <CheckBox
          variant={checked ? "orange" : "white"}
          onClick={() => onCheck?.(!checked)}
          className="shrink-0"
        />
      )}
      {isRaffle && <Bell onClick={onBell} className="shrink-0" />}
    </div>
  );
}
