import { useState } from "react";

// 피그마: community-toggle (Property 1=on | off) — 라벨 + iOS 스위치
// 스위치는 CSS로 구현 (export 이미지에 그림자가 섞여 있어서)
export default function CommunityToggle({
  label,
  checked = false,
  onChange,
  className = "",
}) {
  const [internalChecked, setInternalChecked] = useState(checked);
  const isControlled = typeof onChange === "function";
  const currentChecked = isControlled ? checked : internalChecked;

  const handleToggle = () => {
    const nextChecked = !currentChecked;

    if (isControlled) {
      onChange(nextChecked);
      return;
    }

    setInternalChecked(nextChecked);
  };

  return (
    <div className={`flex w-full items-center gap-2 ${className}`}>
      <p className="min-w-0 flex-1 py-[11px] text-[17px] leading-[22px] text-offblack">
        {label}
      </p>
      <button
        type="button"
        role="switch"
        aria-checked={currentChecked}
        onClick={handleToggle}
        className={`mr-2.5 h-[31px] w-[51px] shrink-0 rounded-full p-0.5 transition-colors ${
          currentChecked ? "bg-point-orange" : "bg-2light-grey"
        }`}
      >
        <span
          className={`block size-[27px] rounded-full bg-offwhite shadow transition-transform ${
            currentChecked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}
