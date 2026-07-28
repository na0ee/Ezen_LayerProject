import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fallbackOne from "../assets/images/onboarding/q1-none.png";
import fallbackTwo from "../assets/images/onboarding/q2-travel.png";
import fallbackThree from "../assets/images/onboarding/q3-floral.png";

const FALLBACK_IMAGES = [fallbackOne, fallbackTwo, fallbackThree];
const RESULT_STORAGE_KEY = "layer-onboarding-result-path";

export default function OnboardingLoading() {
  const location = useLocation();
  const navigate = useNavigate();
  const images = useMemo(
    () => location.state?.images?.slice(0, 3) ?? FALLBACK_IMAGES,
    [location.state]
  );
  const resultPath =
    location.state?.resultPath ??
    sessionStorage.getItem(RESULT_STORAGE_KEY) ??
    "/onboarding/1";

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate(resultPath, { replace: true });
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [navigate, resultPath]);

  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-[430px] items-center justify-center overflow-hidden bg-white">
      <section className="text-center">
        <div className="relative mx-auto h-[61px] w-[168px]">
          {images.map((image, index) => (
            <span
              key={`${image}-${index}`}
              className="onboarding-skip-bounce absolute top-0 size-[61px] overflow-hidden rounded-full"
              style={{
                "--bounce-delay": `${index * 180}ms`,
                left: `${index * 54}px`,
                zIndex: 3 - index,
              }}
            >
              <img src={image} alt="" className="size-full object-cover" />
            </span>
          ))}
        </div>

        <p className="mt-10 whitespace-nowrap text-title-semibold-24 tracking-[-0.72px] text-black">
          취향이 멋지군요!
        </p>
      </section>
    </main>
  );
}
