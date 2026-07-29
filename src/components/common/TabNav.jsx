import IconBottomNav from "./IconBottomNav";
import { Link } from "react-router-dom";

// 피그마: tab-nav (속성 1=home|community|magazine|my, 속성 2=white|grey)
// 속성 2는 active(true=white)로 대체. BottomNav 안에서 사용됨
const LABELS = {
  home: "홈",
  community: "커뮤니티",
  magazine: "매거진",
  my: "마이",
};

export default function TabNav({
  variant = "home",
  active = false,
  onClick,
  to,
  className = "",
}) {
  const Component = to ? Link : "button";

  return (
    <Component
      {...(to ? { to } : { type: "button" })}
      onClick={onClick}
      className={`flex h-14 min-w-15 flex-col items-center justify-center gap-1 rounded-[50px] ${className}`}
    >
      <IconBottomNav variant={variant} active={active} />
      <span
        className={`text-caption-medium-12 ${
          active ? "text-offwhite" : "text-light-grey"
        }`}
      >
        {LABELS[variant]}
      </span>
    </Component>
  );
}
