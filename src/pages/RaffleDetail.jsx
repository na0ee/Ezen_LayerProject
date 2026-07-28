import { useEffect, useRef, useState } from "react";
import { BtnBig, Header } from "../components/common";
import detailContent1 from "../assets/images/raffle/detail-content-1.png";
import detailContent2 from "../assets/images/raffle/detail-content-2.png";

const details = [
  ["모집 기간", "26.07.07 (화) ~ 26.07.09 (목)"],
  ["모집 현황", "123명"],
  ["당첨발표", "26.07.13 (월) 예정"],
  ["당첨인원", "10명"],
];

const resultDate = "26.07.13 (월)";

export default function RaffleDetail({ raffle, onBack, onApplied }) {
  const contentRef = useRef(null);
  const [showGradient, setShowGradient] = useState(false);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setShowGradient(entry.isIntersecting),
      { threshold: 0.05 },
    );

    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto min-h-screen w-full max-w-107.5 bg-background">
      <Header
        variant="detail-back"
        title="래플 응모하기"
        onBack={onBack}
        className="sticky top-0 z-30 bg-offwhite"
      />

      <main className="px-5 pt-6 pb-28">
        <section className="flex flex-col gap-3">
          <div className="h-84.5 w-full overflow-hidden">
            <img
              src={raffle.img}
              alt={raffle.name}
              className="size-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-7.5">
            <div className="flex flex-col items-center gap-4.5">
              <div className="relative flex w-full flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-title-semibold-24 text-offblack">
                    {raffle.detailName}
                  </h1>
                  <span className="rounded bg-point-orange2 px-2 py-1.25 text-caption-semibold-10 text-point-orange">
                    D-1
                  </span>
                </div>
                <p className="text-body-medium-14 text-subtext">
                  {raffle.detailBrand}
                </p>
              </div>
              <div className="h-0.75 w-full bg-linear-to-r from-point-orange from-[57%] to-2light-grey to-[57%]" />
            </div>

            <dl className="flex flex-col gap-2">
              {details.map(([label, value]) => (
                <div key={label} className="flex items-center gap-6">
                  <dt className="w-12.75 shrink-0 text-body-medium-14 text-offblack">
                    {label}
                  </dt>
                  <dd className="text-caption-regular-12 text-offblack">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section ref={contentRef} className="mt-6 border-t border-light-grey pt-6">
          <img
            src={detailContent1}
            alt={`${raffle.name} 제품 연출 이미지`}
            className="h-84.5 w-full object-cover"
          />
          <div className="relative h-84.5 w-full">
            <img
              src={detailContent2}
              alt={`${raffle.name} 사용 이미지`}
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent from-[55%] to-background" />
          </div>
        </section>
      </main>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-auto h-32 w-full max-w-107.5">
        <div
          className={`absolute inset-0 bg-linear-to-b from-transparent to-offwhite transition-opacity duration-500 ${
            showGradient ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="pointer-events-auto absolute inset-x-5 bottom-5">
          <BtnBig onClick={() => setPopup("confirm")}>응모하기</BtnBig>
        </div>
      </div>

      {popup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-offblack/50 px-5"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setPopup(null);
          }}
        >
          <div
            className="w-full max-w-97.5 rounded-2xl bg-offwhite p-5"
            role="dialog"
            aria-modal="true"
            aria-labelledby="raffle-popup-title"
          >
            {popup === "confirm" ? (
              <>
                <p
                  id="raffle-popup-title"
                  className="text-center text-title-semibold-18 text-offblack"
                >
                  {raffle.name}에
                  <br />
                  응모하시겠습니까?
                </p>
                <div className="mt-6 flex gap-2">
                  <BtnBig
                    className="border border-light-grey bg-offwhite !text-offblack"
                    onClick={() => setPopup(null)}
                  >
                    아니요
                  </BtnBig>
                  <BtnBig
                    onClick={() => {
                      onApplied?.(raffle.id);
                      setPopup("complete");
                    }}
                  >
                    예
                  </BtnBig>
                </div>
              </>
            ) : (
              <>
                <p
                  id="raffle-popup-title"
                  className="text-center text-title-semibold-18 text-offblack"
                >
                  응모가 완료되었습니다
                </p>
                <p className="mt-1 text-center text-body-regular-14 text-subtext">
                  추첨 결과는 {resultDate} 19:00에 발표됩니다
                </p>
                <BtnBig className="mt-6" onClick={() => setPopup(null)}>
                  확인
                </BtnBig>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
