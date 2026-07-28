// 피그마: 매거진 '많이 읽은 글' 카드 — 262×336, 상단 이미지 + 하단 제목/설명
export default function PopularTextCard({
  variant = "jomalone",
  baseImg,
  img,
  imgAlt = "",
  title,
  desc,
  className = "",
}) {
  const isJomalone = variant === "jomalone";

  return (
    <article
      className={`flex h-[336px] w-[262px] shrink-0 flex-col items-center gap-4 overflow-hidden rounded-lg border-[0.5px] border-light-grey bg-offwhite px-4 ${
        isJomalone ? "pb-4" : "pb-6"
      } ${className}`}
    >
      <div className="relative h-[230px] w-[262px] shrink-0 overflow-hidden">
        {baseImg && (
          <img
            src={baseImg}
            alt=""
            className={
              isJomalone
                ? "absolute left-0 top-[-33.97%] h-[182.79%] w-full max-w-none"
                : "absolute left-[-23.36%] top-[-0.69%] h-[101.38%] w-[123.36%] max-w-none"
            }
          />
        )}
        {img && (
          <img
            src={img}
            alt={imgAlt}
            className={
              isJomalone
                ? "absolute left-[0.03%] top-[-5.21%] h-[148.87%] w-full max-w-none"
                : "absolute left-[-0.13%] top-[-27.61%] h-[161.4%] w-full max-w-none"
            }
          />
        )}
      </div>

      <div className="flex w-full min-w-0 flex-col items-start gap-1">
        <p className="w-full truncate text-body-semibold-16 text-offblack">
          {title}
        </p>
        <p className="w-full truncate text-body-regular-14 text-offblack">
          {desc}
        </p>
      </div>
    </article>
  );
}
