// docs/LAYER_향수유형_점수표.xlsx의 '질문별점수표' 기준 [축 A, 축 B]
const AXIS_SCORES = {
  none: [0, -2],
  "1-2": [0, -1],
  "3-5": [0, 0],
  "6+": [0, 2],
  travel: [0, 1],
  sleep: [-1, 0],
  special: [2, 0],
  workout: [-1, 0],
  work: [0, 0],
  refresh: [0, 1],
  floral: [0, 0],
  woody: [1, 0],
  aquatic: [-1, 0],
  citrus: [0, 0],
  musk: [-1, 0],
  oriental: [2, 0],
  powdery: [-1, 0],
  spicy: [1, 1],
  green: [-1, 0],
  minimal: [-1, -1],
  chic: [2, 1],
  feminine: [0, 1],
  casual: [-1, 0],
  signature: [0, -3],
  layering: [0, 3],
};

const RESULT_BY_AXES = {
  "subtle|consistent": "white-canvas",
  "balanced|consistent": "daily-basic",
  "bold|consistent": "bold-signature",
  "subtle|exploratory": "soft-wanderer",
  "balanced|exploratory": "mood-shifter",
  "bold|exploratory": "layer-maximalist",
};

export function calculateOnboardingResult(answers) {
  const [axisA, axisB] = Object.values(answers)
    .flatMap((answer) => (Array.isArray(answer) ? answer : [answer]))
    .filter(Boolean)
    .reduce(
      ([totalA, totalB], value) => {
        const [scoreA, scoreB] = AXIS_SCORES[value] ?? [0, 0];
        return [totalA + scoreA, totalB + scoreB];
      },
      [0, 0]
    );

  const presence = axisA <= -2 ? "subtle" : axisA >= 2 ? "bold" : "balanced";
  const attitude = axisB >= 0 ? "exploratory" : "consistent";

  return {
    axisA,
    axisB,
    resultType: RESULT_BY_AXES[`${presence}|${attitude}`],
  };
}

export function getOnboardingResultPath(answers) {
  return `/result/${calculateOnboardingResult(answers).resultType}`;
}
