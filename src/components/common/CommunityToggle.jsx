// 피그마: community-toggle (Property 1=on | off) — 라벨 + iOS 스위치
// 스위치는 CSS로 구현 (export 이미지에 그림자가 섞여 있어서)
export default function CommunityToggle({
  label,
  checked = false,
  onChange,
  className = "",
}) {
  return (
    <div className={`flex w-full items-center gap-2 ${className}`}>
      <p className="min-w-0 flex-1 py-2.75 text-[17px] leading-5.5 text-offblack">
        {label}
      </p>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange?.(!checked)}
        className={`mr-2.5 h-7.75 w-12.75 shrink-0 rounded-full p-0.5 transition-colors ${
          checked ? "bg-point-orange" : "bg-2light-grey"
        }`}
      >
        <span
          className={`block size-6.75 rounded-full bg-offwhite shadow transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}
