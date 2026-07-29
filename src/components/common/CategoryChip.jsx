// 피그마: categorychip (188×54) — 최대 188px, 좁은 그리드에서는 열 너비에 맞춰 줄어든다.
// 마우스를 올리면 검정 배경으로 반전된다 (터치 기기에서는 적용되지 않음)
export default function CategoryChip({ children, className = "", ...rest }) {
  return (
    <button
      type="button"
      className={`flex h-13.5 w-full max-w-47 min-w-0 items-center justify-center truncate rounded-[50px] border-[0.8px] border-light-grey bg-offwhite px-3 text-body-regular-14 text-offblack transition-colors duration-150 hover:border-offblack hover:bg-offblack hover:text-offwhite ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
