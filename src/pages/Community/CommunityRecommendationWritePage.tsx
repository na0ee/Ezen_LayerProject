import communityWritePhoto from "../../assets/Community/Write/community-write-photo.png";
import {
  BtnBig,
  CommunityEnter,
  HashTag,
  Header,
} from "../../components/common";

interface CommunityRecommendationWritePageProps {
  onCategoryClick?: () => void;
  onClose?: () => void;
}

export default function CommunityRecommendationWritePage({
  onCategoryClick,
  onClose,
}: CommunityRecommendationWritePageProps) {
  return (
    <main className="community-recommendation-write-page min-h-[100dvh] bg-subtext">
      <div className="community-write-page__wrap mx-auto min-h-[100dvh] w-full max-w-[430px] bg-background">
        <Header
          variant="write-tit"
          title="글 작성하기"
          saveLabel="임시저장"
          onClose={onClose}
        />

        <form className="community-recommendation-write-form flex flex-col gap-[30px] px-5 pb-5 pt-[30px]">
          <CommunityEnter
            variant="brand"
            label="카테고리"
            required
            value="향 추천받기"
            onClick={onCategoryClick}
          />

          <section className="community-recommendation-write-photo flex w-full flex-col gap-4">
            <div className="flex w-full items-center justify-between">
              <h2 className="text-body-semibold-16 text-offblack">사진 추가</h2>
              <span className="text-caption-regular-12 text-grey">1/5</span>
            </div>
            <div className="flex items-center gap-[10px]">
              <div className="h-[191px] w-40 shrink-0 overflow-hidden rounded-2xl bg-light-grey">
                <img
                  src={communityWritePhoto}
                  alt=""
                  className="size-full object-cover"
                />
              </div>
              <button
                type="button"
                aria-label="사진 추가"
                className="flex h-[191px] w-40 shrink-0 items-center justify-center rounded-2xl bg-light-grey text-[32px] font-light leading-none text-subtext"
              >
                +
              </button>
            </div>
          </section>

          <section className="community-recommendation-write-title flex w-full flex-col gap-4">
            <h2 className="text-body-semibold-16 text-offblack">제목</h2>
            <div className="flex w-full flex-col items-end gap-1.5">
              <input
                type="text"
                placeholder="제목을 입력해주세요"
                className="h-[52px] w-full rounded-lg border border-light-grey bg-offwhite p-4 text-body-regular-14 text-offblack outline-none placeholder:text-grey"
              />
              <span className="text-caption-regular-12 text-grey">23/40</span>
            </div>
          </section>

          <section className="community-recommendation-write-body flex w-full flex-col gap-4">
            <h2 className="text-body-semibold-16 text-offblack">본문</h2>
            <div className="flex w-full flex-col items-end gap-1.5">
              <textarea
                rows={2}
                placeholder={
                  "예) 은은하게 시작해서 잔향이 오래 남아요.\n기분좋은 하루를 만들어준 향이에요."
                }
                className="h-[72px] w-full resize-none overflow-hidden rounded-lg border border-light-grey bg-offwhite p-4 text-body-regular-14 text-offblack outline-none placeholder:text-grey"
              />
              <span className="text-caption-regular-12 text-grey">
                103/200
              </span>
            </div>
          </section>

          <section className="community-recommendation-write-hashtag flex w-full flex-col gap-4">
            <h2 className="text-body-semibold-16 text-offblack">해시태그</h2>
            <input
              type="text"
              placeholder="# 태그입력"
              className="h-[52px] w-full rounded-lg border border-light-grey bg-offwhite p-4 text-body-regular-14 text-offblack outline-none placeholder:text-grey"
            />
            <HashTag className="mt-2 self-start">메종 마르지엘라</HashTag>
          </section>

          <BtnBig className="community-recommendation-write-submit mt-2">
            글 올리기
          </BtnBig>
        </form>
      </div>
    </main>
  );
}
