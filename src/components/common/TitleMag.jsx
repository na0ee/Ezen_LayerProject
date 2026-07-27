import Heart from "./Heart";
import TagMag from "./TagMag";

// 피그마: title-mag (속성 1=default | +subtext) → variant="default" | "subtext"
// default: 영문 세리프 제목(브랜드명) / subtext: 한글 제목 + 부제
// 이미지 위에 올리는 용도라 텍스트는 모두 흰색
export default function TitleMag({
  variant = "default",
  tag,
  title,
  sub,
  liked = true,
  onLike,
  className = "",
}) {
  const isSubtext = variant === "subtext";
  return (
    <div className={`flex w-full flex-col items-start gap-2.5 ${className}`}>
      {tag && <TagMag>{tag}</TagMag>}
      <div
        className={`flex w-full justify-between ${isSubtext ? "items-end" : "items-center"}`}
      >
        {isSubtext ? (
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="text-title-semibold-24 text-offwhite">{title}</p>
            <p className="text-subtitle-regular-16 text-offwhite">{sub}</p>
          </div>
        ) : (
          <p className="font-en text-en-semibold-24 text-offwhite">{title}</p>
        )}
        <Heart variant={liked ? "abled" : "grey1"} onClick={onLike} />
      </div>
    </div>
  );
}
