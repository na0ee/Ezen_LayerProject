import { useState } from "react";
import Home from "./pages/Home";
import Raffle from "./pages/raffle";
import {
  Badge,
  Bell,
  BottomNav,
  BtnBig,
  BtnGo,
  BtnHero,
  BtnSmall,
  Bubble,
  CardChallenge,
  CardChallengeSmall,
  CardInfo,
  CardMag,
  CardMainReview,
  CardRank,
  CardSmall,
  Category,
  CategoryChip,
  ChatCard,
  CheckBox,
  CommunityComment,
  CommunityEnter,
  CommunityToggle,
  Con2,
  ConQuestion,
  ConQuestion1,
  HashTag,
  Header,
  Heart,
  Icon,
  Img,
  Input,
  KeywordList,
  MagListCard,
  MagazineCard,
  MainBanner,
  MainBannerText,
  MiddleCard,
  Profile,
  QuickCategory,
  Review,
  ReviewAiSummary,
  ReviewSummary,
  ReviewSummary1,
  ReviewSummary2,
  Search,
  TabSub,
  TagMag,
  TitleMag,
  TitleMain,
  TitleSection,
} from "./components/common";
import { Navigate, Route, Routes } from "react-router-dom";
import ComponentsPreview from "./pages/ComponentsPreview";
import Login from "./pages/Login";
import OnboardingQuestion from "./pages/OnboardingQuestion";
import ProfileSetup from "./pages/ProfileSetup";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<ProfileSetup />} />
      <Route path="/onboarding" element={<Navigate to="/onboarding/1" replace />} />
      <Route path="/onboarding/:step" element={<OnboardingQuestion />} />
      {/* 공통 컴포넌트 미리보기 */}
      <Route path="/components" element={<ComponentsPreview />} />
    </Routes>
  );
}

export default function App() {
  const [page, setPage] = useState("home");

  if (window.location.pathname === "/components") {
    return <ComponentsPreview />;
  }

  if (page === "raffle") {
    return <Raffle onBack={() => setPage("home")} />;
  }

  return <Home onRaffle={() => setPage("raffle")} />;
}
