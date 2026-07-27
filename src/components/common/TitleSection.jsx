import BtnGo from "./BtnGo";

// 피그마: title-section (Property 1=Default | button)
export default function TitleSection({
  variant = "default",
  title,
  onMore,
  className = "",
}) {
  if (variant === "button") {
    return (
      <div className={`flex w-full items-center justify-between ${className}`}>
        <h3 className="text-title-semibold-24 text-offblack">{title}</h3>
        <BtnGo variant="more" onClick={onMore} />
      </div>
    );
  }

  return (
    <h3 className={`text-title-semibold-24 text-offblack ${className}`}>
      {title}
    </h3>
  );
}
