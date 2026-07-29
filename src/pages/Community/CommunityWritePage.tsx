import { useState } from "react";
import byredoBlancheProduct from "../../assets/Community/product-byredo-blanche.png";
import diptyqueEauRoseProduct from "../../assets/Community/product-diptyque-eau-rose.png";
import joMaloneEnglishPearProduct from "../../assets/Community/product-jo-malone-english-pear.png";
import chevronDown from "../../assets/icons/chevron-down.svg";
import {
  BtnBig,
  CardSmall,
  CommunityEnter,
  CommunityToggle,
  HashTag,
  Header,
  Tab,
} from "../../components/common";
import CommunityPhotoPicker from "./CommunityPhotoPicker";
import type { CommunityUserPost } from "./communityUserPosts";

const moodTags = [
  "깔끔한",
  "포근한",
  "상큼한",
  "우아한",
  "고급스러운",
  "관능적인",
  "중성적인",
  "개성있는",
  "기타",
] as const;

const situationTags = [
  "데일리",
  "여행",
  "특별한 날",
  "운동 후",
  "친구",
  "데이트",
  "집에서",
  "출근/학교",
  "기분 전환",
  "잠들기 전",
] as const;

const perfumeTags = [
  {
    id: "diptyque-eau-rose",
    image: diptyqueEauRoseProduct,
    name: "딥디크 오 로즈 오 드 퍼퓸",
    sub: "50ml · 231,000원",
  },
  {
    id: "byredo-blanche",
    image: byredoBlancheProduct,
    name: "바이레도 블랑쉬 오 드 퍼퓸",
    sub: "50ml · 260,000원",
  },
  {
    id: "jo-malone-english-pear",
    image: joMaloneEnglishPearProduct,
    name: "조 말론 런던 잉글리쉬 페어 & 프리지아 코롱",
    sub: "50ml · 260,000원",
  },
] as const;

const perfumeDetailGroups = [
  {
    id: "scent",
    title: "가장 많이 느껴진 향",
    options: [
      "장미",
      "리치",
      "비누",
      "파우더리",
      "고급스러운",
      "관능적인",
      "중성적인",
      "개성있는",
      "기타",
    ],
    defaults: ["장미", "리치", "비누"],
    multiple: true,
  },
  {
    id: "lasting",
    title: "지속력",
    options: ["1시간 이하", "2~3시간", "4~5시간", "6시간 이상"],
    defaults: ["1시간 이하"],
    multiple: false,
  },
  {
    id: "store",
    title: "구입처",
    options: [
      "공식홈페이지",
      "플래그십스토어",
      "백화점",
      "면세점",
      "편집샵",
      "선물",
      "기타",
      "개성있는",
      "기타",
    ],
    defaults: ["공식홈페이지"],
    multiple: false,
  },
  {
    id: "reason",
    title: "이 향수를 고른 이유",
    options: [
      "포근한 무드",
      "깨끗한 느낌",
      "포인트 주기 좋음",
      "잔향이 좋음",
      "기타",
    ],
    defaults: ["포근한 무드"],
    multiple: false,
  },
] as const;

interface CommunityWritePageProps {
  category?: string;
  onCategoryClick?: () => void;
  onClose?: () => void;
  onPerfumeAdd?: () => void;
  selectedPerfumeIds?: readonly string[];
  onSubmit?: (
    post: Omit<CommunityUserPost, "id" | "createdAt">,
  ) => void;
}

