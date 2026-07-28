import { useState } from "react";
import { BottomNav, Header, Heart } from "../components/common";
import FilterSheet from "../components/common/FilterSheet";
import chevronDown from "../assets/icons/chevron-down.svg";
import buly from "../assets/images/mypage/buly.png";
import bvlgari from "../assets/images/mypage/bvlgari.png";
import diptyque from "../assets/images/mypage/diptyque.png";
import masion from "../assets/images/mypage/masion.png";

// 참고 파일(MyWishlistPage.tsx)의 레이아웃/기능을 이 프로젝트 컴포넌트·토큰으로 이식
const filterTabs = ["브랜드", "향 계열/향기", "용량"];
const categoryTabs = ["전체", ...filterTabs];

const brandOptions = [
  "BULY",
  "BVLGARI PERFUME",
  "DIPTYQUE",
  "MAISON MARGIELA FRAGRANCES",
  "매종",
];
const fragranceOptions = ["알데하이드", "피오니", "머스크", "시트러스", "플로럴"];
const volumeOptions = ["30ml 미만", "30ml ~ 50ml 미만", "50ml ~ 100ml 미만", "100ml ~ 200ml 미만"];

const filterOptions = {
  브랜드: brandOptions,
  "향 계열/향기": fragranceOptions,
  용량: volumeOptions,
};

const wishItems = [
  {
    brand: "MAISON MARGIELA FRAGRANCES",
    name: "체이싱 선셋 EDT 30ML",
    image: masion,
    keywords: ["#망고", "#이슬비", "#상큼함"],
  },
  {
    brand: "BVLGARI PERFUME",
    name: "불가리 옴니아 아메시스트 오 드 뚜왈렛 100ml",
    image: bvlgari,
    keywords: ["#파우더리", "#아이리스", "#바닐라"],
  },
  {
    brand: "BULY",
    name: "휠 오 트리플 향수 75ml - 이리 드 말트",
    image: buly,
    keywords: ["#레몬 그라스", "#아이리스", "#시트러스"],
  },
  {
    brand: "MAISON MARGIELA FRAGRANCES",
    name: "레이지 선데이 모닝 EDT 100ML",
    image: masion,
    keywords: ["#세탁세제향", "#아이리스", "#화이트 머스크"],
  },
  {
    brand: "DIPTYQUE",
    name: "오 데 썽 오 드 뚜왈렛 100ML",
    image: diptyque,
    keywords: ["#비터 오렌지", "#오렌지 블로섬", "#패츌리"],
    centeredImage: true,
  },
  {
    brand: "JO MALONE",
    name: "우드 세이지 앤 씨솔트 코롱 100ML",
    keywords: ["#라벤더", "#씨솔트", "#드라이 허브"],
  },
  {
    brand: "BYREDO",
    name: "블랑쉬 오 드 퍼퓸 100ML",
    keywords: ["#라벤더", "#장미", "#화이트 머스크"],
  },
];

// TODO: 참고 파일의 조 말론/바이레도 상품 이미지가 이 프로젝트에 없어 회색 placeholder로 대체
function WishImagePlaceholder() {
  return <div className="size-full bg-2light-grey" />;
}

