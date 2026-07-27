// 피그마: keywordlist (속성 1=white | grey)
// keywords 배열을 #키워드 형태로 나열 (#은 자동으로 붙음)
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
            variant === "grey" ? "text-grey" : "text-offwhite"
          }`}
        >
          {keyword.startsWith("#") ? keyword : `#${keyword}`}
        </span>
      ))}
    </div>
  );
}
