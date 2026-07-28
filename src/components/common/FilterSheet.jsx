import { useState } from "react";
import CheckBox from "./CheckBox";
import HashTag from "./HashTag";
import Category from "./Category";
import Search from "./Search";

// 참고 파일의 브랜드/향계열향기/용량 필터 바텀시트를 이 프로젝트 컴포넌트로 이식
// (피그마 3059:30058, 3135:25210 기준: Category/CheckBox/Search/HashTag 재사용)
export default function FilterSheet({
  tabs,
  activeTab,
  filterOptions,
  brandTabLabel,
  selectedFilters,
  matchCount,
  onSelectTab,
  onToggleFilter,
  onReset,
  onClose,
}) {
  const [brandSearch, setBrandSearch] = useState("");
  const isBrandTab = activeTab === brandTabLabel;
  const options = filterOptions[activeTab] ?? [];
  const visibleOptions = isBrandTab
    ? options.filter(
        (option) =>
          option.name.toLowerCase().includes(brandSearch.toLowerCase()) ||
          option.nameEn.toLowerCase().includes(brandSearch.toLowerCase()),
      )
    : options;

  return (
    <div className="fixed inset-0 z-[60] flex justify-center bg-offblack/40">
      <button aria-label="필터 닫기" className="absolute inset-0" onClick={onClose} type="button" />
      <section className="absolute bottom-0 left-1/2 flex h-[546px] w-full max-w-[430px] -translate-x-1/2 flex-col overflow-hidden rounded-t-2xl bg-background">
        <div className="mx-auto mt-3 h-1 w-8 shrink-0 rounded-full bg-light-grey" />

        <Category variant="page" items={tabs} active={activeTab} onChange={onSelectTab} />

        <div className="no-scrollbar flex-1 overflow-y-auto pb-[159px]">
          {isBrandTab ? (
            <>
              <div className="px-5 pt-[30px]">
                <Search
                  variant="no-icon"
                  value={brandSearch}
                  onChange={(event) => setBrandSearch(event.target.value)}
                />
              </div>
              <div className="flex flex-col gap-4 px-5 pt-[30px]">
                {visibleOptions.map((option) => {
                  const selected = selectedFilters.includes(option.nameEn);
                  return (
                    <div key={option.nameEn} className="flex w-full items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="text-body-regular-14 text-offblack">{option.name}</p>
                        <p className="text-[10px] tracking-[-0.02em] text-grey">{option.nameEn}</p>
                      </div>
                      <CheckBox
                        variant={selected ? "orange" : "white"}
                        onClick={() => onToggleFilter(option.nameEn)}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 px-5 pt-[30px]">
              {visibleOptions.map((option) => {
                const selected = selectedFilters.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => onToggleFilter(option)}
                    className="flex items-center gap-3 text-left"
                  >
                    <CheckBox variant={selected ? "orange" : "white"} className="pointer-events-none" />
                    <span className={`text-body-regular-14 ${selected ? "text-offblack" : "text-grey"}`}>
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 flex w-full flex-col gap-4 border-t border-light-grey bg-offwhite px-5 pt-4 pb-[30px]">
          {selectedFilters.length > 0 && (
            <div className="no-scrollbar flex gap-3 overflow-x-auto">
              {selectedFilters.map((filter) => (
                <HashTag key={filter} onRemove={() => onToggleFilter(filter)} className="shrink-0">
                  {filter}
                </HashTag>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onReset}
              className="h-14 w-[134px] shrink-0 rounded-full border border-light-grey bg-offwhite text-body-semibold-16 text-offblack"
            >
              초기화
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-14 flex-1 rounded-full bg-offblack text-body-semibold-16 text-offwhite"
            >
              {matchCount}개의 상품 보기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
