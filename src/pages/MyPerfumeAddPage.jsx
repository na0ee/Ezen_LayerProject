import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BtnBig, Category, CommunityEnter, Header } from "../components/common";
import { brands } from "../data/brands";
import { fragranceFamilies as fragranceFamilyData } from "../data/fragranceFamilies";
import { allPerfumes, familyLabels } from "../data/perfumeUtils";
import { getCalendarWeeks } from "../utils/calendar";
import { matchesQuery } from "../utils/koreanSearch";
import chevronDown from "../assets/icons/chevron-down.svg";

// 참고 파일(MyPerfumeAddPage.tsx)의 레이아웃/기능을 이 프로젝트 컴포넌트·토큰으로 이식
// 브랜드/향수명/향 계열 데이터는 src/data/perfumeData.js(+brands.js, fragranceFamilies.js)에서 불러온다
const brandOptions = brands;
const perfumeCatalog = allPerfumes;

const volumes = ["30ml", "50ml", "100ml", "150ml", "200ml", "300ml"];
const fragranceFamilies = fragranceFamilyData.map((family) => family.name);
const weekDayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const formatDisplayDate = (iso) => (iso ? iso.replaceAll("-", ".") : "");

function MonthCalendarDropdown({ value, onSelect }) {
  const base = value ? new Date(value) : new Date();
  const [viewYear, setViewYear] = useState(base.getFullYear());
  const [viewMonth, setViewMonth] = useState(base.getMonth() + 1);
  const weeks = getCalendarWeeks(viewYear, viewMonth);
  const selected = value ? new Date(value) : null;

  const goToPrevMonth = () => {
    setViewYear((year) => (viewMonth === 1 ? year - 1 : year));
    setViewMonth((month) => (month === 1 ? 12 : month - 1));
  };
  const goToNextMonth = () => {
    setViewYear((year) => (viewMonth === 12 ? year + 1 : year));
    setViewMonth((month) => (month === 12 ? 1 : month + 1));
  };

  return (
    <div className="absolute top-full right-0 left-0 z-10 mt-1 rounded-lg border border-light-grey bg-offwhite p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-body-semibold-16 text-offblack">
          {viewYear}년 {viewMonth}월
        </span>
        <div className="flex gap-4">
          <button
            type="button"
            onMouseDown={(event) => {
              event.stopPropagation();
              goToPrevMonth();
            }}
            className="flex size-6 items-center justify-center"
          >
            <img src={chevronDown} alt="이전 달" className="size-4 rotate-180" />
          </button>
          <button
            type="button"
            onMouseDown={(event) => {
              event.stopPropagation();
              goToNextMonth();
            }}
            className="flex size-6 items-center justify-center"
          >
            <img src={chevronDown} alt="다음 달" className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-7">
        {weekDayLabels.map((day) => (
          <div key={day} className="flex items-center justify-center text-caption-medium-12 text-grey">
            {day}
          </div>
        ))}
      </div>

      {weeks.map((week, weekIndex) => (
        <div className="mt-1 grid grid-cols-7" key={weekIndex}>
          {week.map((day, dayIndex) => {
            if (day == null) return <div key={dayIndex} />;
            const isSelected =
              selected &&
              selected.getFullYear() === viewYear &&
              selected.getMonth() + 1 === viewMonth &&
              selected.getDate() === day;

            return (
              <button
                key={dayIndex}
                type="button"
                onMouseDown={(event) => {
                  event.stopPropagation();
                  const iso = `${viewYear}-${String(viewMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  onSelect(iso);
                }}
                className="flex items-center justify-center py-1"
              >
                <span
                  className={`flex size-8 items-center justify-center rounded-full text-caption-medium-12 ${
                    isSelected ? "bg-point-orange font-semibold text-offwhite" : "text-offblack"
                  }`}
                >
                  {day}
                </span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function CompleteModal({ title, description, onClose }) {
  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center bg-offblack/35 px-10" onClick={onClose}>
      <section
        className="w-full max-w-80 rounded-[20px] bg-offwhite px-6 py-7 text-center shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-title-medium-20 text-offblack">{title}</h2>
        <p className="mt-3 text-body-regular-14 text-grey">{description}</p>
        <button
          className="mt-6 h-12 w-full rounded-4xl bg-offblack text-body-semibold-16 text-offwhite"
          onClick={onClose}
          type="button"
        >
          확인
        </button>
      </section>
    </div>
  );
}

function SelectDropdownList({ options, onSelect, renderOption, emptyLabel = "선택 항목 없음" }) {
  return (
    <div className="absolute top-full right-0 left-0 z-10 mt-1 max-h-50 overflow-y-auto rounded-lg border border-light-grey bg-offwhite shadow-lg">
      {options.length > 0 ? (
        options.map((option) => (
          <button
            key={option.key}
            type="button"
            className="flex w-full flex-col gap-1.5 px-4 py-2.5 text-left hover:bg-2light-grey"
            onMouseDown={(event) => {
              event.stopPropagation();
              onSelect(option);
            }}
          >
            {renderOption(option)}
          </button>
        ))
      ) : (
        <div className="px-4 py-2.5 text-body-regular-14 text-grey">{emptyLabel}</div>
      )}
    </div>
  );
}

export default function MyPerfumeAddPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ brand: "", name: "", memo: "" });
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [selectedFragrances, setSelectedFragrances] = useState([]);
  const [selectedVolume, setSelectedVolume] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [errors, setErrors] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [isDraftSavedOpen, setIsDraftSavedOpen] = useState(false);
  const brandDropdownRef = useRef(null);
  const nameDropdownRef = useRef(null);
  const volumeDropdownRef = useRef(null);
  const openDateDropdownRef = useRef(null);
  const expiryDateDropdownRef = useRef(null);

  // 이미 선택되어 입력값이 옵션과 정확히 일치하면(재클릭 시) 필터링하지 않고 전체 목록을 보여준다
  const isBrandExactMatch = brandOptions.some((brand) => brand.name === formData.brand);
  const brandDropdownOptions = brandOptions
    .filter(
      (brand) =>
        isBrandExactMatch ||
        matchesQuery(brand.name, formData.brand) ||
        matchesQuery(brand.nameEn, formData.brand),
    )
    .map((brand) => ({ key: brand.id, ...brand }));

  const brandPerfumes = selectedBrandId
    ? perfumeCatalog.filter((item) => item.perfume.brandId === selectedBrandId)
    : perfumeCatalog;
  const isNameExactMatch = brandPerfumes.some((item) => item.name === formData.name);
  const nameDropdownOptions = brandPerfumes
    .filter((item) => isNameExactMatch || matchesQuery(item.name, formData.name))
    .map((item) => ({ key: item.id, ...item }));

  const handleBrandSelect = (brand) => {
    setFormData({ ...formData, brand: brand.name, name: "" });
    setSelectedBrandId(brand.id);
    setSelectedFragrances([]);
    setOpenDropdown(null);
    setErrors({ ...errors, brand: undefined, name: undefined });
  };

  const handleNameSelect = (item) => {
    const brandInfo = brandOptions.find((brand) => brand.id === item.perfume.brandId);
    setFormData({ ...formData, name: item.name, brand: brandInfo?.name ?? formData.brand });
    setSelectedBrandId(item.perfume.brandId);
    setSelectedFragrances(familyLabels(item.perfume.familyIds));
    setOpenDropdown(null);
    setErrors({ ...errors, name: undefined });
  };

  const toggleFragrance = (family) => {
    setSelectedFragrances((current) =>
      current.includes(family) ? current.filter((item) => item !== family) : [...current, family],
    );
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.brand.trim()) newErrors.brand = "브랜드를 선택해주세요";
    if (!formData.name.trim()) newErrors.name = "향수명을 선택해주세요";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsCompleteOpen(true);
  };

  const handleSaveDraft = () => {
    const draft = { formData, selectedBrandId, selectedFragrances, selectedVolume, openDate, expiryDate };
    sessionStorage.setItem("myPerfumeAddDraft", JSON.stringify(draft));
    setIsDraftSavedOpen(true);
  };

  const handleCompleteClose = () => {
    setIsCompleteOpen(false);
    navigate("/mypage/perfumes");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownRefs = [
        brandDropdownRef,
        nameDropdownRef,
        volumeDropdownRef,
        openDateDropdownRef,
        expiryDateDropdownRef,
      ];
      const isInsideAny = dropdownRefs.some((ref) => ref.current?.contains(event.target));
      if (!isInsideAny) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mx-auto min-h-screen w-full max-w-107.5 bg-background pb-33">
      <Header
        variant="write-tit"
        title="향수 등록하기"
        saveLabel="임시저장"
        onClose={() => navigate("/mypage/perfumes")}
        onSave={handleSaveDraft}
      />

      <div className="flex flex-col gap-7.5 px-5 pt-6">
        <div className="relative" ref={brandDropdownRef}>
          <CommunityEnter
            variant="brand"
            editable
            value={formData.brand}
            onChange={(event) => {
              const brandName = event.target.value;
              const matched = brandOptions.find((brand) => brand.name === brandName);
              setFormData({ ...formData, brand: brandName });
              setSelectedBrandId(matched ? matched.id : "");
              setErrors({ ...errors, brand: undefined });
              setOpenDropdown("brand");
            }}
            onClick={() => setOpenDropdown(openDropdown === "brand" ? null : "brand")}
          />
          {openDropdown === "brand" && (
            <SelectDropdownList
              options={brandDropdownOptions}
              onSelect={handleBrandSelect}
              renderOption={(brand) => (
                <>
                  <span className="text-body-regular-14 text-offblack">{brand.name}</span>
                  <span className="text-caption-medium-12 text-grey uppercase">{brand.nameEn}</span>
                </>
              )}
            />
          )}
          {errors.brand && <p className="mt-1.5 text-caption-medium-12 text-point-orange">{errors.brand}</p>}
        </div>

        <div className="relative" ref={nameDropdownRef}>
          <CommunityEnter
            variant="brand"
            editable
            label="향수명"
            placeholder="향수명을 입력해주세요"
            value={formData.name}
            onChange={(event) => {
              const nameValue = event.target.value;
              const stillMatchesSelection = perfumeCatalog.some((item) => item.name === nameValue);
              setFormData({ ...formData, name: nameValue });
              if (!stillMatchesSelection) setSelectedFragrances([]);
              setErrors({ ...errors, name: undefined });
              setOpenDropdown("name");
            }}
            onClick={() => setOpenDropdown(openDropdown === "name" ? null : "name")}
          />
          {openDropdown === "name" && (
            <SelectDropdownList
              options={nameDropdownOptions}
              onSelect={handleNameSelect}
              renderOption={(perfume) => <span className="text-body-regular-14 text-offblack">{perfume.name}</span>}
            />
          )}
          {errors.name && <p className="mt-1.5 text-caption-medium-12 text-point-orange">{errors.name}</p>}
        </div>

        <div className="relative" ref={volumeDropdownRef}>
          <CommunityEnter
            variant="ml"
            value={selectedVolume}
            onClick={() => setOpenDropdown(openDropdown === "volume" ? null : "volume")}
          />
          {openDropdown === "volume" && (
            <SelectDropdownList
              options={volumes.map((volume) => ({ key: volume, volume }))}
              onSelect={(option) => {
                setSelectedVolume(option.volume === selectedVolume ? "" : option.volume);
                setOpenDropdown(null);
              }}
              renderOption={(option) => <span className="text-body-regular-14 text-offblack">{option.volume}</span>}
            />
          )}
        </div>

        <section className="flex flex-col gap-4">
          <label className="text-body-semibold-16 text-offblack">향 계열/향기</label>
          <Category
            variant="tab"
            items={fragranceFamilies}
            active={selectedFragrances}
            onChange={toggleFragrance}
            className="flex-wrap"
          />
        </section>

        <div className="relative" ref={openDateDropdownRef}>
          <CommunityEnter
            variant="brand"
            required={false}
            label="개봉일"
            placeholder="개봉일을 선택해주세요"
            value={formatDisplayDate(openDate)}
            onClick={() => setOpenDropdown(openDropdown === "openDate" ? null : "openDate")}
          />
          {openDropdown === "openDate" && (
            <MonthCalendarDropdown
              value={openDate}
              onSelect={(iso) => {
                setOpenDate(iso);
                setOpenDropdown(null);
              }}
            />
          )}
        </div>

        <div className="relative" ref={expiryDateDropdownRef}>
          <CommunityEnter
            variant="brand"
            required={false}
            label="유통기한"
            placeholder="유통기한을 선택해주세요"
            value={formatDisplayDate(expiryDate)}
            onClick={() => setOpenDropdown(openDropdown === "expiryDate" ? null : "expiryDate")}
          />
          {openDropdown === "expiryDate" && (
            <MonthCalendarDropdown
              value={expiryDate}
              onSelect={(iso) => {
                setExpiryDate(iso);
                setOpenDropdown(null);
              }}
            />
          )}
        </div>

        <CommunityEnter
          variant="txt"
          label="메모"
          placeholder="향수에 대한 메모를 남겨보세요 (40자 이내)"
          maxLength={40}
          value={formData.memo}
          onChange={(event) => setFormData({ ...formData, memo: event.target.value })}
        />
      </div>

      <div className="fixed bottom-8 left-1/2 w-full max-w-107.5 -translate-x-1/2 px-5">
        <BtnBig onClick={handleSubmit}>향수 추가하기</BtnBig>
      </div>

      {isCompleteOpen && (
        <CompleteModal title="향수 추가 완료" description="향수가 추가되었어요." onClose={handleCompleteClose} />
      )}
      {isDraftSavedOpen && (
        <CompleteModal
          title="임시저장 완료"
          description="향수 정보가 임시저장되었어요."
          onClose={() => setIsDraftSavedOpen(false)}
        />
      )}
    </div>
  );
}
