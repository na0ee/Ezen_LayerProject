import checkGrey from '../../assets/icons/check-grey.svg'
import checkWhite from '../../assets/icons/check-white.svg'

// 피그마: checkBox (속성 1=orange | white) — orange=선택됨, white=미선택
export default function CheckBox({ variant = 'orange', className = '', ...rest }) {
  const isWhite = variant === 'white'
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={!isWhite}
      className={`flex size-5 items-center justify-center rounded-full ${
        isWhite ? 'border border-light-grey bg-offwhite' : 'bg-point-orange'
      } ${className}`}
      {...rest}
    >
      <img src={isWhite ? checkGrey : checkWhite} alt="" className="size-4" />
    </button>
  )
}
