import commuGrey from "../../assets/icons/nav-commu-grey.svg";
import commuWhite from "../../assets/icons/nav-commu-white.svg";
import homeGrey from "../../assets/icons/nav-home-grey.svg";
import homeWhite from "../../assets/icons/nav-home-white.svg";
import magGrey from "../../assets/icons/nav-mag-grey.svg";
import magWhite from "../../assets/icons/nav-mag-white.svg";
import myGrey from "../../assets/icons/nav-my-grey.svg";
import myWhite from "../../assets/icons/nav-my-white.svg";

// 피그마: icon-bottomnav (속성 1=home|commu|mag|my, 속성 2=white|grey)
// 속성 2는 active(true=white)로 대체
const ICONS = {
  home: { white: homeWhite, grey: homeGrey },
  community: { white: commuWhite, grey: commuGrey },
  magazine: { white: magWhite, grey: magGrey },
  my: { white: myWhite, grey: myGrey },
};

export default function IconBottomNav({
  variant = "home",
  active = false,
  className = "",
}) {
  return (
    <img
      src={ICONS[variant][active ? "white" : "grey"]}
      alt=""
      className={`size-6 ${className}`}
    />
  );
}
