import { useState } from "react";
import {
  BtnBig,
  Category,
  Header,
  Heart,
  KeywordList,
  ReviewAiSummary,
  ReviewSummary,
  TitleSection,
} from "../components/common";
import useDragScroll from "../hooks/useDragScroll";
import { allPerfumes, relatedPerfumes } from "../data/perfumeUtils";
import { buildReviews } from "../data/perfumeReviews";
import sparkles from "../assets/icons/sparkles.svg";
import notesBottle from "../assets/images/perfume/notes-bottle.svg";

// 피그마: 카테고리_향수보기 (3062:75401) + 리뷰 탭 (3062:75467)
const tabs = ["상세페이지", "리뷰"];

const NOTE_STEPS = [
  ["TOP", "top"],
  ["MIDDLE", "middle"],
  ["BASE", "base"],
];

export default function PerfumeDetail({
  item = allPerfumes[0],
  onBack,
  onSearch,
  onBell,
  onBuy,
  onMore,
  onSelectRelated,
}) {
  const [tab, setTab] = useState(tabs[0]);
  const [liked, setLiked] = useState(false);
  const [likedReviews, setLikedReviews] = useState([]);
  const relatedRef = useDragScroll();

  const { perfume } = item;
  const related = relatedPerfumes(item);
  const reviews = buildReviews(item.id);
  const description = (perfume.detailDescription ?? "")
    .split("\n")
    .filter(Boolean);

  const toggleReviewLike = (id) =>
    setLikedReviews((prev) =>
      prev.includes(id) ? prev.filter((it) => it !== id) : [...prev, id],
    );

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto w-full max-w-[430px] bg-background pb-[92px]">
        <Header
          variant="detail-back"
          title="향수보기"
          onBack={onBack}
          onSearch={onSearch}
          onBell={onBell}
        />

        <div className="flex flex-col gap-3 bg-offwhite px-5">
          <img
            src={perfume.image}
            alt={perfume.name}
            className="h-[338px] w-[390px] object-contain"
          />

          <div className="flex w-[390px] flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex w-[263px] flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <p className="text-caption-regular-12 text-grey">
                    {item.brand}
                  </p>
                  <h1 className="text-title-semibold-24 text-offblack">
                    {perfume.name}
                  </h1>
                </div>
                <KeywordList variant="grey" keywords={item.keywords} />
              </div>
              <Heart
                variant={liked ? "abled" : "grey1"}
                onClick={() => setLiked((prev) => !prev)}
                className="shrink-0"
              />
            </div>
            <p className="text-body-medium-14 text-offblack70">
              {perfume.description}
            </p>
          </div>

          <Category
            variant="page"
            items={tabs}
            active={tab}
            onChange={setTab}
            className="-mx-5"
          />
        </div>

        {tab === "리뷰" ? (
          <div className="flex flex-col gap-4 px-5 pt-6">
            <ReviewAiSummary icon={sparkles} summary={perfume.aiReview} />
            {reviews.map((review) => {
              const isLiked = likedReviews.includes(review.id);
              return (
                <ReviewSummary
                  key={review.id}
                  profileName={review.name}
                  profileTime={review.time}
                  profileImg={review.avatar}
                  badge={review.badge}
                  text={review.text}
                  // 내가 누른 좋아요는 원래 수에 더해서 보여준다
                  likes={review.likes + (isLiked ? 1 : 0)}
                  comments={review.comments}
                  liked={isLiked}
                  onLike={() => toggleReviewLike(review.id)}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-[60px]">
            <div className="flex flex-col gap-4 px-5 pt-6">
              <div className="flex flex-col gap-4">
                <h2 className="text-title-semibold-18 text-offblack">
                  {perfume.detailTitle}
                </h2>
                <div className="text-body-regular-14 text-offblack">
                  {description.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>

              <div className="flex w-full items-center justify-center gap-[60px] rounded-2xl border border-light-grey bg-offwhite py-[30px]">
                <img
                  src={notesBottle}
                  alt=""
                  className="h-40 w-[65.92px] shrink-0"
                />
                <div className="flex w-[142px] flex-col gap-6">
                  {NOTE_STEPS.map(([label, key]) => (
                    <div key={key} className="flex w-full flex-col gap-1">
                      <p className="text-body-regular-14 text-offblack">
                        {label}
                      </p>
                      <KeywordList
                        variant="grey"
                        keywords={perfume.notes?.[key] ?? []}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {perfume.detailImages?.length > 0 && (
                <div className="flex flex-col items-center">
                  {perfume.detailImages.map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt=""
                      className="h-[338px] w-[390px] object-cover"
                    />
                  ))}
                </div>
              )}
            </div>

            {related.length > 0 && (
              <section className="flex flex-col gap-[30px]">
                <div className="px-5">
                  <TitleSection
                    variant="button"
                    title="관련 향수"
                    onMore={onMore}
                  />
                </div>
                <div
                  ref={relatedRef}
                  className="no-scrollbar flex cursor-grab gap-4 overflow-x-auto px-5 select-none active:cursor-grabbing"
                >
                  {related.map((other) => (
                    <button
                      key={other.id}
                      type="button"
                      onClick={() => onSelectRelated?.(other)}
                      className="flex shrink-0 flex-col items-center gap-[30px] rounded-2xl border border-light-grey bg-offwhite px-5 pb-[30px] pt-5"
                    >
                      <div className="size-[120px] overflow-hidden rounded-lg">
                        <img
                          src={other.img}
                          alt=""
                          className="size-full object-contain"
                        />
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <p className="text-center text-body-semibold-16 text-offblack">
                          {other.brand}
                        </p>
                        <p className="w-[170px] truncate text-center text-caption-medium-12 text-grey">
                          {other.name}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[430px] px-5 pb-5">
        <BtnBig onClick={onBuy}>구매하기</BtnBig>
      </div>
    </div>
  );
}