function WishCard({ item }) {
  const [isFavorite, setIsFavorite] = useState(true);
  const [isRegisteredOpen, setIsRegisteredOpen] = useState(false);

  return (
    <article className="min-w-0">
      <div className="relative flex h-[254px] items-center justify-center overflow-hidden bg-offwhite">
        {item.image ? (
          item.centeredImage ? (
            <img alt={item.name} className="h-[150px] w-auto object-contain" src={item.image} />
          ) : (
            <img alt={item.name} className="size-full object-cover" src={item.image} />
          )
        ) : (
          <WishImagePlaceholder />
        )}
        <Heart
          variant={isFavorite ? "abled" : "grey1"}
          className="absolute right-4 bottom-4 size-6"
          onClick={() => setIsFavorite((favorite) => !favorite)}
        />
      </div>

      <div className="mt-3 flex h-14 flex-col gap-1">
        <p className="truncate text-caption-regular-12 text-grey">{item.brand}</p>
        <h3 className="line-clamp-2 text-body-semibold-16 text-offblack">{item.name}</h3>
      </div>

      <div className="mt-3 flex h-3.5 flex-wrap gap-x-2 gap-y-1 overflow-hidden">
        {item.keywords.map((keyword) => (
          <span className="text-caption-medium-12 text-grey" key={keyword}>
            {keyword}
          </span>
        ))}
      </div>

      <button
        className="mt-3 h-[30px] w-fit rounded-full border border-light-grey px-3.5 text-caption-medium-12 text-grey"
        onClick={() => setIsRegisteredOpen(true)}
        type="button"
      >
        구매 완료
      </button>

      {isRegisteredOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-offblack/35 px-10"
          onClick={() => setIsRegisteredOpen(false)}
        >
          <section
            className="w-full max-w-[320px] rounded-[20px] bg-offwhite px-6 py-7 text-center shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-title-medium-20 text-offblack">내 향수 등록 완료</h2>
            <p className="mt-3 text-body-regular-14 text-grey">내 향수에 등록되었어요.</p>
            <button
              className="mt-6 h-12 w-full rounded-[32px] bg-offblack text-body-semibold-16 text-offwhite"
              onClick={() => setIsRegisteredOpen(false)}
              type="button"
            >
              확인
            </button>
          </section>
        </div>
      )}
    </article>
  );
}

export default function MyWishlistPage() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const toggleFilter = (option) => {
    setSelectedFilters((current) =>
      current.includes(option) ? current.filter((filter) => filter !== option) : [...current, option],
    );
  };

  const selectedBrandFilters = selectedFilters.filter((filter) => brandOptions.includes(filter));
  const filteredWishItems =
    selectedBrandFilters.length === 0
      ? wishItems
      : wishItems.filter((item) => selectedBrandFilters.includes(item.brand));

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-background pb-[104px]">
      <Header
        variant="detail-back"
        title="위시리스트"
        onBack={() => {
          window.location.href = "/mypage";
        }}
      />

      <div className="flex flex-col gap-4 px-5 pt-6">
        <p className="text-body-regular-14 text-grey">
          담아둔 향수 <span className="text-offblack">{wishItems.length}</span>개 · 플로럴 계열에 관심이 많아요
        </p>

        <div className="flex items-center justify-between gap-2">
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
            {categoryTabs.map((tab) => {
              const isFilterTab = filterTabs.includes(tab);
              const isActive = isFilterTab
                ? filterOptions[tab].some((option) => selectedFilters.includes(option))
                : selectedFilters.length === 0;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => isFilterTab && setActiveFilter(tab)}
                  className={`shrink-0 rounded-full px-3.5 py-2 text-caption-medium-12 whitespace-nowrap ${
                    isActive ? "bg-offblack text-offwhite" : "border border-light-grey bg-offwhite text-grey"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            className="flex shrink-0 items-center gap-1 rounded-full border border-light-grey bg-offwhite py-2 pr-3 pl-3.5 text-caption-medium-12 text-grey whitespace-nowrap"
          >
            최신순
            <img src={chevronDown} alt="" className="size-3.5" />
          </button>
        </div>

        <section className="grid grid-cols-2 gap-x-2.5 gap-y-[30px]">
          {filteredWishItems.map((item) => (
            <WishCard item={item} key={item.name} />
          ))}
        </section>
      </div>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 px-5 pb-5">
        <BottomNav active="my" />
      </div>

      {activeFilter && (
        <FilterSheet
          tabs={filterTabs}
          activeTab={activeFilter}
          filterOptions={filterOptions}
          brandTabLabel="브랜드"
          selectedFilters={selectedFilters}
          matchCount={filteredWishItems.length}
          onSelectTab={setActiveFilter}
          onToggleFilter={toggleFilter}
          onReset={() => setSelectedFilters([])}
          onClose={() => setActiveFilter(null)}
        />
      )}
    </div>
  );
}
