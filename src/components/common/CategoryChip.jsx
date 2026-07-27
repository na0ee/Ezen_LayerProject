// 피그마: categorychip (188×54) — 향 계열 선택 등에 쓰는 큰 칩
export default function CategoryChip({ children, className = "", ...rest }) {
  return (
    <button
      type="button"
      className={`flex h-[54px] w-[188px] items-center justify-center rounded-[50px] border-[0.8px] border-light-grey bg-offwhite text-body-regular-14 text-offblack ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
