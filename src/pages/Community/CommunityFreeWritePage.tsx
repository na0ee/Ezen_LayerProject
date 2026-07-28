import {
  BtnBig,
  CommunityEnter,
  CommunityToggle,
  Header,
} from "../../components/common";

interface CommunityFreeWritePageProps {
  onCategoryClick?: () => void;
  onClose?: () => void;
}

export default function CommunityFreeWritePage({
  onCategoryClick,
  onClose,
}: CommunityFreeWritePageProps) {
  return (
    <main className="community-free-write-page min-h-[100dvh] bg-subtext">
      <div className="community-write-page__wrap mx-auto min-h-[100dvh] w-full max-w-[430px] bg-background">
        <Header
          variant="write-tit"
          title="글 작성하기"
          saveLabel="임시저장"
          onClose={onClose}
        />

        <form className="community-free-write-form flex min-h-[calc(100dvh-54px)] flex-col justify-between gap-16 px-5 pb-5 pt-[30px]">
          <div className="flex w-full flex-col gap-[30px]">
            <CommunityEnter
              variant="brand"
              label="카테고리"
              required
              value="자유 게시글"
              onClick={onCategoryClick}
            />

            <section className="community-free-write-title flex w-full flex-col gap-4">
              <h2 className="text-body-semibold-16 text-offblack">제목</h2>
              <div className="flex w-full flex-col items-end gap-1.5">
                <input
                  type="text"
                  placeholder="궁금한 점을 한 줄로 요약해주세요"
                  className="h-[52px] w-full rounded-lg border border-light-grey bg-offwhite p-4 text-body-regular-14 text-offblack outline-none placeholder:text-subtext"
                />
                <span className="text-caption-regular-12 text-grey">23/40</span>
              </div>
            </section>

            <section className="community-free-write-body flex w-full flex-col gap-4">
              <h2 className="text-body-semibold-16 text-offblack">본문</h2>
              <div className="flex w-full flex-col items-end gap-1.5">
                <textarea
                  rows={2}
                  placeholder="상황과 취향을 알려주시면 더 정확한 추천을 받을 수 있어요"
                  className="h-[72px] w-full resize-none overflow-hidden rounded-lg border border-light-grey bg-offwhite p-4 text-body-regular-14 text-offblack outline-none placeholder:text-subtext"
                />
                <span className="text-caption-regular-12 text-grey">
                  103/200
                </span>
              </div>
            </section>

            <CommunityToggle label="프로필 비공개" checked />
          </div>

          <BtnBig className="community-free-write-submit">글 올리기</BtnBig>
        </form>
      </div>
    </main>
  );
}
