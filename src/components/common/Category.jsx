import Tab from "./Tab";

// 피그마: category (속성 1=page | tab)
// page: 상단 텍스트 탭(주황 밑줄) / tab: 칩 리스트(Tab 재사용)
export default function Category({
  variant = "page",
  items = [],
  active,
  onChange,
  className = "",
}) {
  if (variant === "tab") {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        {items.map((item) => (
          <Tab key={item} active={item === active} onClick={() => onChange?.(item)}>
            {item}
          </Tab>
        ))}
      </div>
    );
  }

  return (
    <div className={`w-full bg-offwhite px-5 ${className}`}>
      <div className="flex items-center gap-6 border-b border-light-grey pt-4">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onChange?.(item)}
            className={`-mb-px pb-3 text-body-medium-16 ${
              item === active
                ? "border-b-2 border-point-orange text-offblack"
                : "text-grey"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
