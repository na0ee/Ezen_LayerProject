import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import MagazineAllView from "../Magazine/Magazine_allview";
import MagazineByredo from "../Magazine/Magazine_BYREDO";
import MagazineDiptyque from "../Magazine/Magazine_DIPTYQUE";
import MagazineFragranceCollection from "../Magazine/Magazine_FragranceCollection";
import MagazineJomalone from "../Magazine/Magazine_JOMALONE";
import MagazineMain from "../Magazine/Magazine_main";
import MagazineNiche from "../Magazine/Magazine_NICHE";
import MagazineSummer from "../Magazine/Magazine_SEASON/Magazine_summer";
import MagazineTip from "../Magazine/Magazine_TIP";
import { BottomNav } from "./components/common";
import Category from "./pages/Category";
import Chatbot from "./pages/Chatbot";
import ComponentsPreview from "./pages/ComponentsPreview";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import Login from "./pages/Login";
import OnboardingQuestion from "./pages/OnboardingQuestion";
import ProfileSetup from "./pages/ProfileSetup";
import Raffle from "./pages/raffle";

export default function App() {
  const navigate = useNavigate();
  const navigateByTab = (tab) => {
    const routes = {
      home: "/home",
      community: "/community",
      magazine: "/magazine",
      my: "/my",
    };
    navigate(routes[tab]);
  };
  const goBackToMagazine = () => navigate("/magazine");
  const magazineRoutes = {
    onAllView: () => navigate("/magazine/all"),
    onByredo: () => navigate("/magazine/byredo"),
    onNiche: () => navigate("/magazine/niche"),
    onJomalone: () => navigate("/magazine/jomalone"),
    onDiptyque: () => navigate("/magazine/diptyque"),
    onFragranceCollection: () => navigate("/magazine/collection"),
    onSeason: () => navigate("/magazine/season"),
    onSantalTip: () => navigate("/magazine/tip"),
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<ProfileSetup />} />
      <Route
        path="/onboarding"
        element={<Navigate to="/onboarding/1" replace />}
      />
      <Route
        path="/onboarding/result"
        element={<Navigate to="/home" replace />}
      />
      <Route path="/onboarding/:step" element={<OnboardingQuestion />} />

      <Route
        path="/home"
        element={
          <Home
            onRaffle={() => navigate("/raffle")}
            onNavigate={navigateByTab}
          />
        }
      />
      <Route
        path="/raffle"
        element={<Raffle onBack={() => navigate("/home")} />}
      />

      <Route
        path="/magazine"
        element={
          <MagazineMain
            {...magazineRoutes}
            onNavigate={navigateByTab}
          />
        }
      />
      <Route
        path="/magazine/all"
        element={
          <MagazineAllView
            {...magazineRoutes}
            onBack={goBackToMagazine}
          />
        }
      />
      <Route
        path="/magazine/byredo"
        element={<MagazineByredo onBack={goBackToMagazine} />}
      />
      <Route
        path="/magazine/niche"
        element={<MagazineNiche onBack={goBackToMagazine} />}
      />
      <Route
        path="/magazine/jomalone"
        element={<MagazineJomalone onBack={goBackToMagazine} />}
      />
      <Route
        path="/magazine/diptyque"
        element={<MagazineDiptyque onBack={goBackToMagazine} />}
      />
      <Route
        path="/magazine/collection"
        element={<MagazineFragranceCollection onBack={goBackToMagazine} />}
      />
      <Route
        path="/magazine/season"
        element={<MagazineSummer onBack={goBackToMagazine} />}
      />
      <Route
        path="/magazine/tip"
        element={<MagazineTip onBack={goBackToMagazine} />}
      />

      <Route
        path="/category"
        element={
          <Category
            onSearch={(query) => navigate(`/search?q=${encodeURIComponent(query)}`)}
            onSelect={(_, item) =>
              navigate(`/search?q=${encodeURIComponent(item)}`)
            }
          />
        }
      />
      <Route path="/search" element={<SearchResultRoute />} />
      <Route path="/chatbot" element={<Chatbot onBack={() => navigate(-1)} />} />

      <Route
        path="/community"
        element={<ComingSoon title="커뮤니티" />}
      />
      <Route path="/my" element={<ComingSoon title="마이페이지" />} />
      <Route path="/components" element={<ComponentsPreview />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

// 검색어를 쿼리스트링(?q=)으로 받는다.
// 카드 클릭(onSelect)은 향수 상세 페이지가 생기면 연결한다.
function SearchResultRoute() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  return (
    <SearchResult query={params.get("q") ?? ""} onBack={() => navigate(-1)} />
  );
}

function ComingSoon({ title }) {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-[430px] items-center justify-center bg-background px-5 pb-28">
      <div className="text-center">
        <h1 className="text-title-semibold-24 text-offblack">{title}</h1>
        <p className="mt-2 text-body-regular-14 text-grey1">
          화면을 준비하고 있습니다.
        </p>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[430px] px-5 pb-5">
        <BottomNav />
      </div>
    </main>
  );
}
