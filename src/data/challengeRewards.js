export const COMPLETED_CHALLENGES_KEY = "layer-completed-challenges";

export const CHALLENGE_REWARDS = {
  community: 75,
  "community-main-1": 75,
  "community-main-2": 75,
  "community-main-3": 75,
  "register-perfume": 30,
  "recommend-perfume": 5,
  "gift-with-ai": 95,
  "home-community": 75,
  "home-register-perfume": 30,
  "home-recommend-perfume": 5,
};

export function getCompletedChallengeIds() {
  try {
    return new Set(
      JSON.parse(localStorage.getItem(COMPLETED_CHALLENGES_KEY) ?? "[]"),
    );
  } catch {
    return new Set();
  }
}

export function completeChallenge(challengeId) {
  const completed = getCompletedChallengeIds();
  completed.add(challengeId);
  localStorage.setItem(
    COMPLETED_CHALLENGES_KEY,
    JSON.stringify([...completed]),
  );
  return completed;
}
