import { useState } from "react";
import MagazineAllView from "../Magazine/Magazine_allview";
import MagazineByredo from "../Magazine/Magazine_BYREDO";
import MagazineDiptyque from "../Magazine/Magazine_DIPTYQUE";
import MagazineFragranceCollection from "../Magazine/Magazine_FragranceCollection";
import MagazineJomalone from "../Magazine/Magazine_JOMALONE";
import MagazineMain from "../Magazine/Magazine_main";
import MagazineNiche from "../Magazine/Magazine_NICHE";
import MagazineSpring from "../Magazine/Magazine_SEASON/Magazine_spring";
import MagazineTip from "../Magazine/Magazine_TIP";

export default function App() {
  const [page, setPage] = useState("main");

  const navigate = (nextPage) => {
    setPage(nextPage);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0 }));
  };

  if (page === "allview") {
    return (
      <MagazineAllView
        onBack={() => navigate("main")}
        onSeason={() => navigate("spring")}
        onSantalTip={() => navigate("santal-tip")}
        onFragranceCollection={() => navigate("fragrance-collection")}
        onDiptyque={() => navigate("diptyque")}
        onJomalone={() => navigate("jomalone")}
        onByredo={() => navigate("byredo")}
        onNiche={() => navigate("niche")}
      />
    );
  }

  if (page === "santal-tip") {
    return <MagazineTip onBack={() => navigate("main")} />;
  }

  if (page === "byredo") {
    return <MagazineByredo onBack={() => navigate("main")} />;
  }

  if (page === "niche") {
    return <MagazineNiche onBack={() => navigate("main")} />;
  }

  if (page === "jomalone") {
    return <MagazineJomalone onBack={() => navigate("main")} />;
  }

  if (page === "diptyque") {
    return <MagazineDiptyque onBack={() => navigate("main")} />;
  }

  if (page === "fragrance-collection") {
    return (
      <MagazineFragranceCollection onBack={() => navigate("main")} />
    );
  }

  if (page === "spring") {
    return <MagazineSpring onBack={() => navigate("main")} />;
  }

  return (
    <MagazineMain
      onAllView={() => navigate("allview")}
      onByredo={() => navigate("byredo")}
      onNiche={() => navigate("niche")}
      onJomalone={() => navigate("jomalone")}
      onDiptyque={() => navigate("diptyque")}
      onFragranceCollection={() => navigate("fragrance-collection")}
      onSeason={() => navigate("spring")}
      onSantalTip={() => navigate("santal-tip")}
    />
  );
}
