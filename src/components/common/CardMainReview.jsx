import KeywordList from "./KeywordList";

// 피그마: card/main/review (320×380) — 배경 이미지 + 하단 반투명 박스(브랜드/제품명/키워드)
export default function CardMainReview({
  img,
  brand,
  name,
  keywords = [],
  className = "",
}) {
  return (
    <div
      className={`relative flex h-[380px] w-[320px] flex-col justify-end overflow-hidden rounded-3xl bg-light-grey p-3 ${className}`}
    >
      {img && (
        <img src={img} alt="" className="absolute inset-0 size-full object-cover" />
      )}
      <div className="relative flex h-[120px] w-full flex-col gap-2 rounded-2xl bg-offblack/50 p-4">
        <div className="flex flex-col gap-0.5">
          <p className="text-caption-medium-12 text-offwhite">{brand}</p>
          <p className="text-title-semibold-18 text-offwhite">{name}</p>
        </div>
        <KeywordList keywords={keywords} />
      </div>
    </div>
  );
}
