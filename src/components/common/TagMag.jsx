// 피그마: tag-mag — 매거진 이미지 위에 올리는 반투명 태그
export default function TagMag({ children, className = "" }) {
  return (
    <span
      className={`glass-surface-dark inline-flex w-fit shrink-0 items-start self-start rounded-2xl px-3.5 py-1.5 text-caption-regular-12 text-offwhite !shadow-none ${className}`}
    >
      {children}
    </span>
  );
}
