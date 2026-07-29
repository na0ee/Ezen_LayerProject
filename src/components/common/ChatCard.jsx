import clockIcon from "../../assets/icons/clock.svg";
import globeIcon from "../../assets/icons/globe.svg";
import mapPinIcon from "../../assets/icons/map-pin.svg";
import phoneIcon from "../../assets/icons/phone.svg";
import BtnSmall from "./BtnSmall";
import KeywordList from "./KeywordList";

// 피그마: card (3135:18607, 속성 1=shop | chatbot) — 챗봇 답변용 카드.
// 다른 card 프레임들과 이름이 겹쳐 ChatCard로 등록
function InfoRow({ icon, children }) {
  return (
    <div className="flex w-full items-center gap-2">
      <img src={icon} alt="" className="size-4 shrink-0" />
      <p className="min-w-0 flex-1 text-body-medium-14 text-subtext">{children}</p>
    </div>
  );
}

export default function ChatCard({
  variant = "shop",
  name,
  brand,
  images = [],
  img,
  address,
  hours,
  phone,
  website,
  keywords = [],
  actionLabel,
  onAction,
  className = "",
}) {
  if (variant === "chatbot") {
    return (
      <div
        className={`flex w-full max-w-79.5 min-w-0 items-center gap-3 overflow-hidden rounded-2xl border border-light-grey bg-offwhite p-3 ${className}`}
      >
        <div className="size-[clamp(72px,23.25vw,100px)] shrink-0 overflow-hidden rounded-lg bg-2light-grey">
          {img && (
            <img
              src={img}
              alt={name}
              className="size-full object-contain p-2"
            />
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-end gap-2 self-stretch">
          <div className="flex w-full flex-col gap-1.5">
            <div className="flex flex-col gap-1">
              <p className="truncate text-caption-regular-12 text-grey">{brand}</p>
              <p className="truncate text-body-semibold-16 text-offblack">{name}</p>
            </div>
            <KeywordList variant="grey" keywords={keywords} />
          </div>
          <BtnSmall onClick={onAction}>{actionLabel ?? "향수 보기"}</BtnSmall>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex w-full max-w-79.5 min-w-0 flex-col items-end gap-4 overflow-hidden rounded-2xl border border-light-grey bg-offwhite p-4 ${className}`}
    >
      {images.length > 0 && (
        <div className="no-scrollbar flex w-full gap-4 overflow-x-auto">
          {images.map((src, i) => (
            <div
              key={i}
              className="aspect-[25/19] w-[min(250px,100%)] shrink-0 overflow-hidden rounded-lg bg-2light-grey"
            >
              <img src={src} alt="" className="size-full object-cover" />
            </div>
          ))}
        </div>
      )}
      <div className="flex w-full flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-end gap-1">
            <p className="text-title-semibold-18 text-offblack">{name}</p>
            <p className="truncate text-caption-medium-12 text-grey">{brand}</p>
          </div>
          <div className="h-px w-full bg-light-grey" />
        </div>
        <div className="flex flex-col gap-2">
          {address && <InfoRow icon={mapPinIcon}>{address}</InfoRow>}
          {hours && <InfoRow icon={clockIcon}>{hours}</InfoRow>}
          {phone && <InfoRow icon={phoneIcon}>{phone}</InfoRow>}
          {website && <InfoRow icon={globeIcon}>{website}</InfoRow>}
        </div>
      </div>
      <BtnSmall onClick={onAction}>{actionLabel ?? "길 찾기"}</BtnSmall>
    </div>
  );
}
