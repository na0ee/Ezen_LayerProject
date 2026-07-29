import { useMemo, useSyncExternalStore } from "react";
import {
  getPerfumeWishlistIds,
  subscribePerfumeWishlist,
  togglePerfumeWishlist,
} from "../data/perfumeWishlist";

export default function usePerfumeWishlist() {
  const ids = useSyncExternalStore(
    subscribePerfumeWishlist,
    getPerfumeWishlistIds,
    getPerfumeWishlistIds,
  );
  const idSet = useMemo(() => new Set(ids), [ids]);

  return {
    ids,
    isWishlisted: (id) => idSet.has(id),
    toggleWishlist: togglePerfumeWishlist,
  };
}
