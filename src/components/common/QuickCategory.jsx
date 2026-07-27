// 피그마: quickcategory (Property 1=Selected | Default | under)
const VARIANTS = {
  selected: "bg-offblack text-offwhite",
  default: "border border-light-grey bg-offwhite text-subtext",
  under: "border border-2light-grey bg-2light-grey text-subtext",
};

export default function QuickCategory({
  variant = "default",
  children,
  className = "",
  ...rest
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center rounded-[100px] px-4 py-3 text-caption-regular-12 ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
