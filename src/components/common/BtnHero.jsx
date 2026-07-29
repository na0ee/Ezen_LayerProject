// 피그마: btn-hero (히어로 배너 위 반투명 버튼)
export default function BtnHero({ children, className = "", ...rest }) {
  return (
    <button
      type="button"
      className={`glass-surface-dark glass-rim-light glass-depth flex h-10 w-60 items-center justify-center rounded-[32px] text-body-semibold-16 text-offwhite ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
