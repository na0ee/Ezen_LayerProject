import characterLay from "../../assets/images/character-lay.png";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import TabNav from "./TabNav";

// 피그마: bottomnav (Property 1=Default|Variant2|Variant3|Variant4)
// 변형은 활성 탭만 다르므로 active prop으로 통합: home|community|magazine|my
const TABS = ["home", "community", "magazine", "my"];

export default function BottomNav({
  active,
  onChange,
  onCharacter,
  fixed = true,
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
  const routeTab = location.pathname.startsWith("/mypage")
    ? "my"
    : location.pathname.split("/")[1];
  const resolvedActive =
    active ?? (TABS.includes(routeTab) ? routeTab : "home");
  const activeIndex = Math.max(TABS.indexOf(resolvedActive), 0);

  const handleTabChange = (tab) => {
    onChange?.(tab);
  };

  const navigation = (
    <nav
      aria-label="주요 메뉴"
      data-bottom-nav
      className={`pointer-events-auto !z-[100] flex w-[calc(100vw-40px)] max-w-[390px] items-center ${
        fixed ? "fixed bottom-5 left-1/2 -translate-x-1/2" : ""
      } ${className}`}
    >
      <div className="flex w-full min-w-0 items-center justify-center gap-1.5">
        <div className="glass-surface-dark glass-rim-light glass-depth bottom-nav-glass-tone relative h-16 min-w-0 flex-1 overflow-hidden rounded-[50px]">
          <span
            key={resolvedActive}
            aria-hidden="true"
            className="absolute left-2 top-1/2 h-[52px] w-[calc((100%_-_16px)/4)] rounded-[50px] border border-offwhite/10 shadow-[inset_0_1px_0_rgb(255_255_255_/_14%)] transition-transform duration-200"
            style={{
              backgroundColor: "#353535",
              transform: `translate3d(${activeIndex * 100}%, -50%, 0)`,
            }}
          />
          <div className="absolute inset-x-2 top-1/2 z-[3] grid h-14 -translate-y-1/2 grid-cols-4 items-center">
            {TABS.map((tab) => (
              <TabNav
                key={tab}
                variant={tab}
                to={routeByTab[tab]}
                active={resolvedActive === tab}
                onClick={() => handleTabChange(tab)}
                className="relative z-10 !w-full !min-w-0"
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          aria-label="챗봇 레이 열기"
          onClick={onCharacter ?? (() => navigate("/chatbot"))}
          className="glass-surface-dark glass-rim-light glass-depth bottom-nav-glass-tone flex size-16 shrink-0 items-center justify-center rounded-full"
        >
          <span className="relative z-[3] flex size-10 items-center justify-center overflow-hidden">
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

  return fixed ? createPortal(navigation, document.body) : navigation;
}
