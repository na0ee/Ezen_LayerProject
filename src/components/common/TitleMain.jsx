import BtnGo from "./BtnGo";

// 피그마: title-main (속성 1=title1 | title2 | title3)
// title1: 타이틀+전체보기+서브텍스트 / title2: 타이틀+전체보기 / title3: 타이틀+서브텍스트
// sub에는 JSX도 넣을 수 있음: sub={<>이번주 <span className="text-point-orange">5일</span> 기록했어요</>}
export default function TitleMain({
  variant = "title1",
  title,
  sub,
  actionVariant = "more",
  onMore,
  className = "",
}) {
  if (variant === "title2") {
    return (
      <div className={`flex w-full items-center justify-between ${className}`}>
        <h3 className="font-en text-en-title-28 text-offblack">{title}</h3>
        <BtnGo variant={actionVariant} onClick={onMore} />
      </div>
    );
  }

  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      <div
        className={`flex w-full items-center ${
          variant === "title1" ? "justify-between" : ""
        }`}
      >
        <h3 className="font-en text-en-title-28 text-offblack">{title}</h3>
        {variant === "title1" && (
          <BtnGo variant={actionVariant} onClick={onMore} />
        )}
      </div>
      <p className="text-subtitle-regular-16 text-offblack">{sub}</p>
    </div>
  );
}
