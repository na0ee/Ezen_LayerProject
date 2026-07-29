import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoLayerWhite from "../assets/icons/logo-layer-white.svg";
import splashAnimation from "../assets/images/splash.webp";

export default function Splash() {
  const navigate = useNavigate();
  const goToLogin = useCallback(() => {
    navigate("/login", { replace: true });
  }, [navigate]);

  useEffect(() => {
    const timer = window.setTimeout(goToLogin, 5000);

    return () => window.clearTimeout(timer);
  }, [goToLogin]);

  return (
    <main
      className="fixed left-1/2 top-0 h-[var(--app-height,100dvh)] w-full max-w-[430px] -translate-x-1/2 cursor-pointer overflow-hidden bg-offblack"
      onClick={goToLogin}
      role="button"
      tabIndex={0}
      aria-label="스플래시 건너뛰기"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          goToLogin();
        }
      }}
    >
      <img
        className="pointer-events-none absolute left-1/2 top-0 h-full min-w-full -translate-x-1/2 object-cover"
        src={splashAnimation}
        alt=""
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-offblack/30" aria-hidden="true" />

      <div className="absolute left-1/2 top-1/2 flex w-[calc(100%_-_40px)] max-w-[320px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[17px]">
        <img
          src={logoLayerWhite}
          alt="Layer"
          className="h-auto w-full"
        />
        <p className="whitespace-nowrap font-en text-[clamp(17px,5.6vw,24px)] font-semibold leading-normal tracking-[-0.02em] text-offwhite">
          Find your scent, leave your trace
        </p>
      </div>

      <p className="absolute inset-x-0 bottom-[calc(12px+env(safe-area-inset-bottom))] text-center font-en text-[clamp(12px,3.7vw,16px)] font-semibold leading-normal tracking-[-0.02em] text-offwhite">
        ⓒ 2026 LAYER. All rights reserved.
      </p>
    </main>
  );
}
