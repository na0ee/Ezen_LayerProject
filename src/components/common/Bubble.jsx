// 피그마: Bubble (속성 1=botBubble | userBubble) → variant="bot" | "user"
export default function Bubble({ variant = "bot", children, className = "" }) {
  const isBot = variant === "bot";
  return (
    <div
      className={`inline-block max-w-84.25 rounded-[20px] p-4 text-subtitle-regular-16 text-offblack ${
        isBot ? "border border-light-grey bg-offwhite" : "bg-light-grey"
      } ${className}`}
    >
      {children}
    </div>
  );
}
