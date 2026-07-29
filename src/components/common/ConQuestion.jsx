import Icon from "./Icon";
import Profile from "./Profile";

// 피그마: con-question (390×217) — 커뮤니티 질문 글 카드
export default function ConQuestion({
  profileName,
  profileTime,
  profileImg,
  anonymous = false,
  title,
  text,
  likes = 0,
  comments = 0,
  onProfileClick,
  onDelete,
  className = "",
}) {
  return (
    <div
      className={`flex w-full flex-col items-start gap-[20px] overflow-hidden rounded-2xl border border-light-grey bg-offwhite p-4 ${className}`}
    >
      <Profile
        variant={anonymous ? "none" : "default"}
        name={profileName}
        time={profileTime}
        img={profileImg}
        onClick={anonymous ? undefined : onProfileClick}
        trailing={
          onDelete ? (
            <button
              type="button"
              aria-label="게시물 삭제"
              onClick={onDelete}
              className="flex size-8 shrink-0 items-center justify-center text-[26px] font-light leading-none text-grey"
            >
              ×
            </button>
          ) : undefined
        }
      />
      <div className="flex w-full flex-col gap-1.5">
        <p className="text-body-semibold-16 text-offblack">{title}</p>
        <p className="whitespace-pre-line text-body-regular-14 text-subtext">{text}</p>
      </div>
      <Icon likes={likes} comments={comments} />
    </div>
  );
}
