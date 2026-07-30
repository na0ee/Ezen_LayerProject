import { useEffect, useState } from "react";
import profileYeeunTv from "../../assets/Community/Profile/profile-yeeuntv.avif";
import countChat from "../../assets/icons/count-chat.svg";
import countHeart from "../../assets/icons/count-heart.svg";
import { getUserProfile } from "../../data/userProfile";
import Input from "./Input";

const COMMENTS = [
  {
    id: "loewe-recommendation",
    author: "예은티비",
    message: "로에베 아이레 수틸레사 오 드 뚜왈렛 50ml 추천이요!!",
    likes: 42,
    replies: 8,
  },
  {
    id: "olive-young",
    author: "예은티비",
    message: "올영가보세요 ~...",
    likes: 42,
    replies: 8,
  },
];

// comments를 넘기면 그 목록을 쓰고, 없으면 기존 예시 댓글을 보여준다
export default function CommunityReviewCommentSheet({
  open = false,
  onClose,
  comments,
  onAddComment,
  onDeleteComment,
  commentKey = "comment",
}) {
  const commentList = comments ?? COMMENTS;
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  const handleSend = () => {
    const nextMessage = message.trim();
    if (!nextMessage) return;
    onAddComment?.({
      id: `${commentKey}-user-${Date.now()}`,
      author: getUserProfile().nickname || "나",
      avatar: getUserProfile().image,
      message: nextMessage,
      likes: 0,
      replies: 0,
      isMine: true,
    });
    setMessage("");
  };

  return (
    <div
      className="community-review-comments fixed inset-y-0 left-1/2 z-[200] w-full max-w-[430px] -translate-x-1/2"
      role="presentation"
    >
      <button
        type="button"
        aria-label="댓글 창 닫기"
        className="absolute inset-0 bg-offblack/30"
        onClick={onClose}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="community-review-comments-title"
        className="community-review-comments__sheet absolute inset-x-0 bottom-0 flex h-[min(440px,calc(100dvh_-_64px))] flex-col overflow-hidden rounded-t-2xl bg-offwhite"
      >
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[14px] h-1 w-8 -translate-x-1/2 rounded-3xl bg-2light-grey"
        />

        <header className="community-review-comments__header flex h-20 shrink-0 items-end border-b border-light-grey px-5 pb-3">
          <h2
            id="community-review-comments-title"
            className="text-body-medium-16 text-offblack"
          >
            댓글
          </h2>
        </header>

        <div className="community-review-comments__body flex min-h-0 flex-1 flex-col">
          <div className="community-review-comments__list flex min-h-0 flex-1 flex-col gap-7 overflow-y-auto px-5 pt-[30px]">
            {commentList.map((comment) => (
              <article
                key={comment.id}
                className="community-review-comments__item flex items-start gap-[14px]"
              >
                <img
                  src={comment.avatar ?? profileYeeunTv}
                  alt=""
                  className="size-[26px] shrink-0 rounded-full object-cover"
                />

                <div className="flex min-w-0 flex-1 flex-col gap-[17px]">
                  <div className="flex min-w-0 flex-col gap-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-body-regular-14 text-grey">
                        {comment.author}
                      </p>
                      {(comment.isMine ||
                        String(comment.id).includes("-user-")) && (
                        <button
                          type="button"
                          aria-label="댓글 삭제"
                          onClick={() => onDeleteComment?.(comment.id)}
                          className="shrink-0 text-caption-regular-12 text-grey underline"
                        >
                          삭제
                        </button>
                      )}
                    </div>
                    <p className="text-body-regular-14 text-offblack">
                      {comment.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <img
                        src={countHeart}
                        alt=""
                        className="size-[14px]"
                      />
                      <span className="text-caption-regular-12 text-grey">
                        {comment.likes}
                      </span>
                    </span>
                    <span className="flex items-center gap-1">
                      <img
                        src={countChat}
                        alt=""
                        className="size-[14px]"
                      />
                      <span className="text-caption-regular-12 text-grey">
                        {comment.replies}
                      </span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="community-review-comments__input shrink-0 px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-4">
            <Input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.nativeEvent.isComposing
                ) {
                  event.preventDefault();
                  handleSend();
                }
              }}
              onSend={handleSend}
              placeholder="댓글을 입력하세요"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
