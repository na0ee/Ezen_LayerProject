// 피그마: Community-comment (430×550) — 글쓰기 종류를 고르는 바텀시트
// items: [{ name, desc }]
export default function CommunityComment({
  title = "어떤 글을 쓸까요?",
  items = [],
  onSelect,
  className = "",
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-t-2xl bg-offwhite pb-[61px] pt-[34px] ${className}`}
    >
      <span
        aria-hidden
        className="absolute left-1/2 top-[14px] h-1 w-8 -translate-x-1/2 rounded-3xl bg-2light-grey"
      />
      <div className="flex flex-col gap-[30px] px-5">
        <p className="pt-3 text-title-semibold-18 text-offblack">{title}</p>
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => onSelect?.(item)}
              className="flex w-full flex-col items-start gap-1 overflow-hidden rounded-2xl border border-light-grey bg-offwhite px-5 py-6 text-left"
            >
              <span className="truncate text-body-semibold-16 text-offblack">
                {item.name}
              </span>
              <span className="truncate text-caption-regular-12 text-grey">
                {item.desc}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
