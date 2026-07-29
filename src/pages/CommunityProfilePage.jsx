import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  BottomNav,
  BtnBig,
  Category,
  LayerBadge,
} from "../components/common";
import badgeNewbie from "../assets/images/grade-badge/badge-newbie.png";
import background from "../assets/images/mypage/background.png";
import defaultProfile from "../assets/images/mypage/profile.png";
import feedCell1 from "../assets/images/mypage/feed/feed-cell-1.png";
import feedCell2 from "../assets/images/mypage/feed/feed-cell-2.png";
import feedCell3 from "../assets/images/mypage/feed/feed-cell-3.png";
import feedCell4 from "../assets/images/mypage/feed/feed-cell-4.png";
import reviewCell1 from "../assets/images/mypage/review-tab/review-cell-1.png";
import reviewCell2 from "../assets/images/mypage/review-tab/review-cell-2.png";
import reviewCell3 from "../assets/images/mypage/review-tab/review-cell-3.png";
import reviewCell4 from "../assets/images/mypage/review-tab/review-cell-4.png";

const tabs = ["향 추천", "리뷰"];
const recommendationPosts = [
  { img: feedCell1, hashtags: ["#밤산책", "#개굳"] },
  { img: feedCell2, hashtags: ["#밤산책", "#개굳"] },
  { img: feedCell3, hashtags: ["#밤산책", "#개굳"] },
  { img: feedCell4, hashtags: ["#밤산책", "#개굳"] },
];
const reviewPosts = [
  { img: reviewCell1, hashtags: ["#밤산책", "#개굳"] },
  { img: reviewCell2, hashtags: ["#밤산책", "#개굳"] },
  { img: reviewCell3, hashtags: ["#밤산책", "#개굳"] },
  { img: reviewCell4, hashtags: ["#밤산책", "#개굳"] },
];

function PostGrid({ items }) {
  return (
    <div className="grid grid-cols-2">
      {items.map((item, index) => (
        <div
          key={`${item.img}-${index}`}
          className="relative flex h-61 items-end overflow-hidden p-4"
        >
          <img
            src={item.img}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
          <div className="relative flex gap-2">
            {item.hashtags.map((hashtag) => (
              <span
                key={hashtag}
                className="text-caption-regular-12 text-offwhite"
              >
                {hashtag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CommunityProfilePage() {
  const location = useLocation();
  const profile = location.state?.profile ?? {};
  const [activeTab, setActiveTab] = useState("향 추천");
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <main className="mx-auto min-h-[100dvh] w-full max-w-[430px] bg-background pb-28">
      <div className="relative h-76.25 overflow-hidden">
        <img
          src={profile.background ?? background}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <LayerBadge className="absolute right-5 top-5" />
      </div>

      <div className="relative -mt-23.75 overflow-hidden rounded-t-3xl bg-offwhite">
        <section className="flex flex-col gap-6 p-5">
          <div className="flex items-center gap-4.5">
            <img
              src={profile.image ?? defaultProfile}
              alt=""
              className="size-20 shrink-0 rounded-full object-cover"
            />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <h1 className="text-title-semibold-18 text-offblack">
                  {profile.name ?? "북극곰"}
                </h1>
                <span className="flex items-center gap-0.5">
                  <img
                    src={badgeNewbie}
                    alt=""
                    className="size-4 object-contain"
                  />
                  <span className="text-body-medium-14 text-subtext">
                    NEWBIE
                  </span>
                </span>
              </div>
              <div className="flex gap-3 text-body-medium-14 text-subtext">
                <span>
                  팔로워 <strong className="font-medium text-offblack">12</strong>
                </span>
                <span>
                  팔로잉 <strong className="font-medium text-offblack">2</strong>
                </span>
              </div>
            </div>
          </div>

          <BtnBig
            onClick={() => setIsFollowing((current) => !current)}
            className={isFollowing ? "!bg-grey" : ""}
          >
            {isFollowing ? "팔로잉" : "팔로우"}
          </BtnBig>
        </section>

        <Category
          variant="page"
          items={tabs}
          active={activeTab}
          onChange={setActiveTab}
        />

        <PostGrid
          items={activeTab === "향 추천" ? recommendationPosts : reviewPosts}
        />
      </div>

      <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 px-5 pb-5">
        <BottomNav active="my" />
      </div>
    </main>
  );
}
