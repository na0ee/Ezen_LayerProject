// 피그마: loginInput — 46px 알약형 입력 필드 (로그인/회원가입용)
// label은 화면에 안 보이고 스크린리더에만 읽힘. type/value/onChange 등 input props 그대로 전달
export default function LoginInput({ label, className = '', ...rest }) {
  return (
    <label
      className={`flex h-11.5 w-full items-center rounded-[50px] border border-light-grey bg-offwhite pl-6 ${className}`}
    >
      <span className="sr-only">{label}</span>
      <input
        className="min-w-0 flex-1 bg-transparent text-body-regular-14 text-offblack outline-none placeholder:text-subtext"
        {...rest}
      />
    </label>
  )
}
