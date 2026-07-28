import bellBlack from '../../assets/icons/icon-bell-black.svg'
import bellWhite from '../../assets/icons/icon-bell-white.svg'
import chevron from '../../assets/icons/chevron-right-black.svg'
import editPencil from '../../assets/icons/edit-pencil.svg'
import logoBlack from '../../assets/icons/logo-layer-black.svg'
import logoWhite from '../../assets/icons/logo-layer-white.svg'
import searchBlack from '../../assets/icons/icon-search-black.svg'
import searchWhite from '../../assets/icons/icon-search-white.svg'
import xIcon from '../../assets/icons/x-black.svg'
import { useNavigate } from 'react-router-dom'
import BtnSmall from './BtnSmall'

// 피그마: header (Property 1=main | main2 | detail | detail-back | write | write-tit | community)
// main: 흰 로고+흰 아이콘(배너 위), main2: 검정 로고+검정 아이콘
function IconButton({ src, label, onClick }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="size-7 shrink-0">
      <img src={src} alt="" className="size-7" />
    </button>
  )
}

export default function Header({
  variant = 'main',
  title = '',
  saveLabel = '임시저장',
  onBack,
  onClose,
  onSearch,
  onBell,
  onEdit,
  onSave,
  transparent = false,
  hideActions = false,
  className = '',
}) {
  const navigate = useNavigate()
  const isWhite = variant === 'main'
  const hasBg = !transparent && !['main', 'main2'].includes(variant)

  return (
    <header
      className={`flex h-13.5 w-full items-center justify-between px-5 ${
        hasBg ? 'bg-offwhite' : ''
      } ${className}`}
    >
      <div className="flex items-center gap-3">
        {['main', 'main2'].includes(variant) && (
          <img
            src={isWhite ? logoWhite : logoBlack}
            alt="Layer"
            className="h-7.5 w-18"
          />
        )}
        {variant === 'detail-back' && (
          <button type="button" aria-label="뒤로가기" onClick={onBack} className="size-5 shrink-0">
            <img src={chevron} alt="" className="size-5 rotate-180" />
          </button>
        )}
        {['write', 'write-tit'].includes(variant) && (
          <button type="button" aria-label="닫기" onClick={onClose} className="size-5 shrink-0">
            <img src={xIcon} alt="" className="size-5" />
          </button>
        )}
        {['detail', 'detail-back', 'write-tit', 'community'].includes(variant) && (
          <span className="text-title-medium-20 text-offblack">{title}</span>
        )}
      </div>

      <div className="flex items-center gap-5">
        {!hideActions && ['main', 'main2', 'detail', 'detail-back'].includes(variant) && (
          <>
            <IconButton
              src={isWhite ? searchWhite : searchBlack}
              label="검색"
              onClick={onSearch ?? (() => navigate('/category'))}
            />
            <IconButton src={isWhite ? bellWhite : bellBlack} label="알림" onClick={onBell} />
          </>
        )}
        {variant === 'community' && (
          <>
            <IconButton src={editPencil} label="글쓰기" onClick={onEdit} />
            <IconButton src={bellBlack} label="알림" onClick={onBell} />
          </>
        )}
        {['write', 'write-tit'].includes(variant) && (
          <BtnSmall onClick={onSave}>{saveLabel}</BtnSmall>
        )}
      </div>
    </header>
  )
}
