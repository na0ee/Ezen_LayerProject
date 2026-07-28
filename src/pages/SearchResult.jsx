import { useState } from "react";
import { CardInfo, Category, Search } from "../components/common";
import replicaImg from "../assets/images/search/replica-chasing-sunset.png";

// 피그마: 검색결과 (3062:76651) — 검색바 + 카테고리 탭 + card-info(perfume/a) 목록
const tabs = ["전체", "향 계열", "브랜드"];

const results = [
  {
    id: "chasing-sunset-1",
    img: replicaImg,
    brand: "MAISON MARGIELA FRAGRANCES",
    name: "체이싱 선셋 EDT 30ML",
    keywords: ["알데하이드", "피오니", "머스크"],
  },
  {
    id: "chasing-sunset-2",
    img: replicaImg,
    brand: "MAISON MARGIELA FRAGRANCES",
    name: "체이싱 선셋 EDT 30ML",
    keywords: ["알데하이드", "피오니", "머스크"],
  },
  {
    id: "chasing-sunset-3",
    img: replicaImg,
    brand: "MAISON MARGIELA FRAGRANCES",
    name: "체이싱 선셋 EDT 30ML",
    keywords: ["알데하이드", "피오니", "머스크"],
  },
];

export default function SearchResult({ query = "", onBack, onSelect }) {
  // 검색 결과는 항상 "전체" 탭에서 시작한다
  const [tab, setTab] = useState("전체");
  const [likedIds, setLikedIds] = useState([]);

  const toggleLike = (id) =>
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((it) => it !== id) : [...prev, id],
    );

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto w-full max-w-[430px] bg-background pb-6">
        <div className="flex h-16 items-center justify-center bg-offwhite px-5">
          <Search onBack={onBack} defaultValue={query} />
        </div>
        <Category variant="page" items={tabs} active={tab} onChange={setTab} />

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
                liked={likedIds.includes(item.id)}
                onLike={(event) => {
                  // 하트는 카드 클릭(상세 이동)으로 번지지 않게
                  event.stopPropagation();
                  toggleLike(item.id);
                }}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
