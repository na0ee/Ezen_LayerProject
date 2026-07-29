import { useState } from "react";
import countChat from "../../assets/icons/count-chat.svg";
import countHeart from "../../assets/icons/count-heart.svg";
import heartAbled from "../../assets/icons/heart-abled.svg";
import CommunityReviewCommentSheet from "./CommunityReviewCommentSheet";

// 피그마: icon (2348:9120) — 좋아요/댓글 카운트 표시
// onLike를 넘기면 하트가 버튼이 되고, liked에 따라 회색 외곽선 ↔ 주황 채움으로 바뀐다.
// (피그마 icon에는 눌린 상태가 없어 Heart의 abled 아이콘을 가져다 씀)
export default function Icon({
  likes = 0,
  comments = 0,
  liked: controlledLiked = false,
  onLike,
  onCommentsClick,
  commentItems,
  className = "",
}) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [internalLiked, setInternalLiked] = useState(controlledLiked);
  const isControlled = typeof onLike === "function";
  const isLiked = isControlled ? controlledLiked : internalLiked;
  const likeCount = isControlled
    ? likes
    : likes + Number(internalLiked) - Number(controlledLiked);

  const handleCommentsClick = () => {
    onCommentsClick?.();
    setIsCommentsOpen(true);
  };

  const handleLike = (event) => {
    if (isControlled) {
      onLike(event);
      return;
    }

    setInternalLiked((current) => !current);
  };

  const heartImg = (
    <img
      src={isLiked ? heartAbled : countHeart}
      alt="좋아요"
      className="size-[18px] object-contain"
    />
  );

  return (
    <>
      <div className={`flex items-center gap-[12px] ${className}`}>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="좋아요"
            aria-pressed={isLiked}
            onClick={handleLike}
            className="flex size-[18px] shrink-0 items-center justify-center"
          >
            {heartImg}
          </button>
          <span className="text-body-regular-14 text-grey">{likeCount}</span>
        </div>
        <button
          type="button"
          aria-label={`댓글 ${comments}개 보기`}
          onClick={handleCommentsClick}
          className="flex items-center gap-1 p-0"
        >
          <img src={countChat} alt="댓글" className="size-[18px]" />
          <span className="text-body-regular-14 text-grey">{comments}</span>
        </button>
      </div>

      <CommunityReviewCommentSheet
        open={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        comments={commentItems}
      />
    </>
  );
}
