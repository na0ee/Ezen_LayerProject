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
