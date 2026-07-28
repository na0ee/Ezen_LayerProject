import {
  BtnBig,
  CommunityEnter,
  CommunityToggle,
  Header,
} from "../../components/common";

interface CommunityPollWritePageProps {
  onCategoryClick?: () => void;
  onClose?: () => void;
}

export default function CommunityPollWritePage({
  onCategoryClick,
  onClose,
}: CommunityPollWritePageProps) {
  return (
    <main className="community-poll-write-page min-h-[100dvh] bg-subtext">
      <div className="community-write-page__wrap mx-auto min-h-[100dvh] w-full max-w-[430px] bg-background">
        <Header
          variant="write-tit"
          title="글 작성하기"
          saveLabel="임시저장"
          onClose={onClose}
        />

        <form className="community-poll-write-form flex min-h-[calc(100dvh-54px)] flex-col justify-between gap-8 px-5 pb-5 pt-[30px]">
          <div className="flex w-full flex-col gap-[30px]">
            <CommunityEnter
              variant="brand"
              label="카테고리"
              required
              value="하나 골라줘!"
              onClick={onCategoryClick}
            />

            <section className="community-poll-write-title flex w-full flex-col gap-4">
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

            <section className="community-poll-write-body flex w-full flex-col gap-4">
              <h2 className="text-body-semibold-16 text-offblack">본문</h2>
              <div className="flex w-full flex-col items-end gap-1.5">
                <textarea
                  rows={2}
                  placeholder="투표 주제를 입력해주세요"
                  className="h-[52px] w-full resize-none overflow-hidden rounded-lg border border-light-grey bg-offwhite p-4 text-body-regular-14 text-offblack outline-none placeholder:text-grey"
                />
                <span className="text-caption-regular-12 text-grey">
                  103/200
                </span>
              </div>
            </section>

            <section className="community-poll-write-options flex w-full flex-col gap-4">
              <h2 className="text-body-semibold-16 text-offblack">질문</h2>
              <div className="flex w-full flex-col gap-4">
                <input
                  type="text"
                  placeholder="항목1 입력"
                  className="h-[52px] w-full rounded-lg border border-light-grey bg-offwhite p-4 text-body-regular-14 text-offblack outline-none placeholder:text-grey"
                />
                <input
                  type="text"
                  placeholder="항목2 입력"
                  className="h-[52px] w-full rounded-lg border border-light-grey bg-offwhite p-4 text-body-regular-14 text-offblack outline-none placeholder:text-grey"
                />
                <button
                  type="button"
                  className="flex h-[52px] w-full items-center justify-center gap-2 rounded-lg border border-light-grey bg-offwhite text-body-medium-14 text-grey"
                >
                  <span className="text-[24px] font-light leading-none">+</span>
                  추가하기
                </button>
              </div>
            </section>

            <CommunityToggle label="프로필 비공개" checked />
          </div>

          <BtnBig className="community-poll-write-submit">글 올리기</BtnBig>
        </form>
      </div>
    </main>
  );
}
