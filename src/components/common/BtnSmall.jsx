// 피그마: btn-small (속성 1=black | white)
const VARIANTS = {
  black: 'bg-offblack text-offwhite',
  white: 'bg-offwhite text-offblack border-[0.8px] border-light-grey',
}

export default function BtnSmall({ variant = 'black', children, className = '', ...rest }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-[50px] px-3.5 py-2 text-caption-medium-12 ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
