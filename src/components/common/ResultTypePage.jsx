import { useRef, useState } from 'react'
import chevronRight from '../../assets/icons/chevron-right-grey.svg'
import graphGrid from '../../assets/images/result/bold-signature/graph-grid.svg'
import BtnBig from './BtnBig'
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
  const sliderRef = useRef(null)
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const handlePointerDown = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return

    const slider = sliderRef.current
    if (!slider) return

    dragStartRef.current = {
      x: event.clientX,
      scrollLeft: slider.scrollLeft,
    }
    setIsDragging(true)
    slider.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event) => {
    if (!isDragging || event.pointerType !== 'mouse') return

    const slider = sliderRef.current
    if (!slider) return

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
    <main className="mx-auto min-h-screen max-w-[430px] overflow-hidden bg-background">
      <Header variant="result" />

      <div className="px-5 pb-[60px] pt-3">
        <section className="flex flex-col items-center">
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
            className={`-mr-5 mt-5 flex select-none gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            onDragStart={(event) => event.preventDefault()}
          >
            {perfumes.map((perfume) => (
              <ResultPerfumeCard key={perfume.name} {...perfume} />
            ))}
            <span aria-hidden="true" className="w-3 shrink-0" />
          </div>
        </section>

        <BtnBig className="mt-[60px]" onClick={() => window.location.assign('/')}>
          <span className="font-en text-xl font-medium">LAYER</span>
          <span className="ml-1 text-base font-normal">에서 나만의 향수 찾기</span>
        </BtnBig>
      </div>
    </main>
  )
}
