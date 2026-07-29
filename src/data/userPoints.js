const POINTS_STORAGE_KEY = "layer-user-points";
const DEFAULT_POINTS = 1200;

export function getUserPoints() {
  const saved = Number(localStorage.getItem(POINTS_STORAGE_KEY));
  return Number.isFinite(saved) && saved >= 0 ? saved : DEFAULT_POINTS;
}

export function addUserPoints(amount) {
  const nextPoints = getUserPoints() + amount;
  localStorage.setItem(POINTS_STORAGE_KEY, String(nextPoints));
  window.dispatchEvent(
    new CustomEvent("layer-points-changed", { detail: nextPoints }),
  );
  return nextPoints;
}
