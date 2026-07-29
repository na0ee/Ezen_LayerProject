export default function AlertCard({
  image,
  imageAlt = "",
  category,
  time,
  title,
  description,
  unread = false,
  imageClassName = "",
  className = "",
  onClick,
}) {
  const handleKeyDown = (event) => {
    if (!onClick || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    onClick();
  };

  return (
    <article
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`flex w-full items-start gap-5 overflow-hidden rounded-2xl border border-light-grey bg-offwhite p-3 text-left ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      <div className="relative size-[60px] shrink-0 overflow-visible rounded-lg bg-2light-grey">
        <img
          src={image}
          alt={imageAlt}
          className={`size-full rounded-lg object-cover ${imageClassName}`}
        />
        {unread && (
          <span
            aria-label="읽지 않은 알림"
            className="absolute -right-[3px] top-0 size-1.5 rounded-full bg-point-orange"
          />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex h-[37px] flex-col justify-center gap-1 overflow-hidden">
          <div className="flex w-full items-center justify-between gap-3 text-caption-regular-12">
            <span
              className={`truncate ${
                unread ? "text-point-orange" : "text-grey"
              }`}
            >
              {category}
            </span>
            <time className="shrink-0 text-grey">{time}</time>
          </div>
          <h2 className="truncate text-body-medium-14 text-offblack">
            {title}
          </h2>
        </div>

        <p className="truncate text-caption-regular-12 text-grey">
          {description}
        </p>
      </div>
    </article>
  );
}
