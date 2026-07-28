import activityIconBlack from "../../assets/icons/tabsub-activity.svg";
import activityIconWhite from "../../assets/icons/tabsub-activity-white.svg";
import heartIconBlack from "../../assets/icons/tabsub-heart-black.svg";
import heartIconWhite from "../../assets/icons/tabsub-heart.svg";

// 피그마: tab-sub (속성 1=a | b)
// a: 흰 배경+검정 아이콘 원 / b: 검정 배경+흰 아이콘 원
// icon prop으로 아이콘 모양(heart/activity)을 색상(variant)과 별개로 고정할 수 있음
// (탭 전환 시 모양은 유지하고 색만 바뀌어야 하므로, 아이콘 원 배경색에 맞춰 흑/백 버전을 골라 씀)
const LABELS = { a: "내가 추천한", b: "추천받은" };
// [icon 모양][아이콘 원이 흰 배경인지 여부]
const ICONS = {
  a: { true: heartIconBlack, false: heartIconWhite },
  b: { true: activityIconBlack, false: activityIconWhite },
};

export default function TabSub({ variant = "a", icon, children, className = "", ...rest }) {
  const isB = variant === "b";
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1.5 rounded-[50px] py-1 pl-1 pr-3 ${
        isB ? "bg-offblack" : "border border-light-grey bg-offwhite"
      } ${className}`}
      {...rest}
    >
      <span
        className={`flex size-7 items-center justify-center rounded-full ${
          isB ? "bg-offwhite" : "bg-offblack"
        }`}
      >
        <img src={ICONS[icon ?? variant][isB]} alt="" className="size-4" />
      </span>
      <span
        className={`text-body-medium-14 ${isB ? "text-offwhite" : "text-offblack"}`}
      >
        {children ?? LABELS[variant]}
      </span>
    </button>
  );
}
