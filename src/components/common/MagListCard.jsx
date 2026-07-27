// 피그마: card (3212:33337, 매거진 섹션의 목록 카드) — 피그마 이름이 `card`라 겹쳐서 MagListCard로 등록
// 별도 컴포넌트인 card-mag(=CardMag, 320×452)와 혼동 주의
// 262×289, 상단 영문 라벨 + 하단 제목/설명
export default function MagListCard({ img, label, title, desc, className = "" }) {
  return (
    <div
      className={`relative h-[289px] w-[262px] overflow-hidden rounded-lg border-[0.8px] border-light-grey bg-light-grey ${className}`}
    >
      {img && (
        <img src={img} alt="" className="absolute inset-0 size-full object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
      <div className="absolute inset-0 flex flex-col justify-between px-4 pb-[30px] pt-4">
        <p className="truncate font-en text-[12px] font-medium tracking-[-0.02em] text-offwhite">
          {label}
        </p>
        <div className="flex flex-col gap-1">
          <p className="truncate text-body-semibold-16 text-offwhite">{title}</p>
          <p className="truncate text-caption-medium-12 text-offwhite">{desc}</p>
        </div>
      </div>
    </div>
  );
}
