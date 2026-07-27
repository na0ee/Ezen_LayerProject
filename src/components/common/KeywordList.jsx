// 피그마: keywordlist (속성 1=white | grey)
// keywords 배열을 #키워드 형태로 나열 (#은 자동으로 붙음)
// subtext는 피그마 변형은 아니지만 review_summary1에서 색을 덮어 쓰고 있어 추가
export default function KeywordList({
  keywords = [],
  variant = "white",
  className = "",
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {keywords.map((keyword) => (
        <span
          key={keyword}
          className={`text-caption-regular-12 ${
            variant === "grey"
              ? "text-grey"
              : variant === "subtext"
                ? "text-subtext"
                : "text-offwhite"
          }`}
        >
          {keyword.startsWith("#") ? keyword : `#${keyword}`}
        </span>
      ))}
    </div>
  );
}
