export const ONBOARDING_RESULT_TYPE_KEY = "layer-onboarding-result-type";
export const DEFAULT_ONBOARDING_RESULT_TYPE = "mood-shifter";
const ONBOARDING_RESULT_TYPES = new Set([
  "bold-signature",
  "soft-wanderer",
  "white-canvas",
  "daily-basic",
  "mood-shifter",
  "layer-maximalist",
]);

export function getSavedOnboardingResultType() {
  const savedResultType = localStorage.getItem(ONBOARDING_RESULT_TYPE_KEY);

  return ONBOARDING_RESULT_TYPES.has(savedResultType)
    ? savedResultType
    : DEFAULT_ONBOARDING_RESULT_TYPE;
}

export function saveOnboardingResultType(resultType) {
  if (!ONBOARDING_RESULT_TYPES.has(resultType)) return;

  localStorage.setItem(ONBOARDING_RESULT_TYPE_KEY, resultType);
}
