import bellBlack from '../../assets/icons/icon-bell-black.svg'
import bellWhite from '../../assets/icons/icon-bell-white.svg'
import chevron from '../../assets/icons/chevron-right-black.svg'
import editPencil from '../../assets/icons/edit-pencil.svg'
import logoBlack from '../../assets/icons/logo-layer-black.svg'
import logoWhite from '../../assets/icons/logo-layer-white.svg'
import searchBlack from '../../assets/icons/icon-search-black.svg'
import searchWhite from '../../assets/icons/icon-search-white.svg'
import shareResult from '../../assets/icons/share-result.svg'
import xIcon from '../../assets/icons/x-black.svg'
import { useNavigate } from 'react-router-dom'
import BtnSmall from './BtnSmall'

// 피그마: header (Property 1=main | main2 | detail | detail-back | write | write-tit | community | community-back)
// main: 흰 로고+흰 아이콘(배너 위), main2: 검정 로고+검정 아이콘
function IconButton({ src, label, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      data-guide-community-write={label === '글쓰기' ? '' : undefined}
      onClick={onClick}
      className="size-7 shrink-0"
    >
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
  onShare,
  transparent = false,
  hideActions = false,
  className = '',
}) {
  const navigate = useNavigate()
  const isWhite = variant === 'main'
  const hasBg = !transparent && !['main', 'main2', 'result'].includes(variant)
  const handleBack = onBack ?? (() => navigate(-1))

  return (
    <header
      data-app-header
      data-header-variant={variant}
      className={`flex h-[calc(54px+env(safe-area-inset-top))] w-full items-center justify-between px-5 pt-[env(safe-area-inset-top)] ${
        hasBg ? 'bg-offwhite' : ''
      } ${className}`}
    >
      <div
        className={`flex items-center ${
          variant === 'community-back' ? 'gap-0' : 'gap-3'
        }`}
      >
        {['main', 'main2', 'result'].includes(variant) && (
          <img
            src={isWhite ? logoWhite : logoBlack}
            alt="Layer"
            className="h-7.5 w-18"
          />
        )}
        {['detail-back', 'community-back'].includes(variant) && (
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={handleBack}
            className={`shrink-0 ${
              variant === 'community-back' ? 'size-[21px]' : 'size-5'
            }`}
          >
            <img
              src={chevron}
              alt=""
              className={`rotate-180 ${
                variant === 'community-back' ? 'size-[21px]' : 'size-5'
              }`}
            />
          </button>
        )}
        {['write', 'write-tit'].includes(variant) && (
          <button type="button" aria-label="닫기" onClick={onClose} className="size-5 shrink-0">
            <img src={xIcon} alt="" className="size-5" />
          </button>
        )}
        {['detail', 'detail-back', 'write-tit', 'community', 'community-back'].includes(variant) && (
          <span className="text-title-medium-20 text-offblack">{title}</span>
        )}
      </div>

      <div className="flex items-center gap-5">
        {variant === 'result' && (
          <IconButton src={shareResult} label="결과 공유하기" onClick={onShare} />
        )}
        {!hideActions && ['main', 'main2', 'detail', 'detail-back'].includes(variant) && (
          <>
            <IconButton
              src={isWhite ? searchWhite : searchBlack}
              label="검색"
              onClick={onSearch ?? (() => navigate('/category'))}
            />
            <IconButton
              src={isWhite ? bellWhite : bellBlack}
              label="알림"
              onClick={onBell ?? (() => navigate('/alarm'))}
            />
          </>
        )}
        {['community', 'community-back'].includes(variant) && (
          <>
            <IconButton src={editPencil} label="글쓰기" onClick={onEdit} />
            <IconButton
              src={bellBlack}
              label="알림"
              onClick={onBell ?? (() => navigate('/alarm'))}
            />
          </>
        )}
        {['write', 'write-tit'].includes(variant) && (
          <BtnSmall onClick={onSave}>{saveLabel}</BtnSmall>
        )}
      </div>
    </header>
  )
}
