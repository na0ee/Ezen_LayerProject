import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav, Header } from "../components/common";
import FilterSheet from "../components/common/FilterSheet";
import chevronDown from "../assets/icons/chevron-down.svg";
import chevronRightGrey from "../assets/icons/chevron-right-grey.svg";
import chevronRightWhite from "../assets/icons/chevron-right-white.svg";
import loewe from "../assets/images/mypage/loewe.png";
import matiere from "../assets/images/mypage/matiere.png";
import santamaria from "../assets/images/mypage/santamaria.png";

// 참고 파일(MyPerfumePage.tsx)의 레이아웃/기능을 이 프로젝트 컴포넌트·토큰으로 이식
const filterTabs = ["브랜드", "향 계열/향기", "용량"];
const categoryTabs = ["전체", ...filterTabs];

const brandOptions = [
  { name: "불리", nameEn: "BULY" },
  { name: "불가리", nameEn: "BVLGARI PERFUME" },
  { name: "로에베", nameEn: "LOEWE PERFUMES" },
  { name: "메종 마르지엘라", nameEn: "MAISON MARGIELA FRAGRANCES" },
  { name: "마티에 프리미에르", nameEn: "MATIERE PREMIERE" },
  { name: "산타 마리아 노벨라", nameEn: "Santa Maria Novella" },
];
const fragranceOptions = ["알데하이드", "피오니", "머스크", "시트러스", "플로럴"];
const volumeOptions = ["30ml 미만", "30ml ~ 50ml 미만", "50ml ~ 100ml 미만", "100ml ~ 200ml 미만"];

const filterOptions = {
  브랜드: brandOptions,
  "향 계열/향기": fragranceOptions,
  용량: volumeOptions,
};

// 참고: 이번 주 기록되지 않은 요일(Fri, Sun)만 흰색 배경으로 표시 — 피그마(3446:30223) 데모와 동일
const weekDays = [
  { day: "Mon", date: "6" },
  { day: "Tue", date: "7" },
  { day: "Wed", date: "8" },
  { day: "Thu", date: "9" },
  { day: "Fri", date: "10", recorded: false },
  { day: "Sat", date: "11" },
  { day: "Sun", date: "12", recorded: false },
];

const perfumes = [
  {
    brand: "Santa Maria Novella",
    name: "엔젤 디 피렌체 오드코롱 100ml",
    status: "2일 전 사용",
    image: santamaria,
    savedMemo: "비싼값하는듯 굿",
  },
  {
    brand: "LOEWE PERFUMES",
    name: "로에베 아이레 수틸레사 오 드 뚜왈렛 50ml",
    status: "3일 전 사용",
    image: loewe,
    savedMemo: "",
  },
  {
    brand: "MATIERE PREMIERE",
    name: "마티에 프리미에르 메탈 라벤더 오 드 퍼퓸 50ml",
    status: "3일 전 사용",
    image: matiere,
    savedMemo: "",
  },
];

