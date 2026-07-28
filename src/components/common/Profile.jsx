import iconUser from "../../assets/icons/icon-user.svg";

// 피그마: profile (Property 1=Default | none) — none은 익명(회색 원 + 유저 아이콘)
export default function Profile({
  variant = "default",
  name,
  time,
  img,
  className = "",
}) {
  const isNone = variant === "none";
  return (
    <div className={`flex items-center gap-[12px] ${className}`}>
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
  );
}
