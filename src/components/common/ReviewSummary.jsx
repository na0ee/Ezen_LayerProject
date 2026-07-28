import Badge from "./Badge";
import Icon from "./Icon";
import Profile from "./Profile";

// 피그마: review_summary (390×192) — 프로필 + 뱃지 + 본문 + 좋아요/댓글 카운트
export default function ReviewSummary({
  profileName,
  profileTime,
  profileImg,
  anonymous = false,
  badge = "good",
  text,
  likes = 0,
  comments = 0,
  liked = false,
  onLike,
  className = "",
}) {
  return (
    <div
      className={`flex w-full flex-col items-end gap-4 rounded-2xl border border-light-grey bg-offwhite p-4 ${className}`}
    >
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full items-start justify-between">
          <Profile
            variant={anonymous ? "none" : "default"}
            name={profileName}
            time={profileTime}
            img={profileImg}
          />
          {badge && <Badge variant={badge} />}
        </div>
        <p className="whitespace-pre-line text-body-regular-14 text-subtext">{text}</p>
      </div>
      <Icon likes={likes} comments={comments} liked={liked} onLike={onLike} />
    </div>
  );
}
