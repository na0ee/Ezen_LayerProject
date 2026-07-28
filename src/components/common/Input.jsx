import sendIcon from "../../assets/icons/send.svg";

// 피그마: input (Property 1=Default | focused | ing)
// 상태는 자동 처리: 기본=회색 배경, 포커스/입력 중=흰 배경+테두리 (variant prop 불필요)
export default function Input({
  placeholder = "무엇이든지 물어보세요!",
  onSend,
  className = "",
  ...rest
}) {
  return (
    <div
      className={`flex h-12.5 w-full items-center gap-2 rounded-4xl border border-transparent bg-2light-grey py-3 pl-4 pr-3 focus-within:border-light-grey focus-within:bg-offwhite ${className}`}
    >
      <input
        type="text"
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-chatbot-18 text-offblack outline-none placeholder:text-subtext"
        {...rest}
      />
      <button type="button" aria-label="전송" onClick={onSend} className="shrink-0">
        <img src={sendIcon} alt="" className="size-5 rotate-45" />
      </button>
    </div>
  );
}
