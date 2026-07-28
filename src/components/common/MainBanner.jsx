// 피그마: main/banner (390×214) — 이미지만 있는 메인 배너
export default function MainBanner({
  img,
  alt = "",
  imgClassName = "size-full object-cover",
  className = "",
  ...rest
}) {
  return (
    <div
      className={`relative h-[214px] w-full overflow-hidden rounded-2xl bg-light-grey ${className}`}
      {...rest}
    >
      {img && <img src={img} alt={alt} className={imgClassName} />}
    </div>
  );
}
