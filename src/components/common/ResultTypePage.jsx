import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import chevronRight from '../../assets/icons/chevron-right-grey.svg'
import graphGrid from '../../assets/images/result/bold-signature/graph-grid.svg'
import BtnBig from './BtnBig'
import FeatureGuideCard from './FeatureGuideCard'
import Header from './Header'
import ResultPerfumeCard from './ResultPerfumeCard'

function ProfileChart({ image, imageClassName = 'h-[127px] w-[138px]', alt }) {
  return (
    <div className="relative mx-auto h-[244px] w-[302px] text-[10px] font-semibold">
      <div className="result-chart-grid absolute left-1/2 top-[22px] size-[200px] -translate-x-1/2">
        <img src={graphGrid} alt="" className="absolute inset-0 size-full" />
        <img
          src={image}
          alt={alt}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain ${imageClassName}`}
        />
      </div>
      <span className="absolute left-1/2 top-0 -translate-x-1/2">Expressive</span>
      <span className="absolute left-0 top-[116px]">Classic</span>
      <span className="absolute right-0 top-[116px]">Unique</span>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2">Comforting</span>
    </div>
  )
}

export default function ResultTypePage({
  heroImage,
  heroAlt,
  koreanTitle,
  englishTitle,
  tags,
  description,
  graphImage,
  graphAlt,
  graphImageClassName,
  perfumes,
}) {
  const navigate = useNavigate()
  const sliderRef = useRef(null)
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 })
  const didDragRef = useRef(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isGuideOpen, setIsGuideOpen] = useState(true)

  useEffect(() => {
    const handleGuideChange = (event) => {
      setIsGuideOpen(Boolean(event.detail))
    }

    window.addEventListener('layer:guide-change', handleGuideChange)
    return () =>
      window.removeEventListener('layer:guide-change', handleGuideChange)
  }, [])

  const handlePointerDown = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return

    const slider = sliderRef.current
    if (!slider) return

    dragStartRef.current = {
      x: event.clientX,
      scrollLeft: slider.scrollLeft,
    }
    didDragRef.current = false
    setIsDragging(true)
    slider.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event) => {
    if (!isDragging || event.pointerType !== 'mouse') return

    const slider = sliderRef.current
    if (!slider) return

    if (Math.abs(event.clientX - dragStartRef.current.x) > 6) {
      didDragRef.current = true
    }
    slider.scrollLeft =
      dragStartRef.current.scrollLeft - (event.clientX - dragStartRef.current.x)
  }

  const stopDragging = (event) => {
    if (!isDragging) return

    const slider = sliderRef.current
    if (slider?.hasPointerCapture(event.pointerId)) {
      slider.releasePointerCapture(event.pointerId)
    }
    setIsDragging(false)
  }

  return (
    <main
      onPointerDown={() => setIsGuideOpen(false)}
      className="mx-auto min-h-[var(--app-height,100dvh)] max-w-[430px] overflow-hidden bg-background pb-[env(safe-area-inset-bottom)]"
    >
      {isGuideOpen && (
        <>
          <div className="feature-guide-overlay pointer-events-none fixed inset-0 z-[150] bg-black/55" />
          <div className="pointer-events-none fixed left-1/2 top-1/2 z-[170] -translate-x-1/2 -translate-y-1/2">
            <FeatureGuideCard characterPosition="right" size="compact">
              나만의 향수 유형을 찾았어요!
              <br />
              결과를 확인했다면 홈으로 이동해 볼까요?
            </FeatureGuideCard>
          </div>
        </>
      )}

      <Header variant="result" />

      <div className="px-5 pb-[60px] pt-3">
        <section className="relative z-[160] flex flex-col items-center">
          <img
            src={heroImage}
            alt={heroAlt}
            className="h-[263px] w-full rounded-[15px] object-cover"
          />

          <div className="mt-[30px] w-full text-center">
            <p className="text-subtitle-regular-16 text-offblack70">{koreanTitle}</p>
            <h1 className="font-en text-[54px] font-semibold italic leading-[normal] tracking-[-1.08px]">
              {englishTitle}
            </h1>
            <div className="mt-1.5 flex justify-center gap-[5px]">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-offblack px-2.5 py-[3px] text-[10px] text-white">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-3 text-body-medium-14 text-offblack70">{description}</p>
          </div>

          <div className="mt-[52px]">
            <ProfileChart
              image={graphImage}
              alt={graphAlt}
              imageClassName={graphImageClassName}
            />
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-title-semibold-24">추천 향수</h2>
            <button type="button" className="flex items-center gap-1.5 text-caption-medium-12 text-grey">
              더보기
              <img src={chevronRight} alt="" className="size-[18px]" />
            </button>
          </div>
          <div
            ref={sliderRef}
            className={`scroll-rail-page-gutter -mx-5 mt-5 flex w-[calc(100%+40px)] select-none gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            onDragStart={(event) => event.preventDefault()}
          >
            {perfumes.map((perfume) => (
              <ResultPerfumeCard
                key={perfume.id}
                {...perfume}
                onClick={() => {
                  if (didDragRef.current) {
                    didDragRef.current = false
                    return
                  }
                  navigate(`/perfume/${perfume.id}`)
                }}
              />
            ))}
          </div>
        </section>

        <BtnBig className="relative z-[160] mt-[60px]" onClick={() => navigate('/home')}>
          <span className="font-en text-xl font-medium">LAYER</span>
          <span className="ml-1 text-base font-normal">에서 나만의 향수 찾기</span>
        </BtnBig>
      </div>
    </main>
  )
}
