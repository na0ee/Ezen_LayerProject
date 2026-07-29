import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/common";
import badgeNewbie from "../assets/images/grade-badge/badge-newbie.png";
import badgeBronze from "../assets/images/grade-badge/badge-bronze.png";
import badgeSilver from "../assets/images/grade-badge/badge-silver.png";
import badgeGold from "../assets/images/grade-badge/badge-gold.png";
import badgeVip from "../assets/images/grade-badge/badge-vip.png";
import badgeGrey from "../assets/images/grade-badge/badge-grey.png";
import badgeVipGrey from "../assets/images/grade-badge/badge-vip-grey.png";
import { getUserPoints } from "../data/userPoints";

// 참고 파일(MyMembershipPage.tsx)의 레이아웃/기능을 이 프로젝트 컴포넌트·토큰으로 이식
// 마이페이지의 "멤버십 등급 보기"에서 라우팅으로 진입하되, 화면은 팝업(바텀시트)처럼 렌더링
const pointBenefit = "포인트가 모이면 래플 응모권으로 교환할 수 있어요";

const tiers = [
  { key: "NEWBIE", icon: badgeNewbie, inactiveIcon: badgeGrey, height: 62, criteria: "2,000포인트 미만", benefit: pointBenefit },
  { key: "BRONZE", icon: badgeBronze, inactiveIcon: badgeGrey, height: 72, criteria: "2,000포인트 이상", benefit: pointBenefit },
  { key: "SILVER", icon: badgeSilver, inactiveIcon: badgeGrey, height: 82, criteria: "3,000포인트 이상", benefit: pointBenefit },
  { key: "GOLD", icon: badgeGold, inactiveIcon: badgeGrey, height: 92, criteria: "4,000포인트 이상", benefit: pointBenefit },
  { key: "VIP", icon: badgeVip, inactiveIcon: badgeVipGrey, height: 102, criteria: "5,000포인트 이상", benefit: pointBenefit },
];

const myBadge = "NEWBIE";

export default function MyMembershipPage() {
  const navigate = useNavigate();
  const myPoints = getUserPoints();
  const [selectedTier, setSelectedTier] = useState(myBadge);
  const activeTier = tiers.find((tier) => tier.key === selectedTier) ?? tiers[0];
  const goBack = () => navigate(-1);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[110] flex justify-center bg-offblack/40" onClick={goBack}>
      <section
        className="absolute bottom-0 left-1/2 flex max-h-[85dvh] w-full max-w-107.5 -translate-x-1/2 flex-col overflow-hidden rounded-t-2xl bg-background"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex h-7.5 w-full shrink-0 items-center justify-center bg-offwhite">
          <div className="h-1 w-8 rounded-full bg-light-grey" />
        </div>

        <Header variant="detail" title="멤버십 등급 안내" hideActions />

        <div className="flex flex-col gap-8 overflow-y-auto px-5 pt-6 pb-12.5">
          <div className="flex flex-col gap-4">
            <label className="text-body-semibold-16 text-offblack">나의 멤버십 등급</label>
            <div className="flex w-full flex-col gap-6 rounded-2xl border border-light-grey bg-offwhite p-4">
              <div className="flex items-center gap-3">
                <img alt="" className="h-14.75 w-15 object-contain" src={badgeNewbie} />
                <div className="flex flex-col">
                  <p className="text-title-medium-20 text-offblack">{myBadge}</p>
                  <div className="mt-1 flex items-center gap-1">
                    <span className="text-body-regular-14 text-grey">포인트</span>
                    <span className="text-body-medium-14 text-point-orange">
                      {myPoints.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-1.5 w-full rounded-full bg-linear-to-r from-[#f7f0bc] to-point-orange" />
              <p className="pl-1.5 text-body-regular-14 text-grey">
                    <span className="text-body-semibold-16 text-offblack">
                      {Math.max(0, 2000 - myPoints).toLocaleString()}P
                    </span>{" "}
                    더 쌓으면{" "}
                <span className="text-body-semibold-16 text-offblack">BRONZE</span> 등급 달성!
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-body-semibold-16 text-offblack">멤버십 등급 단계</label>
            <div className="flex w-full flex-col gap-6 rounded-2xl border border-light-grey bg-offwhite p-4">
              <div className="flex w-full items-end justify-between">
                {tiers.map((tier) => {
                  const isActive = tier.key === selectedTier;
                  return (
                    <button
                      key={tier.key}
                      type="button"
                      onClick={() => setSelectedTier(tier.key)}
                      style={{ height: tier.height }}
                      className={`flex w-14 flex-col items-center justify-end gap-2 rounded-t-lg border bg-offwhite pb-1.5 ${
                        isActive ? "border-point-orange" : "border-light-grey"
                      }`}
                    >
                      <img alt="" className="size-6" src={isActive ? tier.icon : tier.inactiveIcon} />
                      <span className={`text-caption-medium-12 ${isActive ? "text-offblack" : "text-subtext"}`}>
                        {tier.key}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex w-full flex-col gap-4">
                <p className="text-body-semibold-16 text-offblack">{activeTier.key}</p>
                <div className="flex flex-col gap-2">
                  <div className="flex w-full items-center gap-4">
                    <p className="shrink-0 text-caption-medium-12 text-offblack">기준</p>
                    <p className="text-caption-medium-12 text-offblack">{activeTier.criteria}</p>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <p className="shrink-0 text-caption-medium-12 text-offblack">포인트 혜택</p>
                    <p className="text-caption-medium-12 text-offblack">{activeTier.benefit}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
