import characterAnimation from "../../assets/images/chatbot/Lay-transparent.webp";

export default function FeatureGuideCard({
  characterPosition = "left",
  size = "default",
  progress,
  children = "주요 기능 가이드 텍스트",
  className = "",
}) {
  const isCharacterRight = characterPosition === "right";
  const isCompact = size === "compact";

  const character = (
    <div
      className={`shrink-0 overflow-hidden ${
        isCompact
          ? "h-[96px] w-[72px]"
          : "h-[186.966px] w-[145.641px]"
      }`}
      aria-hidden="true"
    >
      <img
        src={characterAnimation}
        alt=""
        className="size-full object-contain"
      />
    </div>
  );

  return (
    <div
      className={`flex items-center ${isCompact ? "gap-2" : "gap-3"} ${className}`}
      data-guide-character-position={characterPosition}
    >
      {!isCharacterRight && character}

      <div
        className={`flex shrink-0 items-center justify-center bg-offwhite ${
          isCompact
            ? "min-h-[112px] w-[280px] rounded-xl px-4 py-3"
            : "h-[204.418px] w-[413.169px] rounded-[15px] px-8 py-6"
        }`}
      >
        <div className="flex w-full flex-col items-center gap-2">
          {progress && (
            <span className="text-caption-semibold-10 text-grey">
              {progress}
            </span>
          )}
          <p
            className={`w-full whitespace-nowrap text-center leading-normal text-black ${
              isCompact ? "text-caption-medium-12" : "text-[18px]"
            }`}
          >
            {children}
          </p>
        </div>
      </div>

      {isCharacterRight && character}
    </div>
  );
}
