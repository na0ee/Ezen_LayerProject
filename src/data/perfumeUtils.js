// perfumeData / brands / fragranceFamilies를 화면에서 쓰기 좋게 묶어주는 헬퍼.
import { brands } from "./brands";
import { fragranceFamilies } from "./fragranceFamilies";
import { perfumeData } from "./perfumeData";

const brandById = new Map(brands.map((brand) => [brand.id, brand]));
const familyById = new Map(fragranceFamilies.map((family) => [family.id, family]));

/** 브랜드 영문명 (카드에 표시하는 값) — 예: "MAISON MARGIELA" */
export function brandLabel(brandId) {
  return (brandById.get(brandId)?.nameEn ?? brandId).toUpperCase();
}

/** 향 계열 한글명 배열 — 예: ["플로럴", "머스크"] */
export function familyLabels(familyIds = []) {
  return familyIds.map((id) => familyById.get(id)?.name ?? id);
}

/** 카드·상세 화면에서 바로 쓸 수 있게 평평하게 편 형태로 바꾼다 */
export function toCard(entry) {
  const { id, perfume } = entry;
  return {
    id,
    img: perfume.image,
    brand: brandLabel(perfume.brandId),
    name: perfume.name,
    keywords: familyLabels(perfume.familyIds),
    perfume,
  };
}

export const allPerfumes = perfumeData.map(toCard);

/**
 * 검색어로 향수를 찾는다. 이름·브랜드(한글/영문)·향 계열·노트를 모두 훑는다.
 * 검색어가 비면 전체를 돌려준다.
 */
export function searchPerfumes(query) {
  const keyword = (query ?? "").trim().toLowerCase();
  if (!keyword) return allPerfumes;

  return allPerfumes.filter(({ perfume }) => {
    const brand = brandById.get(perfume.brandId);
    const notes = [
      ...(perfume.notes?.top ?? []),
      ...(perfume.notes?.middle ?? []),
      ...(perfume.notes?.base ?? []),
    ];
    const haystack = [
      perfume.name,
      perfume.description,
      brand?.name,
      brand?.nameEn,
      ...familyLabels(perfume.familyIds),
      ...notes,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(keyword);
  });
}

/** 같은 향 계열을 공유하는 다른 향수 (관련 향수 목록용) */
export function relatedPerfumes(entry, limit = 6) {
  const families = new Set(entry.perfume.familyIds ?? []);
  return allPerfumes
    .filter(
      (item) =>
        item.id !== entry.id &&
        (item.perfume.familyIds ?? []).some((family) => families.has(family)),
    )
    .slice(0, limit);
}

export function findPerfume(id) {
  return allPerfumes.find((item) => item.id === id) ?? allPerfumes[0];
}
