// 피그마: btn-big (속성 1=Default | disable)
export default function BtnBig({ children, disabled = false, className = '', ...rest }) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`flex w-full items-center justify-center rounded-[32px] py-3.5 text-btn-cta text-offwhite ${
        disabled ? 'bg-grey' : 'bg-offblack'
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
