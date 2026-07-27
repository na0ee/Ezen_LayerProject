import countChat from "../../assets/icons/count-chat.svg";
import countHeart from "../../assets/icons/count-heart.svg";

// 피그마: icon (2348:9120) — 좋아요/댓글 카운트 표시
export default function Icon({ likes = 0, comments = 0, className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-1">
        <img src={countHeart} alt="좋아요" className="size-[18px]" />
        <span className="text-body-regular-14 text-grey">{likes}</span>
      </div>
      <div className="flex items-center gap-1">
        <img src={countChat} alt="댓글" className="size-[18px]" />
        <span className="text-body-regular-14 text-grey">{comments}</span>
      </div>
    </div>
  );
}
