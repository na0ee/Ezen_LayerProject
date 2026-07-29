import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BtnBig, CardInfo, CardSmall, CommunityEnter, Header } from "../components/common";
import { brands } from "../data/brands";
import { allPerfumes } from "../data/perfumeUtils";
import { getCalendarWeeks } from "../utils/calendar";
import { matchesQuery } from "../utils/koreanSearch";
import {
  addPerfumeRecord,
  loadPerfumeRecords,
  toDateKey,
} from "../data/perfumeRecords";
import chevronDown from "../assets/icons/chevron-down.svg";
import diptyque from "../assets/images/mypage/diptyque.png";
import loewe from "../assets/images/mypage/loewe.png";
import matiere from "../assets/images/mypage/matiere.png";
import santamaria from "../assets/images/mypage/santamaria.png";

// perfumeData.js에는 마티에 프리미에르 데이터가 없어 로컬 데이터로 유지하고 실데이터에 병합한다
const matiereBrand = { id: "matiere-premiere", name: "마티에 프리미에르", nameEn: "Matiere Premiere" };
const matierePerfume = {
  id: "local-matiere",
  img: matiere,
  brand: "MATIERE PREMIERE",
  name: "마티에 프리미에르 메탈 라벤더 오 드 퍼퓸 50ml",
  keywords: ["#메탈릭", "#플로럴", "#머스크"],
  perfume: { brandId: "matiere-premiere" },
};

const brandOptions = [...brands, matiereBrand];
const perfumeCatalog = [...allPerfumes, matierePerfume];

// 참고 파일(MyPerfumeRecordPage.tsx)의 레이아웃/기능을 이 프로젝트 컴포넌트·토큰으로 이식
const currentDate = new Date();
const initialYear = currentDate.getFullYear();
const initialMonth = currentDate.getMonth() + 1;
const todayDate = currentDate.getDate();
const weekDayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// 이번 주 기록된 5일(6, 7, 8, 9, 11일)만 캘린더에 표시 — "이번 주 5일 기록했어요"와 동일
const recordedInfoByMonth = {
  "2026-7": {
    6: { brand: "MATIERE PREMIERE", name: "마티에 프리미에르 메탈 라벤더 오 드 퍼퓸", icon: matiere },
    7: { brand: "LOEWE PERFUMES", name: "로에베 아이레 수틸레사 오 드 뚜왈렛", icon: loewe },
    8: { brand: "SANTA MARIA NOVELLA", name: "엔젤 디 피렌체 오드코롱", icon: santamaria },
    9: { brand: "DIPTYQUE", name: "오 데 썽 오 드 뚜왈렛", icon: diptyque },
    11: { brand: "SANTA MARIA NOVELLA", name: "엔젤 디 피렌체 오드코롱", icon: santamaria },
  },
};

const perfumeRecords = [
  {
    brand: "SANTA MARIA NOVELLA",
    brandKo: "산타 마리아 노벨라",
    name: "엔젤 디 피렌체 오드코롱 100ml",
    image: santamaria,
    keywords: ["#알데하이드", "#머스크", "#플로럴"],
  },
  {
    brand: "LOEWE PERFUMES",
    brandKo: "로에베",
    name: "로에베 아이레 수틸레사 오 드 뚜왈렛 50ml",
    image: loewe,
    keywords: ["#페어", "#뮤게", "#자스민"],
  },
  {
    brand: "MATIERE PREMIERE",
    brandKo: "마티에 프리미에르",
    name: "마티에 프리미에르 메탈 라벤더 오 드 퍼퓸 50ml",
    image: matiere,
    keywords: ["#메탈릭", "#플로럴", "#머스크"],
  },
];

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

const defaultSelectedDate = { year: initialYear, month: initialMonth, day: todayDate };

