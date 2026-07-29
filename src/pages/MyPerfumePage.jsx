import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav, Header } from "../components/common";
import FilterSheet from "../components/common/FilterSheet";
import chevronDown from "../assets/icons/chevron-down.svg";
import chevronRightGrey from "../assets/icons/chevron-right-grey.svg";
import chevronRightWhite from "../assets/icons/chevron-right-white.svg";
import { allPerfumes } from "../data/perfumeUtils";
import { brands } from "../data/brands";
import {
  loadPerfumeRecords,
  toDateKey,
} from "../data/perfumeRecords";

// 참고 파일(MyPerfumePage.tsx)의 레이아웃/기능을 이 프로젝트 컴포넌트·토큰으로 이식
const filterTabs = ["브랜드", "향 계열/향기"];
const categoryTabs = ["전체", ...filterTabs];

const managedPerfumeIds = [27, 46, 32];
const managedPerfumeCards = managedPerfumeIds
  .map((id) => allPerfumes.find((perfume) => perfume.id === id))
  .filter(Boolean);

const managedBrandIds = new Set(
  managedPerfumeCards.map((perfume) => perfume.perfume.brandId),
);
const brandOptions = brands
  .filter((brand) => managedBrandIds.has(brand.id))
  .map((brand) => ({ name: brand.name, nameEn: brand.nameEn.toUpperCase() }));
const fragranceOptions = [
  ...new Set(managedPerfumeCards.flatMap((perfume) => perfume.keywords)),
];

const filterOptions = {
  브랜드: brandOptions,
  "향 계열/향기": fragranceOptions,
};

const weekDayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const perfumeMeta = {
  27: { status: "2일 전 사용", savedMemo: "비싼값하는듯 굿" },
  46: { status: "3일 전 사용", savedMemo: "" },
  32: { status: "3일 전 사용", savedMemo: "" },
};

const perfumes = managedPerfumeCards.map((perfume) => ({
  id: perfume.id,
  brand: perfume.brand,
  brandId: perfume.perfume.brandId,
  name: perfume.name,
  familyLabels: perfume.keywords,
  image: perfume.img,
  ...perfumeMeta[perfume.id],
}));

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
  const recordedDateKeys = new Set(
    loadPerfumeRecords().map((record) => record.date),
  );
  const now = new Date();
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  const weekDays = weekDayLabels.map((day, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return {
      day,
      date: String(date.getDate()),
      recorded: recordedDateKeys.has(
        toDateKey({
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
        }),
      ),
    };
  });
  const recordedDaysThisWeek = weekDays.filter((day) => day.recorded).length;

  const toggleFilter = (option) => {
    setSelectedFilters((current) =>
      current.includes(option) ? current.filter((filter) => filter !== option) : [...current, option],
    );
  };

  const brandNamesEn = brandOptions.map((brand) => brand.nameEn);
  const selectedBrandFilters = selectedFilters.filter((filter) => brandNamesEn.includes(filter));
  const selectedFamilyFilters = selectedFilters.filter((filter) =>
    fragranceOptions.includes(filter),
  );
  const filteredPerfumes = perfumes.filter(
    (perfume) =>
      (selectedBrandFilters.length === 0 ||
        selectedBrandFilters.includes(perfume.brand)) &&
      (selectedFamilyFilters.length === 0 ||
        selectedFamilyFilters.some((family) =>
          perfume.familyLabels.includes(family),
        )),
  );

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
              이번 주 <span className="text-offblack">{recordedDaysThisWeek}일</span> 기록했어요
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
              const isRecorded = item.recorded;
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
