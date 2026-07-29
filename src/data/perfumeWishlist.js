const PERFUME_WISHLIST_STORAGE_KEY = "layer-perfume-wishlist";
const PERFUME_WISHLIST_VERSION_KEY = "layer-perfume-wishlist-version";
const PERFUME_WISHLIST_EVENT = "layer:perfume-wishlist-change";
const CURRENT_WISHLIST_VERSION = "2";
const DEFAULT_WISHLIST_IDS = [51, 52, 14, 1, 36, 17, 21];

let cachedIds;

function readStoredIds() {
  if (typeof window === "undefined") return DEFAULT_WISHLIST_IDS;

  try {
    if (
      localStorage.getItem(PERFUME_WISHLIST_VERSION_KEY) !==
      CURRENT_WISHLIST_VERSION
    ) {
      localStorage.setItem(
        PERFUME_WISHLIST_STORAGE_KEY,
        JSON.stringify(DEFAULT_WISHLIST_IDS),
      );
      localStorage.setItem(
        PERFUME_WISHLIST_VERSION_KEY,
        CURRENT_WISHLIST_VERSION,
      );
      return DEFAULT_WISHLIST_IDS;
    }

    const saved = JSON.parse(
      localStorage.getItem(PERFUME_WISHLIST_STORAGE_KEY) ?? "null",
    );
    if (!Array.isArray(saved)) return DEFAULT_WISHLIST_IDS;
    return [...new Set(saved.filter((id) => Number.isInteger(id)))];
  } catch {
    return DEFAULT_WISHLIST_IDS;
  }
}

export function getPerfumeWishlistIds() {
  cachedIds ??= readStoredIds();
  return cachedIds;
}

export function subscribePerfumeWishlist(callback) {
  if (typeof window === "undefined") return () => {};

  const handleStorage = (event) => {
    if (event.key !== PERFUME_WISHLIST_STORAGE_KEY) return;
    cachedIds = readStoredIds();
    callback();
  };
  const handleChange = () => callback();

  window.addEventListener("storage", handleStorage);
  window.addEventListener(PERFUME_WISHLIST_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(PERFUME_WISHLIST_EVENT, handleChange);
  };
}

export function togglePerfumeWishlist(id) {
  const currentIds = getPerfumeWishlistIds();
  cachedIds = currentIds.includes(id)
    ? currentIds.filter((currentId) => currentId !== id)
    : [id, ...currentIds];

  localStorage.setItem(
    PERFUME_WISHLIST_STORAGE_KEY,
    JSON.stringify(cachedIds),
  );
  window.dispatchEvent(new Event(PERFUME_WISHLIST_EVENT));
}
