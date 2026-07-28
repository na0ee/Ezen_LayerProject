export default function ResultPerfumeCard({ name, brand, image }) {
  return (
    <article className="w-[156px] shrink-0 text-center">
      <div className="size-[156px] overflow-hidden rounded-lg bg-2light-grey">
        <img src={image} alt={name} className="size-full object-cover" />
      </div>
      <h3 className="mt-2.5 truncate text-body-regular-14">{name}</h3>
      <p className="mt-1 truncate text-caption-medium-12 text-grey">{brand}</p>
    </article>
  )
}
