import Badge from "./Badge";
import Icon from "./Icon";
import KeywordList from "./KeywordList";

// 피그마: con2 (430×687) — 이미지가 큰 피드형 게시글 카드
// imgs를 배열로 받아 가로 스와이프(캐러셀)로 표시
export default function Con2({
  profileName,
  profileTime,
  profileImg,
  imgs = [],
  badge = "good",
  title,
  text,
  keywords = [],
  likes = 0,
  comments = 0,
  imageOverlay,
  onProfileClick,
  className = "",
}) {
  return (
    <div
      className={`flex w-full flex-col items-center gap-6 overflow-hidden rounded-b-2xl bg-offwhite p-5 ${className}`}
    >
      <button
        type="button"
        onClick={onProfileClick}
        className="flex w-full items-center gap-2.5 text-left"
      >
        <div className="size-[42px] shrink-0 overflow-hidden rounded-full bg-2light-grey">
          {profileImg && (
            <img src={profileImg} alt="" className="size-full object-cover" />
          )}
        </div>
        <div className="flex min-w-0 flex-col justify-center gap-[3px]">
          <p className="truncate text-body-semibold-16 text-offblack">{profileName}</p>
          <p className="truncate text-caption-medium-12 text-grey">{profileTime}</p>
        </div>
      </button>

      <div className="flex w-full flex-col items-end gap-3">
        <div className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto">
          {imgs.length > 0 ? (
            imgs.map((src, i) => (
              <div
                key={src}
                className="relative h-[430px] w-full shrink-0 snap-center overflow-hidden rounded-lg"
              >
                <img
                  src={src}
                  alt=""
                  className="size-full object-cover"
                />
                {typeof imageOverlay === "function"
                  ? imageOverlay(i)
                  : imageOverlay}
              </div>
            ))
          ) : (
            <div className="h-[430px] w-full shrink-0 rounded-lg bg-2light-grey" />
          )}
        </div>
        <div className="flex h-6 w-full items-start justify-between">
          <Icon likes={likes} comments={comments} />
          {badge && <Badge variant={badge} />}
        </div>
      </div>

      <div className="flex w-full flex-col justify-center gap-3">
        <div className="flex w-full flex-col gap-1.5">
          <p className="text-body-semibold-16 text-offblack">{title}</p>
          <p className="text-body-regular-14 text-subtext">{text}</p>
        </div>
        <KeywordList variant="subtext" keywords={keywords} />
      </div>
    </div>
  );
}
