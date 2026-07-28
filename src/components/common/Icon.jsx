import countChat from "../../assets/icons/count-chat.svg";
import countHeart from "../../assets/icons/count-heart.svg";
import heartAbled from "../../assets/icons/heart-abled.svg";

// 피그마: icon (2348:9120) — 좋아요/댓글 카운트 표시
// onLike를 넘기면 하트가 버튼이 되고, liked에 따라 회색 외곽선 ↔ 주황 채움으로 바뀐다.
// (피그마 icon에는 눌린 상태가 없어 Heart의 abled 아이콘을 가져다 씀)
export default function Icon({
  likes = 0,
  comments = 0,
  liked = false,
  onLike,
  className = "",
}) {
  const heartImg = (
    <img
      src={liked ? heartAbled : countHeart}
      alt="좋아요"
      className="size-4.5 object-contain"
    />
  );

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-1">
        {onLike ? (
          <button
            type="button"
            aria-label="좋아요"
            aria-pressed={liked}
            onClick={onLike}
            className="flex size-4.5 shrink-0 items-center justify-center"
          >
            {heartImg}
          </button>
        ) : (
          heartImg
        )}
        <span className="text-body-regular-14 text-grey">{likes}</span>
      </div>
      <div className="flex items-center gap-1">
        <img src={countChat} alt="댓글" className="size-4.5" />
        <span className="text-body-regular-14 text-grey">{comments}</span>
      </div>
    </div>
  );
}
