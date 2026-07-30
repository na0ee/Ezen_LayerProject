import { useMemo, useState } from "react";
import { CardInfo, Category, Search } from "../components/common";
import { searchPerfumes } from "../data/perfumeUtils";
import usePerfumeWishlist from "../hooks/usePerfumeWishlist";

// 피그마: 검색결과 (3062:76651) — 검색바 + 카테고리 탭 + card-info(perfume/a) 목록
const tabs = ["전체", "향 계열", "브랜드"];

export default function SearchResult({ query = "", onBack, onSelect }) {
  // 검색 결과는 항상 "전체" 탭에서 시작한다
  const [tab, setTab] = useState("전체");
  const { isWishlisted, toggleWishlist } = usePerfumeWishlist();

  // 탭에 따라 정렬한다. "전체"는 데이터에 적힌 순서 그대로
  const results = useMemo(() => {
    const found = searchPerfumes(query);
    const byName = (a, b) => a.name.localeCompare(b.name, "ko");

    if (tab === "브랜드") {
      return [...found].sort(
        (a, b) => a.brand.localeCompare(b.brand, "ko") || byName(a, b),
      );
    }
    if (tab === "향 계열") {
      return [...found].sort(
        (a, b) =>
          (a.keywords[0] ?? "").localeCompare(b.keywords[0] ?? "", "ko") ||
          byName(a, b),
      );
    }
    return found;
  }, [query, tab]);

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto w-full max-w-107.5 bg-background pb-6">
        <div
          data-search-header
          className="flex h-16 items-center justify-center bg-offwhite px-5"
        >
          <Search onBack={onBack} defaultValue={query} />
        </div>
        <Category variant="page" items={tabs} active={tab} onChange={setTab} />

        {results.length === 0 ? (
          <p className="px-5 pt-10 text-center text-body-regular-14 text-grey">
            {`'${query}'에 해당하는 향수를 찾지 못했어요.`}
          </p>
        ) : (
          <div className="flex flex-col gap-4 px-5 pt-4">
            {results.map((item) => (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelect?.(item)}
                onKeyDown={(event) => {
                  if (event.key !== "Enter" && event.key !== " ") return;
                  event.preventDefault();
                  onSelect?.(item);
                }}
                className="cursor-pointer"
              >
                <CardInfo
                  variant="perfume"
                  type="a"
                  img={item.img}
                  brand={item.brand}
                  name={item.name}
                  keywords={item.keywords}
                  liked={isWishlisted(item.id)}
                  onLike={(event) => {
                    // 하트는 카드 클릭(상세 이동)으로 번지지 않게
                    event.stopPropagation();
                    toggleWishlist(item.id);
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
