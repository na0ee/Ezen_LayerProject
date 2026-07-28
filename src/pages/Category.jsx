import { useState } from "react";
import { CategoryChip, Search } from "../components/common";

// 피그마: 카테고리 (3062:76579) — 검색바 + 향 계열/브랜드 칩 목록
// 칩은 2열(188px + 14px gap = 390px)로 읽는 순서대로 채운다.
const sections = [
  {
    title: "향 계열",
    items: [
      "아쿠아틱",
      "우디",
      "플로럴",
      "머스크",
      "시트러스",
      "오리엔탈",
      "파우더리",
      "스파이시",
      "그린",
    ],
  },
  {
    title: "브랜드",
    items: [
      "MAISON MARGIELA",
      "BVLGARI",
      "BULY 1803",
      "JO MALONE",
      "BYREDO",
      "LE LABO",
      "AESOP",
      "DIPTYQUE",
      "CHANEL",
      "SANTA MARIA NOVELLA",
    ],
  },
];

export default function Category({ onBack, onSelect, onSearch }) {
  const [query, setQuery] = useState("");

  // 검색어가 비어 있으면 전체 향수를 보여준다
  const runSearch = () => onSearch?.(query.trim());

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto w-full max-w-107.5 bg-background pb-6">
        <div className="flex h-16 items-center justify-center bg-offwhite px-5">
          <Search
            onBack={onBack}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onClear={() => setQuery("")}
            onSearch={runSearch}
            onKeyDown={(event) => event.key === "Enter" && runSearch()}
          />
        </div>

        <div className="flex flex-col gap-10 pt-3">
          {sections.map((section) => (
            <section key={section.title} className="flex flex-col gap-6">
              <h2 className="px-5 text-body-medium-16 text-offblack">
                {section.title}
              </h2>
              <div className="grid grid-cols-[repeat(2,188px)] justify-center gap-x-3.5 gap-y-4">
                {section.items.map((item) => (
                  <CategoryChip
                    key={item}
                    onClick={() => onSelect?.(section.title, item)}
                  >
                    {item}
                  </CategoryChip>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
