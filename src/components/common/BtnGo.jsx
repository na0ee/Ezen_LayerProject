import chevronGrey from '../../assets/icons/chevron-right-grey.svg'
import chevronWhite from '../../assets/icons/chevron-right-white.svg'
import sparkles from '../../assets/icons/sparkles.svg'

// 피그마: btn-go (속성 1=go | more | more2 | ai | raffle | record)
const LABELS = {
  go: '참여하기',
  more: '전체보기',
  more2: '자세히 보기',
  record: '기록하기',
  raffle: '응모하기',
  ai: 'AI추천받기',
}

export default function BtnGo({ variant = 'more', children, className = '', ...rest }) {
  const label = children ?? LABELS[variant]

  if (variant === 'go') {
    return (
      <button
        type="button"
        className={`w-fit shrink-0 text-body-medium-14-line text-point-orange ${className}`}
        {...rest}
      >
        {label}
      </button>
    )
  }

  if (variant === 'raffle') {
    return (
      <button
        type="button"
        className={`flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-offblack/20 py-2 pl-4 pr-2.5 ${className}`}
        {...rest}
      >
        <span className="text-body-regular-14 text-offwhite">{label}</span>
        <img src={chevronWhite} alt="" className="size-4.5" />
      </button>
    )
  }

  return (
    <button
      type="button"
      className={`flex w-fit shrink-0 items-center gap-1 ${className}`}
      {...rest}
    >
      {variant === 'ai' && <img src={sparkles} alt="" className="size-4" />}
      <span className="flex items-center gap-1.5">
        <span className="text-body-regular-14 text-grey">{label}</span>
        <img src={chevronGrey} alt="" className="size-4.5" />
      </span>
    </button>
  )
}
