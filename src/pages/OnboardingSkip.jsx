import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import skipCenter from "../assets/images/onboarding/skip-center.png";
import skipLeft from "../assets/images/onboarding/skip-left.png";
import skipRight from "../assets/images/onboarding/skip-right.png";

export default function OnboardingSkip() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate("/home", { replace: true });
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-[430px] items-center justify-center overflow-hidden bg-background px-5 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
      <section className="text-center">
        <div className="relative mx-auto h-[61px] w-[169px]">
          <span
            className="onboarding-skip-bounce absolute left-0 top-0 size-[61px]"
            style={{ "--bounce-delay": "0ms" }}
          >
            <img src={skipLeft} alt="" className="size-full -scale-x-100" />
          </span>
          <span
            className="onboarding-skip-bounce absolute left-[54px] top-0 size-[61px]"
            style={{ "--bounce-delay": "180ms" }}
          >
            <img src={skipRight} alt="" className="size-full -scale-x-100" />
          </span>
          <span
            className="onboarding-skip-bounce absolute right-0 top-0 size-[61px]"
            style={{ "--bounce-delay": "360ms" }}
          >
            <img src={skipCenter} alt="" className="size-full" />
          </span>
        </div>

        <p className="mt-10 whitespace-nowrap text-body-medium-16 tracking-[-0.32px] text-offblack">
          향수 유형 검사는
          <br />
          <span className="text-point-orange">마이페이지</span>에서 다시 할 수 있어요!
        </p>
      </section>
    </main>
  );
}
