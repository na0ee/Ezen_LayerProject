import chevronLeft from "../../assets/icons/icon-chevron-left.svg";
import searchIcon from "../../assets/icons/icon-search-24.svg";

// 피그마: search (속성 1=< icon | no icon) → variant="icon" | "no-icon"
// 실제 <input>이라 value/onChange 등 input props를 그대로 넘기면 됨
export default function Search({
  variant = "icon",
  placeholder = "향수, 브랜드, 노트로 검색",
  onBack,
  className = "",
  ...rest
}) {
  const field = (
    <div className="flex min-w-0 flex-1 items-center gap-3 rounded-3xl bg-2light-grey px-5 py-1.5">
      <img src={searchIcon} alt="" className="size-6 shrink-0" />
      <input
        type="search"
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-body-medium-14 text-offblack outline-none placeholder:text-subtext"
        {...rest}
      />
    </div>
  );

  if (variant === "no-icon") {
    return <div className={`flex w-full ${className}`}>{field}</div>;
  }

  return (
    <div className={`flex w-full items-center gap-2 ${className}`}>
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={onBack}
        className="size-6 shrink-0"
      >
        <img src={chevronLeft} alt="" className="size-6" />
      </button>
      {field}
    </div>
  );
}
