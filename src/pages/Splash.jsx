import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logoLayerWhite from "../assets/icons/logo-layer-white.svg";
import splashVideo from "../assets/videos/splash.mp4";

export default function Splash() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const goToLogin = useCallback(() => {
    navigate("/login", { replace: true });
  }, [navigate]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.play().catch(() => {
        // 브라우저나 저전력 모드가 자동재생을 막으면 화면 클릭으로 바로 전환한다.
      });
    }

    const timer = window.setTimeout(goToLogin, 5000);

    return () => window.clearTimeout(timer);
  }, [goToLogin]);

  return (
    <main
      className="relative mx-auto h-[100dvh] min-h-[600px] w-full max-w-[430px] cursor-pointer overflow-hidden bg-offblack"
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
      <video
        ref={videoRef}
        className="pointer-events-none absolute left-1/2 top-0 h-full min-w-full -translate-x-1/2 object-cover"
        src={splashVideo}
        autoPlay
        muted
        defaultMuted
        playsInline
        preload="auto"
        aria-hidden="true"
        onCanPlay={(event) => event.currentTarget.play().catch(() => {})}
      />

      <div className="absolute inset-0 bg-offblack/30" aria-hidden="true" />

      <div className="absolute left-1/2 top-1/2 flex w-[calc(100%_-_40px)] max-w-[320px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[17px]">
        <img
          src={logoLayerWhite}
          alt="Layer"
          className="h-auto w-full"
        />
        <p className="whitespace-nowrap font-en text-en-title-24 tracking-[-0.02em] text-offwhite">
          Find your scent, leave your trace
        </p>
      </div>

      <p className="absolute inset-x-0 bottom-[12px] text-center font-en text-en-semibold-16 tracking-[-0.02em] text-offwhite">
        ⓒ 2026 LAYER. All rights reserved.
      </p>
    </main>
  );
}
