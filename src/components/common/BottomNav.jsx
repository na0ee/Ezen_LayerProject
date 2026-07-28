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

  const handleTabChange = (tab) => {
    if (onChange) {
      onChange(tab);
      return;
    }
    navigate(routeByTab[tab]);
  };

  return (
    <nav className={`flex w-[390px] max-w-full items-center gap-1.5 ${className}`}>
      {/* 활성 인디케이터는 바 양끝과 8px(px-2), 상하 6px(64-52) 간격 유지 */}
      <div className="h-16 min-w-0 flex-1 rounded-[50px] bg-offblack70 backdrop-blur-[2px]">
        <div className="flex h-full items-center px-2">
          {TABS.map((tab) => (
            <TabNav
              key={tab}
              variant={tab}
              active={resolvedActive === tab}
              onClick={() => handleTabChange(tab)}
              className="flex-1"
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label="캐릭터"
        onClick={onCharacter}
        className="flex size-[72px] shrink-0 items-center justify-center rounded-full bg-offblack70 backdrop-blur-[2px]"
      >
        <img src={characterLay} alt="" className="h-10 w-auto object-contain" />
      </button>
    </nav>
  );
}
