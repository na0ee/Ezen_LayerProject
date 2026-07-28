import { Navigate, useParams } from "react-router-dom";
import { ResultTypePage } from "../components/common";
import { ONBOARDING_RESULTS } from "../data/onboardingResults";

export default function OnboardingResult() {
  const { resultType } = useParams();
  const result = ONBOARDING_RESULTS[resultType];

  if (!result) {
    return <Navigate to="/onboarding/1" replace />;
  }

  return <ResultTypePage {...result} />;
}
