import { useState } from "react";
import byredoBlanche from "../../assets/Community/PerfumeSelect/perfume-byredo-blanche.avif";
import diptyqueEauRose from "../../assets/Community/PerfumeSelect/perfume-diptyque-eau-rose.avif";
import joMaloneEnglishPear from "../../assets/Community/PerfumeSelect/perfume-jo-malone-english-pear.avif";
import {
  BtnBig,
  CheckBox,
  Header,
  Search,
} from "../../components/common";

const perfumeOptions = [
  {
    id: "diptyque-eau-rose",
    brand: "DIPTYQUE",
    name: "딥디크 오 로즈 오 드 퍼퓸 50ml",
    keywords: ["불가리아장미", "머스크", "리치"],
    image: diptyqueEauRose,
    imageWidth: 58,
    imageStyle: {
      height: "143.57%",
      left: "-33.56%",
      top: "-25.95%",
      width: "168.54%",
    },
  },
  {
    id: "byredo-blanche",
    brand: "BYREDO",
    name: "블랑쉬 오 드 퍼퓸",
    keywords: ["알데하이드", "피오니", "머스크"],
    image: byredoBlanche,
    imageWidth: 60,
    imageStyle: {
      height: "145.78%",
      left: "-33.02%",
      top: "-23.22%",
      width: "168.97%",
    },
  },
  {
    id: "jo-malone-english-pear",
    brand: "JO MALONE",
    name: "잉글리쉬 페어 & 프리지아 코롱",
    keywords: ["킹윌리엄페어", "프리지아", "머스크"],
    image: joMaloneEnglishPear,
    imageWidth: 59.02,
    imageStyle: {
      height: "141.42%",
      left: "-31.07%",
      top: "-26.63%",
      width: "165.41%",
    },
  },
] as const;

interface CommunityPerfumeSelectPageProps {
  initialSelectedIds?: readonly string[];
  onBack?: () => void;
  onSubmit?: (selectedIds: string[]) => void;
}

export default function CommunityPerfumeSelectPage({
  initialSelectedIds = [],
  onBack,
  onSubmit,
}: CommunityPerfumeSelectPageProps) {
  const [selectedPerfumes, setSelectedPerfumes] = useState<string[]>([
    ...initialSelectedIds,
  ]);

  const togglePerfume = (perfumeId: string) => {
    setSelectedPerfumes((current) =>
      current.includes(perfumeId)
        ? current.filter((id) => id !== perfumeId)
        : [...current, perfumeId],
    );
  };

  return (
    <main className="community-perfume-select-page min-h-[100dvh] bg-subtext">
      <div className="community-perfume-select-page__wrap relative mx-auto min-h-[100dvh] w-full max-w-[430px] bg-background pb-24">
        <Header
          variant="community-back"
          title="향수 선택"
          onBack={onBack}
        />

        <section className="community-perfume-select-content flex w-full flex-col gap-[30px] px-5 pt-6">
          <Search
            variant="border"
            placeholder="향수명, 브랜드를 검색해보세요"
            aria-label="향수 검색"
            className="community-perfume-select-search"
          />

          <div className="community-perfume-select-list flex w-full flex-col gap-3">
            {perfumeOptions.map((perfume) => {
              const isSelected = selectedPerfumes.includes(perfume.id);

              return (
                <article
                  key={perfume.id}
                  role="checkbox"
                  aria-checked={isSelected}
                  aria-label={`${perfume.name} 선택`}
                  tabIndex={0}
                  onClick={() => togglePerfume(perfume.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      togglePerfume(perfume.id);
                    }
                  }}
                  className={`community-perfume-select-card community-perfume-select-card--${perfume.id} flex h-[124px] w-full cursor-pointer items-start justify-between overflow-hidden rounded-lg border-[0.8px] border-light-grey bg-offwhite p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-point-orange`}
                >
                  <div className="community-perfume-select-card__left flex min-w-0 flex-1 items-start gap-5">
                    <div className="community-perfume-select-card__image flex size-[100px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-2light-grey">
                      <div
                        className="community-perfume-select-card__image-frame relative h-[86px] overflow-hidden"
                        style={{ width: `${perfume.imageWidth}px` }}
                      >
                        <img
                          src={perfume.image}
                          alt=""
                          className="absolute max-w-none"
                          style={perfume.imageStyle}
                        />
                      </div>
                    </div>

                    <div className="community-perfume-select-card__info flex min-w-0 flex-1 flex-col justify-center gap-3 overflow-hidden">
                      <div className="community-perfume-select-card__heading flex min-w-0 flex-col gap-1">
                        <p className="truncate text-caption-regular-12 text-grey">
                          {perfume.brand}
                        </p>
                        <h2 className="truncate text-body-semibold-16 text-offblack">
                          {perfume.name}
                        </h2>
                      </div>

                      <div className="community-perfume-select-card__keywords flex items-center gap-2">
                        {perfume.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="shrink-0 text-caption-medium-12 text-grey"
                          >
                            #{keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <CheckBox
                    variant={isSelected ? "orange" : "white"}
                    aria-hidden="true"
                    tabIndex={-1}
                    className="community-perfume-select-card__check pointer-events-none shrink-0"
                  />
                </article>
              );
            })}
          </div>
        </section>

        <div className="community-perfume-select-submit absolute inset-x-0 bottom-0 z-10 bg-background px-5 pb-5">
          <BtnBig onClick={() => onSubmit?.(selectedPerfumes)}>
            선택하기
          </BtnBig>
        </div>
      </div>
    </main>
  );
}
