import { useState } from "react";
import {
  BtnBig,
  CommunityEnter,
  HashTag,
  Header,
} from "../../components/common";
import CommunityPhotoPicker from "./CommunityPhotoPicker";
import type { CommunityUserPost } from "./communityUserPosts";

interface CommunityRecommendationWritePageProps {
  onCategoryClick?: () => void;
  onClose?: () => void;
  onSubmit?: (
    post: Omit<CommunityUserPost, "id" | "createdAt">,
  ) => void;
}

export default function CommunityRecommendationWritePage({
  onCategoryClick,
  onClose,
  onSubmit,
}: CommunityRecommendationWritePageProps) {
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [hashtagInput, setHashtagInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);

  return (
    <main className="community-recommendation-write-page min-h-[100dvh] bg-subtext">
      <div className="community-write-page__wrap mx-auto min-h-[100dvh] w-full max-w-[430px] bg-background">
        <Header
          variant="write-tit"
          title="글 작성하기"
          saveLabel="임시저장"
          onClose={onClose}
        />

        <form
          className="community-recommendation-write-form flex flex-col gap-[30px] px-5 pb-5 pt-[30px]"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit?.({
              category: "향 추천",
              title: title.trim(),
              text: text.trim(),
              keywords: [
                ...hashtags,
                ...hashtagInput.split(/[\s,#]+/).filter(Boolean),
              ],
              images,
            });
          }}
        >
          <CommunityEnter
            variant="brand"
            label="카테고리"
            required
            value="향 추천받기"
            onClick={onCategoryClick}
          />

          <CommunityPhotoPicker images={images} onChange={setImages} />

          <section className="community-recommendation-write-title flex w-full flex-col gap-4">
            <h2 className="text-body-semibold-16 text-offblack">제목</h2>
            <div className="flex w-full flex-col items-end gap-1.5">
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

          <section className="community-recommendation-write-body flex w-full flex-col gap-4">
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

          <section className="community-recommendation-write-hashtag flex w-full flex-col gap-4">
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

          <BtnBig
            type="submit"
            disabled={!title.trim() || !text.trim() || images.length === 0}
            className="community-recommendation-write-submit mt-2"
          >
            글 올리기
          </BtnBig>
        </form>
      </div>
    </main>
  );
}
