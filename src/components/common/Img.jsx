// 피그마: img (속성 1=xsmall|small|medium|big, 속성 2=grey|white) — 제품 썸네일 박스
// grey = 회색 채움, white = 흰 배경 + 테두리. big은 grey만 있고 이미지가 꽉 참(cover)
const SIZES = {
  xsmall: "size-9.5",
  small: "size-12.5",
  medium: "size-15",
  big: "size-25",
};

const COLORS = {
  grey: "bg-2light-grey",
  white: "border border-light-grey bg-offwhite",
};

export default function Img({
  size = "medium",
  color = "grey",
  src,
  alt = "",
  fit,
  className = "",
}) {
  const objectFit = fit ?? (size === "big" ? "object-cover" : "object-contain");
  return (
    <div
      className={`shrink-0 overflow-hidden rounded-lg ${SIZES[size]} ${COLORS[color]} ${className}`}
    >
      {src && <img src={src} alt={alt} className={`size-full ${objectFit}`} />}
    </div>
  );
}
