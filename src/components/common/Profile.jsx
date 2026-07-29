import iconUser from "../../assets/icons/icon-user.svg";

// 피그마: profile (Property 1=Default | none) — none은 익명(회색 원 + 유저 아이콘)
export default function Profile({
  variant = "default",
  name,
  time,
  img,
  className = "",
  onClick,
  trailing,
}) {
  const isNone = variant === "none";

  const handleKeyDown = (event) => {
    if (!onClick || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    onClick();
  };

  return (
    <div className={`flex w-full items-center justify-between ${className}`}>
      <div
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={`flex min-w-0 items-center gap-[12px] ${
          onClick ? "cursor-pointer" : ""
        }`}
      >
        {isNone || !img ? (
          <div className="flex size-10 items-center justify-center rounded-full bg-2light-grey">
            <img src={iconUser} alt="" className="size-6" />
          </div>
        ) : (
          <img src={img} alt="" className="size-10 rounded-full object-cover" />
        )}
        <div className="flex flex-col justify-center gap-1">
          <p className="text-body-medium-16 text-offblack">
            {name ?? (isNone ? "익명" : "")}
          </p>
          {time && <p className="text-caption-regular-12 text-grey">{time}</p>}
        </div>
      </div>
      {trailing}
    </div>
  );
}
