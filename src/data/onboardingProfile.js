export const ONBOARDING_RESULT_TYPE_KEY = "layer-onboarding-result-type";
export const DEFAULT_ONBOARDING_RESULT_TYPE = "mood-shifter";

export function getSavedOnboardingResultType() {
  return (
    localStorage.getItem(ONBOARDING_RESULT_TYPE_KEY) ||
    DEFAULT_ONBOARDING_RESULT_TYPE
  );
}

export function saveOnboardingResultType(resultType) {
  localStorage.setItem(ONBOARDING_RESULT_TYPE_KEY, resultType);
}
