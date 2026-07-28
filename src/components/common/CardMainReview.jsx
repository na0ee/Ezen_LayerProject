import KeywordList from "./KeywordList";
import LayerBadge from "./LayerBadge";

// 피그마: card/main/review (320×380) — 배경 이미지 + 하단 반투명 박스(브랜드/제품명/키워드)
export default function CardMainReview({
  img,
  label,
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
      <div className="glass-surface-dark relative flex h-[105px] w-full flex-col gap-2 rounded-2xl p-4">
        <div className="flex flex-col gap-0.5">
          {(label || brand) && (
            <LayerBadge size="small">{label || brand}</LayerBadge>
          )}
          <p className="text-title-semibold-18 text-offwhite">{name}</p>
        </div>
        <KeywordList keywords={keywords} />
      </div>
    </div>
  );
}
