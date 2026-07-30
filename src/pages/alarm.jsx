import { useState } from "react";
import { useNavigate } from "react-router-dom";
import raffleOpen from "../assets/alarm/raffle-open.avif";
import raffleResult from "../assets/alarm/raffle-result.avif";
import recommendation from "../assets/alarm/recommendation.avif";
import reviewReply from "../assets/alarm/review-reply.avif";
import newFollower from "../assets/alarm/new-follower.avif";
import { AlertCard, Header } from "../components/common";

const TODAY_NOTIFICATIONS = [
  {
    id: "raffle-open",
    image: raffleOpen,
    imageAlt: "레이지 선데이 모닝 향수",
    category: "래플",
    time: "방금 전",
    title: "알림받기한 향수 래플이 오픈됐어요",
    description:
      "Le Labo · 레이지 선데이 모닝 래플이 오늘 20시에 시작돼요.\n놓치지 말고 응모해 보세요.",
    accent: true,
  },
  {
    id: "raffle-result",
    image: raffleResult,
    imageAlt: "블랑쉬 오드 퍼퓸",
    category: "래플 결과",
    time: "2시간 전",
    title: "응모하신 래플 결과가 발표됐어요",
    description:
      "블랑쉬 오드 퍼퓸 50ML 래플 당첨 결과를 지금 확인해 보세요.",
    bordered: true,
  },
];

const WEEK_NOTIFICATIONS = [
  {
    id: "recommendation",
    image: recommendation,
    imageAlt: "바다를 바라보는 사람",
    category: "향추천",
    time: "3일 전",
    title: "내 피드에 향수 추천이 도착했어요",
    description:
      "'흐린 바다 냄새 같은 향수' 글에 유저들이 향수 3개를 추천해 줬어요.",
  },
  {
    id: "review-reply",
    image: reviewReply,
    imageAlt: "침구 위의 향수",
    category: "리뷰 답글",
    time: "4일 전",
    title: "내 리뷰에 댓글이 달렸어요",
    description:
      '"햇살 좋은 날의 베이지 룩" 리뷰에 새 댓글이 달렸어요.',
    accent: true,
    imageClassName: "object-bottom",
  },
  {
    id: "new-follower",
    image: newFollower,
    imageAlt: "새 팔로워의 프로필 사진",
    category: "팔로우",
    time: "5일 전",
    title: "새로운 팔로워가 생겼어요",
    description: "향기부자님이 회원님을 팔로우하기 시작했어요.",
    imageClassName: "object-[center_66%]",
  },
];

function NotificationGroup({ title, notifications, unreadIds, onRead }) {
  return (
    <section aria-labelledby={`alarm-${title}`}>
      <h1
        id={`alarm-${title}`}
        className="pb-2 pt-4 text-body-medium-14 text-grey"
      >
        {title}
      </h1>

      <div className="flex flex-col gap-3">
        {notifications.map((notification) => (
          <AlertCard
            key={notification.id}
            {...notification}
            unread={unreadIds.has(notification.id)}
            onClick={() => onRead(notification.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default function Alarm() {
  const navigate = useNavigate();
  const [unreadIds, setUnreadIds] = useState(
    () =>
      new Set(
        [...TODAY_NOTIFICATIONS, ...WEEK_NOTIFICATIONS]
          .filter((notification) => notification.accent)
          .map((notification) => notification.id),
      ),
  );

  const markAsRead = (id) => {
    setUnreadIds((current) => {
      if (!current.has(id)) return current;
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-offwhite">
      <div className="mx-auto min-h-screen w-full max-w-[430px] overflow-x-hidden bg-offwhite">
        <Header
          variant="detail-back"
          title="알림"
          onBack={() => navigate(-1)}
          onBell={() => navigate("/alarm")}
          className="[&>div:first-child]:!gap-0"
        />

        <main className="px-5 pb-[max(24px,env(safe-area-inset-bottom))]">
          <NotificationGroup
            title="오늘"
            notifications={TODAY_NOTIFICATIONS}
            unreadIds={unreadIds}
            onRead={markAsRead}
          />
          <NotificationGroup
            title="이번 주"
            notifications={WEEK_NOTIFICATIONS}
            unreadIds={unreadIds}
            onRead={markAsRead}
          />

          <p className="pb-2 pt-7 text-center text-caption-regular-12 text-light-grey">
            최근 30일간의 알림을 보여드려요
          </p>
        </main>
      </div>
    </div>
  );
}
