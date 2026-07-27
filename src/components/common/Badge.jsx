// 피그마: badge (속성 1=good | bad | review | q&a)
// bad만 회색, 나머지는 주황 계열
const LABELS = {
  good: "추천해요",
  bad: "별로에요",
  review: "후기작성하기",
  "q&a": "향수 Q&A",
};

export default function Badge({ variant = "good", children, className = "" }) {
  const isBad = variant === "bad";
  return (
    <span
      className={`inline-flex h-5 w-fit shrink-0 items-center justify-center self-start rounded px-2 text-caption-semibold-10 ${
        isBad ? "bg-2light-grey text-grey" : "bg-point-orange2 text-point-orange"
      } ${className}`}
    >
      {children ?? LABELS[variant]}
    </span>
  );
}
