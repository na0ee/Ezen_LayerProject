import { useRef, useState } from "react";
import chevronLeft from "../../assets/icons/icon-chevron-left.svg";
import searchIcon from "../../assets/icons/icon-search-24.svg";
import xIcon from "../../assets/icons/x-black.svg";

// 피그마: search (속성 1=< icon | no icon | border)
// 실제 <input>이라 value/onChange 등 input props를 그대로 넘기면 됨
// 값이 있으면 지우기 버튼(x-black)이 뜬다. 제어 컴포넌트로 쓸 땐 onClear에서 직접 비워줘야 함
export default function Search({
  variant = "icon",
  placeholder = "향수, 브랜드, 노트로 검색",
  onBack,
  onChange,
  onClear,
  onSearch,
  className = "",
  ...rest
}) {
  const isBorder = variant === "border";
  const inputRef = useRef(null);
  const [typed, setTyped] = useState(() => Boolean(rest.defaultValue));

  const isControlled = rest.value !== undefined;
  const hasValue = isControlled ? String(rest.value).length > 0 : typed;

  const handleChange = (event) => {
    if (!isControlled) setTyped(event.target.value.length > 0);
    onChange?.(event);
  };

  const handleClear = () => {
    if (!isControlled && inputRef.current) inputRef.current.value = "";
    setTyped(false);
    inputRef.current?.focus();
    onClear?.();
  };

  const field = (
    <div
      className={`flex min-w-0 flex-1 items-center ${
        isBorder
          ? "h-[42px] gap-4 rounded-[50px] border-[0.6px] border-light-grey bg-offwhite px-[14px] py-3"
          : "gap-3 rounded-3xl bg-2light-grey px-5 py-1.5"
      }`}
    >
      {onSearch ? (
        <button
          type="button"
          aria-label="검색"
          onClick={onSearch}
          className={isBorder ? "size-[18px] shrink-0" : "size-6 shrink-0"}
        >
          <img
            src={searchIcon}
            alt=""
            className={isBorder ? "size-[18px]" : "size-6"}
          />
        </button>
      ) : (
        <img
          src={searchIcon}
          alt=""
          className={isBorder ? "size-[18px] shrink-0" : "size-6 shrink-0"}
        />
      )}
      <input
        ref={inputRef}
        type="search"
        placeholder={placeholder}
        onChange={handleChange}
        className={`min-w-0 flex-1 bg-transparent text-body-medium-14 text-offblack outline-none ${
          isBorder ? "placeholder:text-grey" : "placeholder:text-subtext"
        }`}
        {...rest}
      />
      {hasValue && (
        <button
          type="button"
          aria-label="검색어 지우기"
          onClick={handleClear}
          className="size-5 shrink-0"
        >
          <img src={xIcon} alt="" className="size-5" />
        </button>
      )}
    </div>
  );

  if (["no-icon", "border"].includes(variant)) {
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
