import Profile from "./Profile";

// 피그마: con-question1 (390×278) — 투표형 질문 글 ("하나 골라줘!")
// options: [{ label, percent, selected }]
function VoteBar({ label, percent, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-13 w-full items-center justify-between overflow-hidden rounded-lg border-[0.8px] p-4 ${
        selected ? "border-point-orange" : "border-2light-grey"
      }`}
    >
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 rounded-lg ${
          selected ? "bg-point-orange2" : "bg-2light-grey"
        }`}
        style={{ width: `${percent}%` }}
      />
      <span
        className={`relative text-body-medium-14 ${
          selected ? "text-offblack" : "text-grey"
        }`}
      >
        {label}
      </span>
      <span
        className={`relative text-body-medium-14 ${
          selected ? "text-point-orange" : "text-grey"
        }`}
      >
        {percent}%
      </span>
    </button>
  );
}

export default function ConQuestion1({
  profileName,
  profileTime,
  profileImg,
  anonymous = true,
  sub,
  title,
  options = [],
  onSelect,
  className = "",
}) {
  return (
    <div
      className={`flex w-full flex-col gap-[20px] rounded-2xl border border-light-grey bg-offwhite p-4 ${className}`}
    >
      <div className="flex w-full flex-col gap-[16px]">
        <Profile
          variant={anonymous ? "none" : "default"}
          name={profileName}
          time={profileTime}
          img={profileImg}
        />
        <div className="flex w-full flex-col gap-1">
          <p className="text-body-regular-14 text-subtext">{sub}</p>
          <p className="text-title-semibold-18 text-offblack">{title}</p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-[16px]">
        {options.map((option, i) => (
          <VoteBar
            key={option.label ?? i}
            label={option.label}
            percent={option.percent}
            selected={option.selected}
            onClick={() => onSelect?.(option, i)}
          />
        ))}
      </div>
    </div>
  );
}
