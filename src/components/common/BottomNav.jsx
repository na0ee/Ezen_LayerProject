import characterLay from "../../assets/images/character-lay.png";
import TabNav from "./TabNav";

// 피그마: bottomnav (Property 1=Default|Variant2|Variant3|Variant4)
// 변형은 활성 탭만 다르므로 active prop으로 통합: home|community|magazine|my
const TABS = ["home", "community", "magazine", "my"];

export default function BottomNav({
  active = "home",
  onChange,
  onCharacter,
  className = "",
}) {
  return (
    <nav className={`flex w-full items-center gap-[5px] ${className}`}>
      <div className="h-[72px] min-w-0 flex-1 rounded-[50px] bg-offblack70 backdrop-blur-[2px]">
        <div className="flex h-full items-center px-2">
          {TABS.map((tab) => (
            <TabNav
              key={tab}
              variant={tab}
              active={active === tab}
              onClick={() => onChange?.(tab)}
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
