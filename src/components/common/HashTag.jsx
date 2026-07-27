import xSmall from "../../assets/icons/x-small.svg";

// 피그마: # (3135:17823) — 삭제 가능한 태그 칩
export default function HashTag({ children, onRemove, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[100px] border border-light-grey bg-offwhite py-2 pl-3 pr-2 text-caption-medium-12 text-subtext ${className}`}
    >
      {children}
      <button type="button" aria-label="삭제" onClick={onRemove} className="shrink-0">
        <img src={xSmall} alt="" className="size-2.5" />
      </button>
    </span>
  );
}
