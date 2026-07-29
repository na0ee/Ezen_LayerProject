import { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import defaultProfile from "../../assets/images/mypage/profile.png";
import { allPerfumes } from "../../data/perfumeUtils";
import {
  Badge,
  BtnSmall,
  Header,
  Icon,
  Profile,
} from "../../components/common";
import CommunityRecommendationSelectSheet from "./CommunityRecommendationSelectSheet";

const FALLBACK_POST = {
  profileName: "향기로운하루",
  profileImage: defaultProfile,
  time: "5분 전",
  image: "",
  mood: "Mood Shifter",
  title: "이 분위기에 어울리는 향을 추천해주세요",
  text: "사진의 분위기와 잘 어울리는 향수를 찾고 있어요. 여러분의 향수 추천을 기다릴게요.",
  keywords: ["데일리향수", "향수추천"],
};

const PERFUME_TAG_POSITIONS = [
  { left: "28%", top: 32 },
  { left: "70%", top: 145 },
  { left: "50%", top: 260 },
];

function DraggablePerfumeTag({ perfume, position, onOpen }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef({
    active: false,
    dragged: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
  });

  const handlePointerDown = (event) => {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) {
      return;
    }

    drag.current = {
      active: true,
      dragged: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!drag.current.active || drag.current.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.current.startX;
    const deltaY = event.clientY - drag.current.startY;
    if (Math.hypot(deltaX, deltaY) > 4) {
      drag.current.dragged = true;
    }
    if (!drag.current.dragged) return;

    setOffset({
      x: drag.current.offsetX + deltaX,
      y: drag.current.offsetY + deltaY,
    });
  };

  const handlePointerUp = (event) => {
    if (!drag.current.active || drag.current.pointerId !== event.pointerId) return;
    drag.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
    if (drag.current.dragged) {
      event.preventDefault();
      drag.current.dragged = false;
      return;
    }
    onOpen();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="absolute flex touch-none select-none flex-col items-center gap-[2px] text-left"
      style={{
        left: position.left,
        top: position.top,
        transform: `translate(calc(-50% + ${offset.x}px), ${offset.y}px)`,
      }}
    >
      <span className="flex max-w-[250px] items-center gap-2 rounded-xl bg-offblack/75 p-2 backdrop-blur-sm">
        <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-offwhite">
          <img
            src={perfume.img}
            alt=""
            draggable="false"
            className="h-8 w-auto object-contain"
          />
        </span>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-caption-regular-12 text-offwhite">
            {perfume.brand}
          </span>
          <span className="truncate text-body-medium-14 text-offwhite">
            {perfume.name}
          </span>
        </span>
      </span>
      <span className="flex size-4 items-center justify-center rounded-full bg-point-orange text-[12px] leading-none text-offwhite">
        +
      </span>
    </button>
  );
}

export default function CommunityRecommendationDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { postId } = useParams();
  const post = { ...FALLBACK_POST, ...location.state?.post };
  const isReview = post.type === "review";
  const perfumeTags = (post.perfumeIds ?? [36, 21, 16])
    .map((id) => allPerfumes.find((item) => item.id === id))
    .filter(Boolean)
    .slice(0, 3);
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);
  const [isPerfumeTagsVisible, setIsPerfumeTagsVisible] = useState(true);

  return (
    <>
      <main className="mx-auto min-h-[100dvh] w-full max-w-[430px] bg-background">
        <Header
          variant="detail-back"
          onBack={() => navigate(-1)}
          hideActions
          className="sticky top-0 z-20"
        />

        <article
          aria-labelledby={`community-recommendation-${postId}`}
          className="flex flex-col gap-6 bg-offwhite px-5 pb-10 pt-5"
        >
          <Profile
            name={post.profileName}
            time={post.time}
            img={post.profileImage}
          />

          <div
            role={isReview ? "button" : undefined}
            tabIndex={isReview ? 0 : undefined}
            onClick={
              isReview
                ? () => setIsPerfumeTagsVisible((visible) => !visible)
                : undefined
            }
            onKeyDown={
              isReview
                ? (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setIsPerfumeTagsVisible((visible) => !visible);
                    }
                  }
                : undefined
            }
            className={`relative h-[430px] w-full overflow-hidden rounded-lg bg-light-grey ${
              isReview ? "cursor-pointer" : ""
            }`}
          >
            {post.image && (
              <img
                src={post.image}
                alt=""
                className="size-full object-cover"
              />
            )}
            {!isReview && post.mood && (
              <span className="absolute right-4 top-4 rounded-[24px] bg-offblack/50 px-3 py-1.5 font-en text-en-semibold-16 text-offwhite">
                {post.mood}
              </span>
            )}
            {isReview &&
              isPerfumeTagsVisible &&
              perfumeTags.map((perfume, index) => (
                <DraggablePerfumeTag
                  key={perfume.id}
                  perfume={perfume}
                  position={PERFUME_TAG_POSITIONS[index]}
                  onOpen={() => navigate(`/perfume/${perfume.id}`)}
                />
              ))}
          </div>

          {isReview && (
            <div className="flex h-6 w-full items-start justify-between">
              <Icon
                likes={post.likes ?? 42}
                comments={post.comments ?? 8}
              />
              <Badge variant={post.badge ?? "good"} />
            </div>
          )}

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <h1
                id={`community-recommendation-${postId}`}
                className="text-body-semibold-16 text-offblack"
              >
                {post.title}
              </h1>
              <p className="text-body-regular-14 text-subtext">{post.text}</p>
            </div>
            <p className="text-caption-regular-12 text-subtext">
              {post.keywords.map((keyword) => `#${keyword}`).join("　")}
            </p>
          </div>

          {!isReview && (
            <BtnSmall
              className="self-end !bg-offblack !text-offwhite"
              onClick={() => setIsRecommendationOpen(true)}
            >
              추천하기
            </BtnSmall>
          )}
        </article>
      </main>

      {!isReview && (
        <CommunityRecommendationSelectSheet
          open={isRecommendationOpen}
          recipientName={post.profileName}
          onClose={() => setIsRecommendationOpen(false)}
        />
      )}
    </>
  );
}
