import chevronDown from "../../assets/icons/chevron-down.svg";

// 피그마: community-enter (속성 1=title | brand | ml | txt) — 글작성 폼 필드
// title/txt: 실제 입력 필드(글자수 카운터 포함), brand/ml: 선택형(onClick으로 시트/드롭다운 연결)
const DEFAULTS = {
  title: { label: "제목", maxLength: 40 },
  brand: { label: "브랜드", placeholder: "브랜드명을 입력해주세요", required: true },
  ml: { label: "용량", placeholder: "용량을 입력해주세요" },
  txt: { label: "본문", maxLength: 200 },
};

export default function CommunityEnter({
  variant = "title",
  label,
  required,
  placeholder,
  value = "",
  onChange,
  maxLength,
  onClick,
  editable = false,
  className = "",
}) {
  const d = DEFAULTS[variant];
  const finalLabel = label ?? d.label;
  const finalRequired = required ?? d.required ?? false;
  const finalPlaceholder = placeholder ?? d.placeholder;
  // maxLength={null}을 넘기면 글자수 카운터를 숨긴다 (프로필 닉네임 필드처럼 제한 없는 경우)
  const finalMax = maxLength === undefined ? d.maxLength : maxLength;
  const isSelect = variant === "brand" || variant === "ml";

  return (
    <div className={`flex w-full flex-col gap-4 ${className}`}>
      <p className="text-body-semibold-16 text-offblack">
        {finalLabel}
        {finalRequired && <span className="text-point-orange"> *</span>}
      </p>

      {isSelect ? (
        editable ? (
          <div className="flex w-full items-center justify-between gap-2 rounded-lg border border-light-grey bg-offwhite p-4">
            <input
              type="text"
              value={value}
              onChange={onChange}
              onFocus={onClick}
              placeholder={finalPlaceholder}
              className="w-full bg-transparent text-body-regular-14 text-offblack outline-none placeholder:text-subtext"
            />
            <button type="button" onClick={onClick} className="shrink-0">
              <img src={chevronDown} alt="" className="size-4.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onClick}
            className="flex w-full items-center justify-between rounded-lg border border-light-grey bg-offwhite p-4"
          >
            <span
              className={`text-body-regular-14 ${value ? "text-offblack" : "text-subtext"}`}
            >
              {value || finalPlaceholder}
            </span>
            <img src={chevronDown} alt="" className="size-4.5" />
          </button>
        )
      ) : (
        <div className="flex w-full flex-col items-end gap-1.5">
          {variant === "txt" ? (
            <textarea
              value={value}
              onChange={onChange}
              maxLength={finalMax}
              placeholder={finalPlaceholder}
              rows={4}
              className="w-full resize-none rounded-lg border border-light-grey bg-offwhite p-4 text-body-regular-14 text-offblack outline-none placeholder:text-subtext"
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={onChange}
              maxLength={finalMax}
              placeholder={finalPlaceholder}
              className="w-full rounded-lg border border-light-grey bg-offwhite p-4 text-body-regular-14 text-offblack outline-none placeholder:text-subtext"
            />
          )}
          {finalMax != null && (
            <p className="text-caption-regular-12 text-grey">
              {value.length}/{finalMax}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
