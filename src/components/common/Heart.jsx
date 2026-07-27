import heartAbled from '../../assets/icons/heart-abled.svg'
import heartGrey1 from '../../assets/icons/heart-grey1.svg'
import heartGrey2 from '../../assets/icons/heart-grey2.svg'
import heartGrey3 from '../../assets/icons/heart-grey3.svg'

// 피그마: heart (속성 1=abled | grey1 | grey2 | grey3)
// abled=주황(찜 활성), grey1=#ddd, grey2=#4d4d4d, grey3=#8a8a8a 외곽선
const ICONS = {
  abled: heartAbled,
  grey1: heartGrey1,
  grey2: heartGrey2,
  grey3: heartGrey3,
}

export default function Heart({ variant = 'abled', className = '', ...rest }) {
  return (
    <button
      type="button"
      aria-label="찜하기"
      className={`flex size-6 items-center justify-center ${className}`}
      {...rest}
    >
      <img src={ICONS[variant]} alt="" className="h-[17px] w-5" />
    </button>
  )
}
