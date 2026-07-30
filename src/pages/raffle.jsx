import { useState } from "react";
import { CardInfo, Header, Tab } from "../components/common";
import RaffleDetail from "./RaffleDetail";
import byredoImg from "../assets/images/raffle/byredo.avif";
import creedImg from "../assets/images/raffle/creed.avif";
import hermesImg from "../assets/images/raffle/hermes.avif";
import kilianImg from "../assets/images/raffle/kilian.avif";
import maisonMargielaImg from "../assets/images/raffle/maison-margiela.avif";
import { allPerfumes } from "../data/perfumeUtils";

const filters = ["전체", "진행중", "오픈 전", "참여완료"];

const raffles = [
  {
    id: 1,
    perfumeId: 1,
    status: "오픈 전",
    type: "a",
    img: maisonMargielaImg,
    brand: "MAISON MARGIELA FRAGRANCES",
    name: "레이지 선데이 모닝",
    detailName: "Lazy Sunday Morning",
    detailBrand: "Maison Margiela Fragrances",
    keywords: ["알데하이드", "피오니", "머스크"],
    bellVariant: "ring",
  },
  {
    id: 2,
    status: "오픈 전",
    type: "a",
    img: kilianImg,
    brand: "KILIAN",
    name: "엔젤스 쉐어 50ML",
    detailName: "Angels' Share 50ML",
    detailBrand: "Kilian",
    keywords: ["꼬냑", "바닐라", "시나몬"],
    bellVariant: "ring",
  },
  {
    id: 3,
    perfumeId: 21,
    status: "진행중",
    type: "b",
    img: byredoImg,
    brand: "BYREDO",
    name: "블랑쉬 오 드 퍼퓸 50ML",
    detailName: "Blanche Eau de Parfum 50ML",
    detailBrand: "Byredo",
    keywords: ["알데하이드", "화이트머스크", "로즈"],
    bellVariant: "none",
  },
  {
    id: 4,
    status: "진행중",
    type: "b",
    img: creedImg,
    brand: "CREED",
    name: "어벤투스 오 드 퍼퓸 50ML",
    detailName: "Aventus Eau de Parfum 50ML",
    detailBrand: "Creed",
    keywords: ["파인애플", "버치", "오크모스"],
    bellVariant: "none",
  },
  {
    id: 5,
    status: "종료",
    type: "b",
    img: hermesImg,
    brand: "HERMES",
    name: "운 자르뎅 수 르 닐 오 드 뜨왈렛 30ml",
    detailName: "Un Jardin Sur Le Nil 30ML",
    detailBrand: "Hermès",
    keywords: ["그린망고", "로터스", "인센스"],
    bellVariant: "ring",
  },
];

export default function Raffle({ onBack }) {
  const [activeFilter, setActiveFilter] = useState("전체");
  const [selectedRaffle, setSelectedRaffle] = useState(null);
  const [appliedRaffles, setAppliedRaffles] = useState([]);
  const [notifications, setNotifications] = useState(() =>
    Object.fromEntries(
      raffles.map((raffle) => [raffle.id, raffle.bellVariant === "ring"]),
    ),
  );

  const visibleRaffles =
    activeFilter === "전체"
      ? raffles
      : activeFilter === "참여완료"
        ? raffles.filter((raffle) => appliedRaffles.includes(raffle.id))
        : activeFilter === "진행중"
          ? raffles.filter(
              (raffle) =>
                raffle.type !== "a" && !appliedRaffles.includes(raffle.id),
            )
        : raffles.filter((raffle) => raffle.status === activeFilter);

  if (selectedRaffle) {
    const perfumeItem = allPerfumes.find(
      (item) => item.id === selectedRaffle.perfumeId,
    );

    return (
      <RaffleDetail
        raffle={{ ...selectedRaffle, perfumeItem }}
        onBack={() => setSelectedRaffle(null)}
        onApplied={(raffleId) =>
          setAppliedRaffles((current) =>
            current.includes(raffleId) ? current : [...current, raffleId],
          )
        }
      />
    );
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-107.5 bg-background">
      <Header
        variant="detail-back"
        title="래플응모하기"
        onBack={onBack}
        transparent
        className="sticky top-0 z-20"
      />

      <main className="flex flex-col gap-4 pt-6 pb-10">
        <div className="scroll-rail-page-gutter no-scrollbar flex gap-1.5 overflow-x-auto">
          {filters.map((filter) => (
            <Tab
              key={filter}
              active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className="shrink-0 whitespace-nowrap"
            >
              {filter}
            </Tab>
          ))}
        </div>

        <section className="flex flex-col gap-4 px-5" aria-label="래플 목록">
          {visibleRaffles.map((raffle) => (
            <CardInfo
              key={raffle.id}
              variant="raffle"
              type={raffle.type}
              img={raffle.img}
              brand={raffle.brand}
              name={raffle.name}
              keywords={raffle.keywords}
              day="오늘"
              time="20:00"
              overlayLabel={
                appliedRaffles.includes(raffle.id) ? "참여 완료" : undefined
              }
              bellVariant={notifications[raffle.id] ? "ring" : "none"}
              hideBell={appliedRaffles.includes(raffle.id)}
              onBell={() =>
                setNotifications((current) => ({
                  ...current,
                  [raffle.id]: !current[raffle.id],
                }))
              }
              onClick={
                raffle.status === "오픈 전"
                  ? undefined
                  : () => setSelectedRaffle(raffle)
              }
              className={`max-w-full ${
                raffle.status === "오픈 전" ? "cursor-default" : ""
              }`}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
