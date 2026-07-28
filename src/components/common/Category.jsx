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
    <div className={`w-full bg-offwhite ${className}`}>
      <div className="flex items-center gap-6 px-5 pt-4">
        {items.map((item) => {
          const isActive = item === active;
          return (
            <button
              key={item}
              type="button"
              onClick={() => onChange?.(item)}
              className="flex flex-col items-center gap-3"
            >
              <span
                className={`text-body-medium-16 ${
                  isActive ? "text-offblack" : "text-grey"
                }`}
              >
                {item}
              </span>
              {/* 선택 안 된 탭은 투명 라인 — 선택된 탭(주황 라인)과 높이를 맞추기 위함 */}
              <span
                className={`h-0.5 w-full ${isActive ? "bg-point-orange" : "bg-transparent"}`}
              />
            </button>
          );
        })}
      </div>
      {/* 기본 회색 구분선은 화면 가로 전체를 채움 (탭 영역의 px-5와 별개) */}
      <div className="h-px w-full bg-light-grey" />
    </div>
  );
}
