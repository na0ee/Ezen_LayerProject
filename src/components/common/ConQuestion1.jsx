import { useState } from "react";
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
      } transition-colors duration-300`}
    >
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 rounded-lg ${
          selected ? "bg-point-orange2" : "bg-2light-grey"
        } transition-[width,background-color] duration-500 ease-out`}
        style={{ width: `${percent}%` }}
      />
      <span
        className={`relative text-body-medium-14 transition-colors duration-300 ${
          selected ? "text-offblack" : "text-grey"
        }`}
      >
        {label}
      </span>
      <span
        className={`relative text-body-medium-14 tabular-nums transition-colors duration-300 ${
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
  onDelete,
  className = "",
}) {
  const initialSelectedIndex = options.findIndex((option) => option.selected);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [voteCounts, setVoteCounts] = useState(() => {
    const counts = options.map((option) => Math.max(0, Math.round(option.percent / 10)));
    return counts.some(Boolean) ? counts : options.map(() => 0);
  });

  const totalVotes = voteCounts.reduce((sum, count) => sum + count, 0);
  const displayOptions = options.map((option, index) => ({
    ...option,
    selected: selectedIndex === index,
    percent:
      totalVotes === 0 ? 0 : Math.round((voteCounts[index] / totalVotes) * 100),
  }));

  const selectOption = (option, index) => {
    if (selectedIndex === index) return;

    setVoteCounts((current) =>
      current.map((count, countIndex) => {
        if (countIndex === selectedIndex) return Math.max(0, count - 1);
        if (countIndex === index) return count + 1;
        return count;
      }),
    );
    setSelectedIndex(index);
    onSelect?.(option, index);
  };

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
          trailing={
            onDelete ? (
              <button
                type="button"
                aria-label="게시물 삭제"
                onClick={onDelete}
                className="flex size-8 shrink-0 items-center justify-center text-[26px] font-light leading-none text-grey"
              >
                ×
              </button>
            ) : undefined
          }
        />
        <div className="flex w-full flex-col gap-1">
          <p className="text-body-regular-14 text-subtext">{sub}</p>
          <p className="text-title-semibold-18 text-offblack">{title}</p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-[16px]">
        {displayOptions.map((option, i) => (
          <VoteBar
            key={option.label ?? i}
            label={option.label}
            percent={option.percent}
            selected={option.selected}
            onClick={() => selectOption(option, i)}
          />
        ))}
      </div>
    </div>
  );
}
