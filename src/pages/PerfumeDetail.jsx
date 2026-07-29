import { useEffect, useState } from "react";
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
import { buildComments, buildReviews } from "../data/perfumeReviews";
import sparkles from "../assets/icons/sparkles.svg";
import usePerfumeWishlist from "../hooks/usePerfumeWishlist";

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
  const [likedReviews, setLikedReviews] = useState([]);
  const { isWishlisted, toggleWishlist } = usePerfumeWishlist();
  const relatedRef = useDragScroll();

  const { perfume } = item;
  const related = relatedPerfumes(item);
  const reviews = buildReviews(item.id);
  // 설명글의 마침표는 빼고 보여준다
  const description = (perfume.detailDescription ?? "")
    .split("\n")
    .map((line) => line.replaceAll(".", "").trim())
    .filter(Boolean);

  // 노트 색이 없는 향수는 회색 계열로 대체
  const noteTop = perfume.noteColors?.top ?? "#dddddd";
  const noteMiddle = perfume.noteColors?.middle ?? "#ededed";
  const noteBase = perfume.noteColors?.base ?? "#f7f7f7";

  // 다른 향수에서 넘어와도 항상 페이지 맨 위에서 시작한다
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [item.id]);

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
          <div className="flex h-[260px] w-[390px] items-center justify-center">
            <img
              src={perfume.image}
              alt={perfume.name}
              className="h-auto w-auto max-h-[180px] max-w-[240px] object-contain"
            />
          </div>

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
                variant={isWishlisted(item.id) ? "abled" : "grey1"}
                onClick={() => toggleWishlist(item.id)}
                className="shrink-0"
              />
            </div>
            <p className="text-body-medium-14 text-offblack70">
              {perfume.description.replaceAll(".", "").trim()}
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
              // 바깥에 적히는 개수와 실제 댓글 목록을 같은 값에서 뽑는다
              const comments = buildComments(review.id);
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
                  comments={comments.length}
                  liked={isLiked}
                  onLike={() => toggleReviewLike(review.id)}
                  commentItems={comments}
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

              <div className="flex w-full items-center justify-between rounded-2xl border border-light-grey bg-offwhite px-8 py-[30px]">
                {/* 제품 이미지(배경 제거 PNG)를 마스크로 써서 실제 향수 실루엣 안에
                    탑·미들·베이스 노트 색을 위에서부터 채운다.
                    높이는 피그마 기준 160px, 가로는 향수 비율대로 늘어나되
                    옆의 노트 글이 밀리지 않도록 130px에서 멈춘다
                    (카드 350 - 여백 60 - 글 142 = 148이 한계) */}
                <div className="relative flex h-40 w-[100px] shrink-0 items-center justify-center">
                  {/* 실제 비율만큼 자리를 잡아주는 투명 이미지 */}
                  <img
                    src={perfume.image}
                    alt=""
                    aria-hidden
                    className="h-40 w-auto max-w-full object-contain opacity-0"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, ${noteTop} 0%, ${noteTop} 34%, ${noteMiddle} 34%, ${noteMiddle} 67%, ${noteBase} 67%, ${noteBase} 100%)`,
                      WebkitMaskImage: `url(${perfume.image})`,
                      maskImage: `url(${perfume.image})`,
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                    }}
                  />
                </div>
                {/* justify-between으로 실루엣은 왼쪽, 글 상자는 오른쪽 끝에 붙인다.
                    상자 폭을 고정하면 글자 뒤 빈 공간 때문에 오른쪽까지 안 닿으므로
                    내용에 맞춰(w-fit) 줄이되 190px을 넘지 않게 한다 */}
                <div className="flex w-fit max-w-[190px] shrink-0 flex-col gap-6">
                  {NOTE_STEPS.map(([label, key]) => (
                    <div key={key} className="flex w-full flex-col gap-1">
                      <p className="text-body-regular-14 text-offblack">
                        {label}
                      </p>
                      <KeywordList
                        variant="grey"
                        keywords={perfume.notes?.[key] ?? []}
                        className="overflow-hidden whitespace-nowrap [&>span]:shrink-0"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {perfume.detailImages?.length > 0 && (
                <div className="flex flex-col items-center">
                  {/* 높이를 고정하지 않아야 이미지가 잘리지 않고 전체가 보인다 */}
                  {perfume.detailImages.map((src) => (
                    <img key={src} src={src} alt="" className="h-auto w-full" />
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
                  className="scroll-rail-page-gutter no-scrollbar flex cursor-grab gap-4 overflow-x-auto select-none active:cursor-grabbing"
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
