export default function ResultPerfumeCard({ name, brand, image, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-[156px] shrink-0 rounded-lg text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-point-orange"
      aria-label={`${brand} ${name} 상세 보기`}
    >
      <div className="size-[156px] overflow-hidden rounded-lg bg-2light-grey">
        <img
          src={image}
          alt={name}
          className="size-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 motion-reduce:transition-none"
        />
      </div>
      <h3 className="mt-2.5 truncate text-body-regular-14">{name}</h3>
      <p className="mt-1 truncate text-caption-medium-12 text-grey">{brand}</p>
    </button>
  )
}
