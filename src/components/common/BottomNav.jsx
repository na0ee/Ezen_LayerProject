import characterLay from "../../assets/images/character-lay.png";
import { useLocation, useNavigate } from "react-router-dom";
import TabNav from "./TabNav";

// 피그마: bottomnav (Property 1=Default|Variant2|Variant3|Variant4)
// 변형은 활성 탭만 다르므로 active prop으로 통합: home|community|magazine|my
const TABS = ["home", "community", "magazine", "my"];

export default function BottomNav({
  active,
  onChange,
  onCharacter,
  className = "",
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const routeByTab = {
    home: "/home",
    community: "/community",
    magazine: "/magazine",
    my: "/my",
  };
  const routeTab = location.pathname.split("/")[1];
  const resolvedActive =
    active ?? (TABS.includes(routeTab) ? routeTab : "home");
  const activeIndex = Math.max(TABS.indexOf(resolvedActive), 0);

  const handleTabChange = (tab) => {
    onChange?.(tab);
    navigate(routeByTab[tab]);
  };

  return (
    <nav
      aria-label="주요 메뉴"
      className={`flex w-[390px] max-w-full items-center ${className}`}
    >
      <div className="flex w-[391px] shrink-0 items-center justify-center gap-1.5">
        <div className="glass-surface-dark relative h-16 min-w-0 flex-1 overflow-hidden rounded-[50px]">
          <span
            aria-hidden="true"
            className="absolute left-2 top-1/2 h-[52px] w-[82px] rounded-[50px] bg-grey/70 transition-transform duration-200"
            style={{
              transform: `translate(${activeIndex * 74.333333}px, -50%)`,
            }}
          />
          <div className="absolute left-1/2 top-1/2 flex h-14 w-[313px] -translate-x-1/2 -translate-y-1/2 items-center justify-between px-[15px]">
            {TABS.map((tab) => (
              <TabNav
                key={tab}
                variant={tab}
                active={resolvedActive === tab}
                onClick={() => handleTabChange(tab)}
                className="relative z-10 !w-[60px] !min-w-[60px] shrink-0 !bg-transparent"
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          aria-label="챗봇 레이 열기"
          onClick={onCharacter ?? (() => navigate("/chatbot"))}
          className="glass-surface-dark flex size-16 shrink-0 items-center justify-center rounded-full"
        >
          <span className="flex size-10 items-center justify-center overflow-hidden">
            <span className="relative h-10 w-7 overflow-hidden">
              <img
                src={characterLay}
                alt=""
                className="absolute left-[-17px] top-[-8.5px] h-[59px] w-[62px] max-w-none"
              />
            </span>
          </span>
        </button>
      </div>
    </nav>
  );
}