export default function CommunityWritePage({
  category = "리뷰",
  onCategoryClick,
  onClose,
  onPerfumeAdd,
  selectedPerfumeIds = [],
  onSubmit,
}: CommunityWritePageProps) {
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [hashtagInput, setHashtagInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] =
    useState<(typeof moodTags)[number]>("깔끔한");
  const [selectedSituation, setSelectedSituation] =
    useState<(typeof situationTags)[number]>("데일리");
  const visiblePerfumes = perfumeTags.filter((perfume) =>
    selectedPerfumeIds.includes(perfume.id),
  );
  const [expandedPerfumeId, setExpandedPerfumeId] = useState<string | null>(
    visiblePerfumes[0]?.id ?? null,
  );
  const [detailSelections, setDetailSelections] = useState<
    Record<string, string[]>
  >(
    Object.fromEntries(
      perfumeDetailGroups.map((group) => [group.id, [...group.defaults]]),
    ),
  );

  const selectDetailOption = (
    groupId: string,
    option: string,
    multiple: boolean,
  ) => {
    setDetailSelections((current) => {
      const selected = current[groupId] ?? [];

      if (!multiple) {
        return { ...current, [groupId]: [option] };
      }

      return {
        ...current,
        [groupId]: selected.includes(option)
          ? selected.filter((item) => item !== option)
          : [...selected, option],
      };
    });
  };

  return (
    <main className="community-write-page min-h-[100dvh] bg-subtext">
      <div className="community-write-page__wrap mx-auto min-h-[100dvh] w-full max-w-[430px] bg-background">
        <Header
          variant="write-tit"
          title="글 작성하기"
          saveLabel="임시저장"
          onClose={onClose}
        />

        <form
          className="community-write-form flex flex-col gap-8 px-5 pb-10 pt-[30px]"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit?.({
              category: "리뷰",
              title: title.trim(),
              text: text.trim(),
              keywords: [
                ...hashtags,
                ...hashtagInput.split(/[\s,#]+/).filter(Boolean),
                selectedMood,
                selectedSituation,
              ],
              images,
            });
          }}
        >
          <section className="community-write-category">
            <CommunityEnter
              variant="brand"
              label="카테고리"
              required
              placeholder="카테고리를 선택해주세요"
              value={category}
              onClick={onCategoryClick}
            />
          </section>

          <CommunityPhotoPicker images={images} onChange={setImages} />

          <section className="community-write-title flex w-full flex-col gap-4">
            <h2 className="text-body-semibold-16 text-offblack">제목</h2>
            <div className="flex w-full flex-col items-end">
              <input
                type="text"
                required
                maxLength={40}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="제목을 입력해주세요"
                className="h-[52px] w-full rounded-lg border border-light-grey bg-offwhite p-4 text-body-regular-14 text-offblack outline-none placeholder:text-grey"
              />
              <span className="text-caption-regular-12 text-grey">{title.length}/40</span>
            </div>
          </section>

          <section className="community-write-body flex w-full flex-col gap-4">
            <h2 className="text-body-semibold-16 text-offblack">본문</h2>
            <div className="flex w-full flex-col items-end gap-1.5">
              <textarea
                rows={2}
                required
                maxLength={200}
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder={
                  "예) 은은하게 시작해서 잔향이 오래 남아요.\n기분좋은 하루를 만들어준 향이에요."
                }
                className="h-[72px] w-full resize-none overflow-hidden rounded-lg border border-light-grey bg-offwhite p-4 text-body-regular-14 text-offblack outline-none placeholder:text-grey"
              />
              <span className="text-caption-regular-12 text-grey">
                {text.length}/200
              </span>
            </div>
          </section>

          <section className="community-write-hashtag flex w-full flex-col gap-4">
            <h2 className="text-body-semibold-16 text-offblack">해시태그</h2>
            <input
              type="text"
              value={hashtagInput}
              onChange={(event) => setHashtagInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key !== "Enter") return;
                event.preventDefault();
                const tag = hashtagInput.replace(/^#+/, "").trim();
                if (tag && !hashtags.includes(tag)) {
                  setHashtags((current) => [...current, tag]);
                }
                setHashtagInput("");
              }}
              placeholder="# 태그입력"
              className="h-[52px] w-full rounded-lg border border-light-grey bg-offwhite p-4 text-body-regular-14 text-offblack outline-none placeholder:text-grey"
            />
            {hashtags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {hashtags.map((tag) => (
                  <HashTag
                    key={tag}
                    onRemove={() =>
                      setHashtags((current) => current.filter((item) => item !== tag))
                    }
                  >
                    {tag}
                  </HashTag>
                ))}
              </div>
            )}
          </section>

          <section className="community-write-mood flex w-full flex-col gap-4">
            <h2 className="text-body-semibold-16 text-offblack">오늘의 무드</h2>
            <div className="community-write-mood__tags flex flex-wrap gap-x-1.5 gap-y-2">
              {moodTags.map((tag) => (
                <Tab
                  key={tag}
                  active={tag === selectedMood}
                  aria-pressed={tag === selectedMood}
                  onClick={() => setSelectedMood(tag)}
                >
                  {tag}
                </Tab>
              ))}
            </div>
          </section>

          <section className="community-write-situation flex w-full flex-col gap-4">
            <h2 className="text-body-semibold-16 text-offblack">사용 상황</h2>
            <div className="community-write-situation__tags flex flex-wrap gap-x-1.5 gap-y-2">
              {situationTags.map((tag) => (
                <Tab
                  key={tag}
                  active={tag === selectedSituation}
                  aria-pressed={tag === selectedSituation}
                  onClick={() => setSelectedSituation(tag)}
                >
                  {tag}
                </Tab>
              ))}
            </div>
          </section>

          <section className="community-write-perfume flex w-full flex-col gap-4">
            <h2 className="text-body-semibold-16 text-offblack">
              향수 태그 <span className="text-point-orange">*</span>
            </h2>

            <div className="community-write-perfume__list flex w-full flex-col gap-3">
              {visiblePerfumes.map((perfume) => {
                const isExpanded = expandedPerfumeId === perfume.id;

                if (!isExpanded) {
                  return (
                    <CardSmall
                      key={perfume.id}
                      variant="medium-a"
                      img={perfume.image}
                      name={perfume.name}
                      sub={perfume.sub}
                      onClick={() => setExpandedPerfumeId(perfume.id)}
                      className="community-write-perfume-card community-write-perfume-card--closed !w-full !rounded-lg cursor-pointer"
                    />
                  );
                }

                return (
                  <article
                    key={perfume.id}
                    className="community-write-perfume-card community-write-perfume-card--open flex w-full flex-col gap-4 rounded-lg border-[0.8px] border-light-grey bg-offwhite p-4"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedPerfumeId(null)}
                      aria-expanded="true"
                      className="community-write-perfume-card__header flex w-full items-center justify-between"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <img
                          src={perfume.image}
                          alt=""
                          className="size-[38px] shrink-0 rounded-lg object-cover"
                        />
                        <span className="flex min-w-0 flex-col items-start gap-1">
                          <span className="truncate text-body-regular-14 text-offblack">
                            {perfume.name}
                          </span>
                          <span className="truncate text-caption-regular-12 text-grey">
                            {perfume.sub}
                          </span>
                        </span>
                      </span>
                      <img
                        src={chevronDown}
                        alt=""
                        className="size-[18px] shrink-0 rotate-180"
                      />
                    </button>

                    {perfumeDetailGroups.map((group, index) => (
                      <section
                        key={group.id}
                        className={`community-write-perfume-card__question community-write-perfume-card__question--${group.id} flex w-full flex-col gap-4 ${
                          index > 0 ? "border-t border-light-grey pt-4" : ""
                        }`}
                      >
                        <h3 className="text-body-semibold-16 text-offblack">
                          {group.title}
                        </h3>
                        <div className="community-write-perfume-card__options flex w-full flex-wrap gap-x-[6px] gap-y-2">
                          {group.options.map((option, optionIndex) => {
                            const isActive = (
                              detailSelections[group.id] ?? []
                            ).includes(option);

                            return (
                              <Tab
                                key={`${option}-${optionIndex}`}
                                active={isActive}
                                onClick={() =>
                                  selectDetailOption(
                                    group.id,
                                    option,
                                    group.multiple,
                                  )
                                }
                              >
                                {option}
                              </Tab>
                            );
                          })}
                        </div>
                      </section>
                    ))}
                  </article>
                );
              })}

              <button
                type="button"
                onClick={onPerfumeAdd}
                className="community-write-perfume__add flex h-[52px] w-full items-center justify-center gap-3 rounded-lg border border-light-grey bg-offwhite text-body-medium-14 text-grey"
              >
                <span className="text-[24px] font-light leading-none">+</span>
                추가하기
              </button>
            </div>
          </section>

          <section className="community-write-profile">
            <CommunityToggle label="프로필 비공개" checked />
          </section>

          <BtnBig
            type="submit"
            disabled={!title.trim() || !text.trim() || images.length === 0}
            className="community-write-submit"
          >
            글 올리기
          </BtnBig>
        </form>
      </div>
    </main>
  );
}
