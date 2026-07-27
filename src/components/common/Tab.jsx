// 피그마: tab (2208:5166, 속성 1=default | variant1)
// default(검정)=선택 상태 → active boolean으로 대체
export default function Tab({ active = false, children, className = "", ...rest }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-[50px] px-3.5 py-2 text-caption-medium-12 ${
        active
          ? "bg-offblack text-offwhite"
          : "border border-light-grey bg-offwhite text-grey"
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
