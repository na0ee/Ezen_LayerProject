// 피그마: main/banner (390×214) — 이미지만 있는 메인 배너
export default function MainBanner({
  img,
  alt = "",
  imgClassName = "size-full object-cover",
  className = "",
  onClick,
  ...rest
}) {
  const handleKeyDown = (event) => {
    if (!onClick || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    onClick(event);
  };

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`relative h-53.5 w-full overflow-hidden rounded-2xl bg-light-grey ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      {...rest}
    >
      {img && <img src={img} alt={alt} className={imgClassName} />}
    </div>
  );
}
