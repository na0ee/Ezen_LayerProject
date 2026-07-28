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
import CategoryPage from "./pages/Category";
import Chatbot from "./pages/Chatbot";
import ComponentsPreview from "./pages/ComponentsPreview";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPerfumePage from "./pages/MyPerfumePage";
import MyReviewsPage from "./pages/MyReviewsPage";
import Mypage from "./pages/Mypage";
import MyWishlistPage from "./pages/MyWishlistPage";
import OnboardingQuestion from "./pages/OnboardingQuestion";
import OnboardingResult from "./pages/OnboardingResult";
import OnboardingSkip from "./pages/OnboardingSkip";
import OnboardingLoading from "./pages/OnboardingLoading";
import ProfileSetup from "./pages/ProfileSetup";
import Raffle from "./pages/raffle";
import SearchResult from "./pages/SearchResult";

const TAB_ROUTES = {
  home: "/home",
  community: "/community",
  magazine: "/magazine",
  my: "/my",
};

export default function App() {
  const navigate = useNavigate();
  const navigateByTab = (tab) => navigate(TAB_ROUTES[tab]);
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
      <Route path="/onboarding" element={<Navigate to="/onboarding/1" replace />} />
      <Route path="/onboarding/result" element={<Navigate to="/home" replace />} />
      <Route path="/onboarding/skip" element={<OnboardingSkip />} />
      <Route path="/onboarding/loading" element={<OnboardingLoading />} />
      <Route path="/onboarding/:step" element={<OnboardingQuestion />} />

      <Route path="/result/:resultType" element={<OnboardingResult />} />
      <Route path="/bold-signature" element={<Navigate to="/result/bold-signature" replace />} />
      <Route path="/soft-wanderer" element={<Navigate to="/result/soft-wanderer" replace />} />
      <Route path="/white-canvas" element={<Navigate to="/result/white-canvas" replace />} />
      <Route path="/daily-basic" element={<Navigate to="/result/daily-basic" replace />} />
      <Route path="/mood-shifter" element={<Navigate to="/result/mood-shifter" replace />} />
      <Route
        path="/layer-maximalist"
        element={<Navigate to="/result/layer-maximalist" replace />}
      />

      <Route
        path="/home"
        element={
          <Home
            onRaffle={() => navigate("/raffle")}
            onStartOnboarding={() => navigate("/onboarding/1")}
            onNavigate={navigateByTab}
          />
        }
      />
      <Route path="/raffle" element={<Raffle onBack={() => navigate("/home")} />} />

      <Route path="/category" element={<CategoryRoute />} />
      <Route path="/search" element={<SearchRoute />} />
      <Route
        path="/chatbot"
        element={<Chatbot onBack={() => navigate(-1)} onSelectPerfume={() => navigate("/category")} />}
      />

      <Route
        path="/magazine"
        element={<MagazineMain {...magazineRoutes} onNavigate={navigateByTab} />}
      />
      <Route
        path="/magazine/all"
        element={<MagazineAllView {...magazineRoutes} onBack={goBackToMagazine} />}
      />
      <Route path="/magazine/byredo" element={<MagazineByredo onBack={goBackToMagazine} />} />
      <Route path="/magazine/niche" element={<MagazineNiche onBack={goBackToMagazine} />} />
      <Route path="/magazine/jomalone" element={<MagazineJomalone onBack={goBackToMagazine} />} />
      <Route path="/magazine/diptyque" element={<MagazineDiptyque onBack={goBackToMagazine} />} />
      <Route
        path="/magazine/collection"
        element={<MagazineFragranceCollection onBack={goBackToMagazine} />}
      />
      <Route path="/magazine/season" element={<MagazineSummer onBack={goBackToMagazine} />} />
      <Route path="/magazine/tip" element={<MagazineTip onBack={goBackToMagazine} />} />

      <Route path="/my" element={<Mypage />} />
      <Route path="/mypage" element={<Navigate to="/my" replace />} />
      <Route path="/mypage/perfumes" element={<MyPerfumePage />} />
      <Route path="/mypage/wishlist" element={<MyWishlistPage />} />
      <Route path="/mypage/reviews" element={<MyReviewsPage />} />

      <Route path="/community" element={<ComingSoon title="커뮤니티" />} />
      <Route path="/components" element={<ComponentsPreview />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

function CategoryRoute() {
  const navigate = useNavigate();
  const search = (query) => navigate(`/search?q=${encodeURIComponent(query)}`);

  return (
    <CategoryPage
      onBack={() => navigate(-1)}
      onSearch={search}
      onSelect={(_, item) => search(item)}
    />
  );
}

function SearchRoute() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <SearchResult
      query={searchParams.get("q") ?? ""}
      onBack={() => navigate("/category")}
    />
  );
}

function ComingSoon({ title }) {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-[430px] items-center justify-center bg-background px-5 pb-28">
      <div className="text-center">
        <h1 className="text-title-semibold-24 text-offblack">{title}</h1>
        <p className="mt-2 text-body-regular-14 text-grey1">화면을 준비하고 있습니다.</p>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[430px] px-5 pb-5">
        <BottomNav active="community" />
      </div>
    </main>
  );
}
