import TagMag from "./TagMag";

// 피그마: magazine_card (262×336) — 배경 이미지 + 검은 오버레이 + 태그/제목/본문
export default function MagazineCard({
  img,
  tag,
  title,
  desc,
  className = "",
}) {
  return (
    <div
      className={`relative flex h-[336px] w-[262px] flex-col justify-end overflow-hidden rounded-2xl bg-light-grey p-5 ${className}`}
    >
      {img && (
        <img src={img} alt="" className="absolute inset-0 size-full object-cover" />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative flex w-full flex-col gap-4">
        <div className="flex flex-col items-start justify-center gap-1">
          {tag && <TagMag>{tag}</TagMag>}
          <p className="text-body-semibold-16 text-offwhite">{title}</p>
        </div>
        <p className="text-caption-medium-12 leading-[1.4] text-offwhite">{desc}</p>
      </div>
    </div>
  );
}