export default function MyPerfumeRecordPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ brand: "", name: "" });
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [selectedDate, setSelectedDate] = useState(defaultSelectedDate);
  const [viewYear, setViewYear] = useState(initialYear);
  const [viewMonth, setViewMonth] = useState(initialMonth);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [errors, setErrors] = useState({});
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [isDraftSavedOpen, setIsDraftSavedOpen] = useState(false);
  const [selectedInfoDay, setSelectedInfoDay] = useState(null);
  const [savedRecords, setSavedRecords] = useState(loadPerfumeRecords);
  const brandDropdownRef = useRef(null);
  const nameDropdownRef = useRef(null);

  const monthLabel = `${viewYear}년 ${viewMonth}월`;
  const calendarWeeks = getCalendarWeeks(viewYear, viewMonth);
  const demoRecordedInfo =
    recordedInfoByMonth[`${viewYear}-${viewMonth}`] ?? {};
  const recordedInfo = Object.entries(demoRecordedInfo).reduce(
    (result, [day, info]) => ({ ...result, [day]: [info] }),
    {},
  );
  savedRecords
    .filter(
      (record) =>
        record.date.startsWith(
          `${viewYear}-${String(viewMonth).padStart(2, "0")}-`,
        ),
    )
    .forEach((record) => {
      const day = Number(record.date.slice(-2));
      recordedInfo[day] = [...(recordedInfo[day] ?? []), record];
    });
  const isCurrentViewMonth = viewYear === initialYear && viewMonth === initialMonth;
  const today = new Date(initialYear, initialMonth - 1, todayDate);

  // 이미 선택되어 입력값이 옵션과 정확히 일치하면(재클릭 시) 필터링하지 않고 전체 목록을 보여준다
  const isBrandExactMatch = brandOptions.some((brand) => brand.name === formData.brand);
  const brandDropdownOptions = brandOptions.filter(
    (brand) =>
      isBrandExactMatch || matchesQuery(brand.name, formData.brand) || matchesQuery(brand.nameEn, formData.brand),
  );

  const brandPerfumes = selectedBrandId
    ? perfumeCatalog.filter((item) => item.perfume.brandId === selectedBrandId)
    : perfumeCatalog;
  const isNameExactMatch = brandPerfumes.some((item) => item.name === formData.name);
  const nameDropdownOptions = brandPerfumes.filter(
    (item) => isNameExactMatch || matchesQuery(item.name, formData.name),
  );

  const handleDateSelect = (day) => {
    const clickedDate = new Date(viewYear, viewMonth - 1, day);
    if (clickedDate > today) {
      setErrors((current) => ({ ...current, date: "오늘 이후 날짜는 선택할 수 없어요" }));
      return;
    }
    setErrors((current) => ({ ...current, date: undefined }));
    setSelectedInfoDay(null);
    setSelectedDate((current) =>
      current?.year === viewYear && current?.month === viewMonth && current?.day === day
        ? null
        : { year: viewYear, month: viewMonth, day },
    );
  };

  const handleBottleDayClick = (day) => {
    setErrors((current) => ({ ...current, date: undefined }));
    setSelectedInfoDay((current) => (current === day ? null : day));
  };

  const goToPrevMonth = () => {
    setViewYear((year) => (viewMonth === 1 ? year - 1 : year));
    setViewMonth((month) => (month === 1 ? 12 : month - 1));
  };

  const goToNextMonth = () => {
    setViewYear((year) => (viewMonth === 12 ? year + 1 : year));
    setViewMonth((month) => (month === 12 ? 1 : month + 1));
  };

  const handleBrandSelect = (brand) => {
    setFormData({ ...formData, brand: brand.name, name: "" });
    setSelectedBrandId(brand.id);
    setOpenDropdown(null);
    setErrors((current) => ({ ...current, brand: undefined }));
  };

  const handleSaveDraft = () => {
    const draft = { formData, selectedDate };
    sessionStorage.setItem("myPerfumeRecordDraft", JSON.stringify(draft));
    setIsDraftSavedOpen(true);
  };

  // "내 향수" 카드 클릭 시(perfumeRecords 항목: brandKo 포함)
  const handleSelectPerfume = (perfume) => {
    const brandInfo = brandOptions.find((brand) => brand.nameEn.toUpperCase() === perfume.brand);
    setFormData({ brand: perfume.brandKo, name: perfume.name });
    setSelectedBrandId(brandInfo?.id ?? "");
    setOpenDropdown(null);
    setErrors((current) => ({ ...current, brand: undefined, name: undefined }));
  };

  // 향수명 드롭다운 검색 결과 선택 시(perfumeCatalog 항목: perfume.brandId 포함)
  const handleNameSelect = (item) => {
    const brandInfo = brandOptions.find((brand) => brand.id === item.perfume.brandId);
    setFormData({ brand: brandInfo?.name ?? formData.brand, name: item.name });
    setSelectedBrandId(item.perfume.brandId);
    setOpenDropdown(null);
    setErrors((current) => ({ ...current, brand: undefined, name: undefined }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.brand.trim()) newErrors.brand = "브랜드를 선택해주세요";
    if (!formData.name.trim()) newErrors.name = "향수명을 선택해주세요";
    if (!selectedDate) newErrors.date = "날짜를 선택해주세요";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    const catalogItem = perfumeCatalog.find(
      (item) => item.name === formData.name,
    );
    const myPerfumeItem = perfumeRecords.find(
      (item) => item.name === formData.name,
    );
    const nextRecords = addPerfumeRecord({
      date: toDateKey(selectedDate),
      brand: catalogItem?.brand ?? myPerfumeItem?.brand ?? formData.brand,
      name: formData.name,
      icon: catalogItem?.img ?? myPerfumeItem?.image ?? "",
    });
    setSavedRecords(nextRecords);
    setIsCompleteOpen(true);
  };

  const handleCompleteClose = () => {
    setIsCompleteOpen(false);
    navigate("/mypage/perfumes");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownRefs = [brandDropdownRef, nameDropdownRef];
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
        title="향수 기록하기"
        saveLabel="임시저장"
        onClose={() => navigate("/mypage/perfumes")}
        onSave={handleSaveDraft}
      />

      <div className="flex flex-col gap-15 px-5 pt-6">
        <section className="rounded-2xl border border-light-grey bg-offwhite p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-body-semibold-16 text-offblack">{monthLabel}</h2>
            <div className="flex gap-6">
              <button type="button" onClick={goToPrevMonth} className="flex size-7.5 items-center justify-center">
                <img src={chevronDown} alt="이전 달" className="size-5 rotate-180" />
              </button>
              <button type="button" onClick={goToNextMonth} className="flex size-7.5 items-center justify-center">
                <img src={chevronDown} alt="다음 달" className="size-5" />
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-7">
            {weekDayLabels.map((day) => (
              <div key={day} className="flex flex-col items-center">
                <span className="text-caption-medium-12 text-offblack">{day}</span>
              </div>
            ))}
          </div>

          {calendarWeeks.map((week, weekIndex) => (
            <div className="mt-2 grid grid-cols-7" key={weekIndex}>
              {week.map((day, dayIndex) => {
                if (day == null) return <div key={dayIndex} />;

                const info = recordedInfo[day];
                const isToday = isCurrentViewMonth && day === todayDate;
                const isSelected =
                  selectedDate?.year === viewYear && selectedDate?.month === viewMonth && selectedDate?.day === day;

                return (
                  <button
                    className="flex flex-col items-center"
                    key={dayIndex}
                    onClick={() => {
                      if (info) handleBottleDayClick(day);
                      else handleDateSelect(day);
                    }}
                    type="button"
                  >
                    <div
                      className={`flex size-10 items-center justify-center rounded-full ${
                        isSelected ? "bg-point-orange" : info ? "bg-offblack" : ""
                      }`}
                    >
                      <span
                        className={`text-caption-medium-12 ${
                          isSelected || info
                            ? "font-semibold text-offwhite"
                            : isToday
                              ? "font-semibold text-point-orange"
                              : "text-offblack"
                        }`}
                      >
                        {day}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
          {errors.date && <p className="mt-3 text-caption-medium-12 text-point-orange">{errors.date}</p>}

          {selectedInfoDay && recordedInfo[selectedInfoDay] && (
            <div className="mt-4 flex flex-col gap-2">
              {recordedInfo[selectedInfoDay].map((record, index) => (
                <CardSmall
                  key={record.id ?? `${selectedInfoDay}-${index}`}
                  variant="medium-b"
                  img={record.icon}
                  brand={record.brand}
                  name={record.name}
                />
              ))}
            </div>
          )}
        </section>

        <section className="flex flex-col gap-7.5">
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
                setErrors((current) => ({ ...current, brand: undefined }));
                setOpenDropdown("brand");
              }}
              onClick={() => setOpenDropdown(openDropdown === "brand" ? null : "brand")}
            />
            {openDropdown === "brand" && (
              <div className="absolute top-full right-0 left-0 z-10 mt-1 max-h-50 overflow-y-auto rounded-lg border border-light-grey bg-offwhite shadow-lg">
                {brandDropdownOptions.length > 0 ? (
                  brandDropdownOptions.map((brand) => (
                    <button
                      key={brand.id}
                      type="button"
                      className="flex w-full flex-col gap-1.5 px-4 py-2.5 text-left hover:bg-2light-grey"
                      onMouseDown={(event) => {
                        event.stopPropagation();
                        handleBrandSelect(brand);
                      }}
                    >
                      <span className="text-body-regular-14 text-offblack">{brand.name}</span>
                      <span className="text-caption-medium-12 text-grey uppercase">{brand.nameEn}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-2.5 text-body-regular-14 text-grey">검색 결과가 없어요</div>
                )}
              </div>
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
                setFormData({ ...formData, name: event.target.value });
                setErrors((current) => ({ ...current, name: undefined }));
                setOpenDropdown("name");
              }}
              onClick={() => setOpenDropdown(openDropdown === "name" ? null : "name")}
            />
            {openDropdown === "name" && (
              <div className="absolute top-full right-0 left-0 z-10 mt-1 max-h-50 overflow-y-auto rounded-lg border border-light-grey bg-offwhite shadow-lg">
                {nameDropdownOptions.length > 0 ? (
                  nameDropdownOptions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="w-full px-4 py-2.5 text-left text-body-regular-14 text-offblack hover:bg-2light-grey"
                      onMouseDown={(event) => {
                        event.stopPropagation();
                        handleNameSelect(item);
                      }}
                    >
                      {item.name}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-2.5 text-body-regular-14 text-grey">검색 결과가 없어요</div>
                )}
              </div>
            )}
            {errors.name && <p className="mt-1.5 text-caption-medium-12 text-point-orange">{errors.name}</p>}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <label className="text-body-semibold-16 text-offblack">내 향수</label>
          {perfumeRecords.map((perfume) => (
            <CardInfo
              key={perfume.name}
              variant="perfume"
              type="c"
              img={perfume.image}
              brand={perfume.brand}
              name={perfume.name}
              keywords={perfume.keywords}
              onClick={() => handleSelectPerfume(perfume)}
            />
          ))}
        </section>
      </div>

      <div className="fixed bottom-8 left-1/2 w-full max-w-107.5 -translate-x-1/2 px-5">
        <BtnBig onClick={handleSubmit}>향수 기록하기</BtnBig>
      </div>

      {isCompleteOpen && (
        <CompleteModal title="향수 기록 완료" description="향수 사용이 기록되었어요." onClose={handleCompleteClose} />
      )}
      {isDraftSavedOpen && (
        <CompleteModal
          title="임시저장 완료"
          description="향수 기록 정보가 임시저장되었어요."
          onClose={() => setIsDraftSavedOpen(false)}
        />
      )}
    </div>
  );
}
