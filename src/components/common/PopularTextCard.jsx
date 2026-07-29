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
  const isTip = variant === "tip";
  const isByredo = variant === "byredo";

  const getBaseImageClassName = () => {
    if (isJomalone) {
      return "absolute left-0 top-[-33.97%] h-[182.79%] w-full max-w-none";
    }

    return "absolute left-[-23.36%] top-[-0.69%] h-[101.38%] w-[123.36%] max-w-none";
  };

  const getImageClassName = () => {
    if (isTip) {
      return "absolute inset-0 size-full max-w-none object-cover";
    }

    if (isByredo) {
      return "absolute left-[-0.15%] top-[-39.57%] h-[139.5%] w-[100.1%] max-w-none";
    }

    if (isJomalone) {
      return "absolute left-[0.03%] top-[-5.21%] h-[148.87%] w-full max-w-none";
    }

    return "absolute left-[-0.13%] top-[-27.61%] h-[161.4%] w-full max-w-none";
  };

  return (
    <article
      className={`flex h-[336px] w-[262px] shrink-0 flex-col items-center gap-4 overflow-hidden rounded-2xl border border-light-grey bg-offwhite px-4 ${
        isTip || isJomalone ? "pb-4" : "pb-6"
      } ${className}`}
    >
      <div className="relative h-[230px] w-[262px] shrink-0 overflow-hidden">
        {baseImg && (
          <img
            src={baseImg}
            alt=""
            className={getBaseImageClassName()}
          />
        )}
        {img && (
          <img
            src={img}
            alt={imgAlt}
            className={getImageClassName()}
          />
        )}
      </div>

      <div className="flex w-full min-w-0 flex-col items-start gap-1">
        <p className="w-full truncate text-body-semibold-16 text-offblack">
          {title}
        </p>
        <p
          className={`w-full truncate text-offblack ${
            isTip ? "text-body-medium-14" : "text-body-regular-14"
          }`}
        >
          {desc}
        </p>
      </div>
    </article>
  );
}
