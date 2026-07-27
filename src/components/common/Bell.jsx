import bellNone from '../../assets/icons/bell-none.svg'
import bellRing from '../../assets/icons/bell-ring.svg'

// 피그마: bell (속성 2=ring | none) — ring=새 알림(주황), none=기본(회색)
export default function Bell({ variant = 'ring', className = '', ...rest }) {
  return (
    <button
      type="button"
      aria-label="알림"
      className={`flex size-6 items-center justify-center ${className}`}
      {...rest}
    >
      <img
        src={variant === 'ring' ? bellRing : bellNone}
        alt=""
        className="h-[20px] w-auto"
      />
    </button>
  )
}
