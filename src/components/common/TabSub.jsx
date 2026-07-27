import activityIcon from "../../assets/icons/tabsub-activity.svg";
import heartIcon from "../../assets/icons/tabsub-heart.svg";

// 피그마: tab-sub (속성 1=a | b)
// a: 흰 배경+검정 아이콘 원 / b: 검정 배경+흰 아이콘 원
const LABELS = { a: "내가 추천한", b: "추천받은" };

export default function TabSub({ variant = "a", children, className = "", ...rest }) {
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
        <img src={isB ? activityIcon : heartIcon} alt="" className="size-4" />
      </span>
      <span
        className={`text-body-medium-14 ${isB ? "text-offwhite" : "text-offblack"}`}
      >
        {children ?? LABELS[variant]}
      </span>
    </button>
  );
}
