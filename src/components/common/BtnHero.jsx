// 피그마: btn-hero (히어로 배너 위 반투명 버튼)
export default function BtnHero({ children, className = "", ...rest }) {
  return (
    <button
      type="button"
      className={`flex h-10 w-60 items-center justify-center rounded-4xl bg-offblack/30 text-body-semibold-16 text-offwhite ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