function PerfumeRecordCard({ perfume }) {
  const [savedMemo, setSavedMemo] = useState(perfume.savedMemo);
  const [memo, setMemo] = useState("");
  const [isEditing, setIsEditing] = useState(savedMemo === "");
  const canSave = memo.trim() !== "";
  const hasContent = savedMemo !== "";

  return (
    <article className="flex items-start gap-2.5 rounded-2xl border border-light-grey bg-offwhite p-3">
      <div className="flex size-25 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-2light-grey">
        <img src={perfume.image} alt="" className="h-18.5 w-auto object-contain" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="truncate text-caption-regular-12 text-grey uppercase">{perfume.brand}</p>
        <h3 className="mt-1 truncate text-body-semibold-16 text-offblack">{perfume.name}</h3>
        <p className="mt-2 text-caption-regular-12 text-subtext">{perfume.status}</p>
        <div className="mt-3 flex h-8.5 w-full items-center gap-2.5 rounded-lg bg-2light-grey p-2">
          {isEditing ? (
            <>
              <input
                className="w-full min-w-0 bg-transparent text-caption-regular-12 text-subtext outline-none"
                onChange={(event) => setMemo(event.target.value)}
                placeholder="간단히 메모를 남겨보세요"
                value={memo}
              />
              {canSave && (
                <button
                  type="button"
                  className="shrink-0 rounded-full bg-offblack px-2.5 py-1 text-xs font-medium text-offwhite"
                  onClick={() => {
                    setSavedMemo(memo);
                    setIsEditing(false);
                  }}
                >
                  저장
                </button>
              )}
            </>
          ) : (
            <>
              <p className="w-full min-w-0 truncate text-caption-regular-12 text-subtext">
                {savedMemo || "간단한 메모"}
              </p>
              {hasContent && (
                <button
                  type="button"
                  className="shrink-0 rounded-full border border-light-grey bg-offwhite px-2.5 py-1 text-xs font-medium text-subtext"
                  onClick={() => {
                    setMemo(savedMemo);
                    setIsEditing(true);
                  }}
                >
                  수정
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default function MyPerfumePage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const toggleFilter = (option) => {
    setSelectedFilters((current) =>
      current.includes(option) ? current.filter((filter) => filter !== option) : [...current, option],
    );
  };

  const brandNamesEn = brandOptions.map((brand) => brand.nameEn);
  const selectedBrandFilters = selectedFilters.filter((filter) => brandNamesEn.includes(filter));
  const filteredPerfumes =
    selectedBrandFilters.length === 0
      ? perfumes
      : perfumes.filter((perfume) => selectedBrandFilters.includes(perfume.brand));

  return (
    <div className="mx-auto min-h-screen w-full max-w-107.5 bg-background pb-26">
      <Header
        variant="detail-back"
        title="내 향수 관리하기"
        onBack={() => navigate("/mypage")}
      />

      <div className="flex flex-col gap-7.5 px-5 pt-6">
        <button
          type="button"
          onClick={() => navigate("/mypage/perfumes/new")}
          className="flex h-10.75 items-center justify-between rounded-lg bg-offblack px-3 text-body-medium-14 text-offwhite"
        >
          <span>새로운 향수 등록하기</span>
          <img src={chevronRightWhite} alt="" className="size-4.5" />
        </button>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-body-regular-14 text-grey">
              이번 주 <span className="text-offblack">5일</span> 기록했어요
            </p>
            <button
              type="button"
              onClick={() => navigate("/mypage/perfumes/record")}
              className="flex items-center gap-1 text-caption-medium-12 text-grey"
            >
              기록하기
              <img src={chevronRightGrey} alt="" className="size-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {weekDays.map((item) => {
              const isRecorded = item.recorded !== false;
              return (
                <div
                  key={item.day}
                  className={`flex h-17 max-w-12.5 flex-1 flex-col items-center justify-center gap-2.5 rounded-full ${
                    isRecorded ? "bg-offblack" : "border border-light-grey bg-offwhite"
                  }`}
                >
                  <span className={`text-caption-medium-12 ${isRecorded ? "text-offwhite" : "text-offblack"}`}>
                    {item.day}
                  </span>
                  <span className={`text-caption-medium-12 ${isRecorded ? "text-offwhite" : "text-offblack"}`}>
                    {item.date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
              {categoryTabs.map((tab) => {
                const isFilterTab = filterTabs.includes(tab);
                const isActive = isFilterTab
                  ? filterOptions[tab].some((option) =>
                      selectedFilters.includes(typeof option === "string" ? option : option.nameEn),
                    )
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

          <div className="flex flex-col gap-4">
            {filteredPerfumes.map((perfume) => (
              <PerfumeRecordCard key={perfume.name} perfume={perfume} />
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 w-full max-w-107.5 -translate-x-1/2 px-5 pb-5">
        <BottomNav active="my" />
      </div>

      {activeFilter && (
        <FilterSheet
          tabs={filterTabs}
          activeTab={activeFilter}
          filterOptions={filterOptions}
          brandTabLabel="브랜드"
          selectedFilters={selectedFilters}
          matchCount={filteredPerfumes.length}
          onSelectTab={setActiveFilter}
          onToggleFilter={toggleFilter}
          onReset={() => setSelectedFilters([])}
          onClose={() => setActiveFilter(null)}
        />
      )}
    </div>
  );
}
