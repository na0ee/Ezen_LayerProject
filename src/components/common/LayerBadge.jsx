const SIZE_STYLES = {
  big: "px-3.5 py-1.5 text-[16px]",
  small: "px-2.5 py-1 text-[12px]",
};

// 피그마: layer/badge (big | small) — 홈, 마이페이지, 커뮤니티 공용
export default function LayerBadge({
  size = "big",
  children = "Mood Shifter",
  className = "",
}) {
  return (
    <span
      className={`glass-surface-dark glass-rim-light glass-depth inline-flex w-fit shrink-0 items-center justify-center rounded-2xl font-en font-bold leading-normal tracking-[-0.02em] text-2light-grey ${SIZE_STYLES[size]} ${className}`}
    >
      {children}
    </span>
  );
}
