import { useId, useState } from "react";
import countChat from "../../assets/icons/count-chat.svg";
import countHeart from "../../assets/icons/count-heart.svg";
import heartAbled from "../../assets/icons/heart-abled.svg";
import profileCottonScent from "../../assets/Community/Profile/profile-cotton-scent.png";
import profileFruityLover from "../../assets/Community/Profile/profile-fruity-lover.png";
import profileOfficeScent from "../../assets/Community/Profile/profile-office-scent.png";
import profilePassingPerfumer from "../../assets/Community/Profile/profile-passing-perfumer.png";
import profileRainyScent from "../../assets/Community/Profile/profile-rainy-scent.png";
import profileWoodyCollector from "../../assets/Community/Profile/profile-woody-collector.png";
import CommunityReviewCommentSheet from "./CommunityReviewCommentSheet";

const COMMENT_POOL = [
  { author: "향기로운하루", avatar: profileFruityLover, message: "분위기랑 향이 정말 잘 어울려요!", likes: 12, replies: 2 },
  { author: "잔향수집가", avatar: profileWoodyCollector, message: "저도 이 향 좋아해요. 잔향이 특히 예쁘더라고요.", likes: 8, replies: 1 },
  { author: "오늘의향", avatar: profileOfficeScent, message: "사진 보니까 직접 시향해보고 싶어졌어요.", likes: 5, replies: 0 },
  { author: "포근한머스크", avatar: profileCottonScent, message: "설명이 자세해서 향 고를 때 도움이 됐어요!", likes: 16, replies: 3 },
  { author: "우디러버", avatar: profileWoodyCollector, message: "이 조합은 생각 못 했는데 다음에 같이 써볼게요.", likes: 9, replies: 1 },
  { author: "향수입문자", avatar: profilePassingPerfumer, message: "지속력은 어느 정도였는지도 궁금해요.", likes: 4, replies: 2 },
  { author: "비오는날의향", avatar: profileRainyScent, message: "오늘 같은 날씨에 잘 어울릴 것 같아요.", likes: 7, replies: 0 },
  { author: "데일리센트", avatar: profileFruityLover, message: "저장해두고 다음 쇼핑 때 참고할게요!", likes: 11, replies: 1 },
];

const hashText = (value) =>
  [...value].reduce(
    (hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0,
    0,
  );

const createPostComments = (key) => {
  const start = hashText(key) % COMMENT_POOL.length;
  const length = 2 + (hashText(`${key}-length`) % 3);

  return Array.from({ length }, (_, index) => {
    const comment = COMMENT_POOL[(start + index * 3) % COMMENT_POOL.length];
    return {
      ...comment,
      id: `${key}-sample-${index}`,
    };
  });
};

const loadSavedComments = (key) => {
  try {
    const saved = JSON.parse(localStorage.getItem(`layer-comments:${key}`) ?? "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

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
  commentKey,
  className = "",
}) {
  const generatedId = useId();
  const resolvedCommentKey = commentKey ?? generatedId;
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [internalLiked, setInternalLiked] = useState(controlledLiked);
  const [savedComments, setSavedComments] = useState(() =>
    loadSavedComments(resolvedCommentKey),
  );
  const [sampleComments] = useState(() =>
    commentItems ?? createPostComments(resolvedCommentKey),
  );
  const isControlled = typeof onLike === "function";
  const isLiked = isControlled ? controlledLiked : internalLiked;
  const likeCount = isControlled
    ? likes
    : likes + Number(internalLiked) - Number(controlledLiked);
  const visibleComments = [...sampleComments, ...savedComments];
  const commentCount = Math.max(comments, sampleComments.length) + savedComments.length;

  const handleAddComment = (comment) => {
    setSavedComments((current) => {
      const next = [...current, comment];
      try {
        localStorage.setItem(
          `layer-comments:${resolvedCommentKey}`,
          JSON.stringify(next),
        );
      } catch {
        // 저장 공간이 부족해도 현재 화면에는 등록된 댓글을 유지한다.
      }
      return next;
    });
  };

  const handleDeleteComment = (commentId) => {
    setSavedComments((current) => {
      const next = current.filter((comment) => comment.id !== commentId);
      try {
        localStorage.setItem(
          `layer-comments:${resolvedCommentKey}`,
          JSON.stringify(next),
        );
      } catch {
        // 저장 실패 시에도 현재 화면에서는 삭제 상태를 유지한다.
      }
      return next;
    });
  };

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
          aria-label={`댓글 ${commentCount}개 보기`}
          onClick={handleCommentsClick}
          className="flex items-center gap-1 p-0"
        >
          <img src={countChat} alt="댓글" className="size-[18px]" />
          <span className="text-body-regular-14 text-grey">{commentCount}</span>
        </button>
      </div>

      <CommunityReviewCommentSheet
        open={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        comments={visibleComments}
        onAddComment={handleAddComment}
        onDeleteComment={handleDeleteComment}
        commentKey={resolvedCommentKey}
      />
    </>
  );
}
