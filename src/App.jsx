import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
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
import MagazineSummerPerfume from "../Magazine/Magazine_Summerperfume";
import MagazineTip from "../Magazine/Magazine_TIP";
import { findPerfume } from "./data/perfumeUtils";
import {
  completeChallenge,
  getCompletedChallengeIds,
} from "./data/challengeRewards";
import { addUserPoints } from "./data/userPoints";
import Category from "./pages/Category";
import Chatbot from "./pages/Chatbot";
import ComponentsPreview from "./pages/ComponentsPreview";
import CommunityWriteEntryPage from "./pages/Community/CommunityWriteEntryPage";
import CommunityRecommendationDetailPage from "./pages/Community/CommunityRecommendationDetailPage";
import CommunityProfilePage from "./pages/CommunityProfilePage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyMembershipPage from "./pages/MyMembershipPage";
import MyPerfumeAddPage from "./pages/MyPerfumeAddPage";
import MyPerfumePage from "./pages/MyPerfumePage";
import MyPerfumeRecordPage from "./pages/MyPerfumeRecordPage";
import MyReviewsPage from "./pages/MyReviewsPage";
import Mypage from "./pages/Mypage";
import PerfumeDetail from "./pages/PerfumeDetail";
import MyWishlistPage from "./pages/MyWishlistPage";
import OnboardingQuestion from "./pages/OnboardingQuestion";
import OnboardingResult from "./pages/OnboardingResult";
import OnboardingSkip from "./pages/OnboardingSkip";
import OnboardingLoading from "./pages/OnboardingLoading";
import PerfumeDetail from "./pages/PerfumeDetail";
import ProfileSetup from "./pages/ProfileSetup";
import Raffle from "./pages/raffle";
import SearchResult from "./pages/SearchResult";
import Splash from "./pages/Splash";
import Alarm from "./pages/alarm";
import { findPerfume } from "./data/perfumeUtils";

const TAB_ROUTES = {
  home: "/home",
  community: "/community",
  magazine: "/magazine",
  my: "/my",
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  // 멤버십 등급 모달을 팝업처럼 띄우기 위한 배경 라우트 패턴 — Mypage.jsx에서
  // navigate(..., { state: { backgroundLocation } })로 넘어오면 이전 화면을 그대로 유지한 채
  // 모달 라우트만 그 위에 겹쳐 그린다 (뒤 배경이 실제로 어두워진 콘텐츠로 보이게)
  const backgroundLocation = location.state?.backgroundLocation;
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
    onSummerPerfume: () => navigate("/magazine/summer-perfume"),
    onSantalTip: () => navigate("/magazine/tip"),
  };

  return (
    <>
      <svg aria-hidden="true" className="pointer-events-none absolute size-0">
        <defs>
          <filter
            id="glass-refraction"
            x="-20%"
            y="-30%"
            width="140%"
            height="160%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.065"
              numOctaves="1"
              seed="8"
              result="refractionNoise"
            />
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="0.8"
              result="softBackdrop"
            />
            <feDisplacementMap
              in="softBackdrop"
              in2="refractionNoise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <ScrollToTop />
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Splash />} />
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
              onStartOnboarding={() =>
                navigate("/onboarding/1", { state: { returnTo: "/home" } })
              }
              onNavigate={navigateByTab}
            />
          }
        />
        <Route path="/raffle" element={<Raffle onBack={() => navigate("/home")} />} />
        <Route path="/alarm" element={<Alarm />} />
        <Route
          path="/chatbot"
          element={<Chatbot onBack={() => navigate(-1)} onSelectPerfume={(entry) => navigate(`/perfume/${entry.id}`)} />}
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
        <Route
          path="/magazine/summer-perfume"
          element={<MagazineSummerPerfume onBack={goBackToMagazine} />}
        />
        <Route path="/magazine/tip" element={<MagazineTip onBack={goBackToMagazine} />} />

        <Route path="/my" element={<Mypage />} />
        <Route path="/mypage" element={<Navigate to="/my" replace />} />
        <Route path="/mypage/perfumes" element={<MyPerfumePage />} />
        <Route path="/mypage/perfumes/new" element={<MyPerfumeAddPage />} />
        <Route path="/mypage/perfumes/record" element={<MyPerfumeRecordPage />} />
        <Route path="/mypage/wishlist" element={<MyWishlistPage />} />
        <Route path="/mypage/reviews" element={<MyReviewsPage />} />
        <Route path="/mypage/membership" element={<MyMembershipPage />} />

        <Route
          path="/category"
          element={
            <Category
              onBack={() => navigate(-1)}
              onSearch={(query) => navigate(`/search?q=${encodeURIComponent(query)}`)}
              onSelect={(_, item) =>
                navigate(`/search?q=${encodeURIComponent(item)}`)
              }
            />
          }
        />
        <Route path="/search" element={<SearchResultRoute />} />
        <Route path="/perfume/:id" element={<PerfumeDetailRoute />} />
        <Route path="/community" element={<CommunityWriteEntryPage />} />
        <Route
          path="/community/post/:postId"
          element={<CommunityRecommendationDetailPage />}
        />
        <Route
          path="/community/profile/:profileId"
          element={<CommunityProfilePage />}
        />
        <Route path="/components" element={<ComponentsPreview />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

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
      <Route
        path="/magazine/summer-perfume"
        element={<MagazineSummerPerfume onBack={goBackToMagazine} />}
      />
      <Route path="/magazine/tip" element={<MagazineTip onBack={goBackToMagazine} />} />
      <Route path="/my" element={<Mypage />} />
      <Route path="/mypage" element={<Navigate to="/my" replace />} />
      <Route path="/mypage/perfumes" element={<MyPerfumePage />} />
      <Route path="/mypage/wishlist" element={<MyWishlistPage />} />
      <Route path="/mypage/reviews" element={<MyReviewsPage />} />
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
      <Route path="/perfume/:perfumeId" element={<PerfumeDetailRoute />} />
      <Route path="/community" element={<CommunityWriteEntryPage />} />
      <Route path="/components" element={<ComponentsPreview />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

// 화면이 바뀌면 항상 맨 위에서 시작한다 (뒤로가기로 돌아올 때도 포함)
function ScrollToTop() {
  const { pathname, search } = useLocation();

  // 브라우저는 뒤로가기 때 이전 스크롤 위치를 되살리는데(scrollRestoration),
  // 그게 아래 scrollTo보다 나중에 실행돼 화면 중간에서 열린다. 그래서 꺼둔다
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

// 검색어를 쿼리스트링(?q=)으로 받는다. 카드를 누르면 그 향수의 상세로 이동한다.
function SearchResultRoute() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  return (
    <SearchResult
      query={params.get("q") ?? ""}
      onBack={() => navigate(-1)}
      onSelect={(item) => navigate(`/perfume/${item.id}`)}
    />
  );
}

function PerfumeDetailRoute() {
  const navigate = useNavigate();
  const { perfumeId } = useParams();
  const item = findPerfume(Number(perfumeId));

  return (
    <PerfumeDetail
      key={item.id}
      item={item}
      onBack={() => navigate(-1)}
      onSearch={() => navigate("/category")}
      onBell={() => navigate("/alarm")}
      onMore={() => navigate("/search")}
      onSelectRelated={(related) => navigate(`/perfume/${related.id}`)}
    />
  );
}
