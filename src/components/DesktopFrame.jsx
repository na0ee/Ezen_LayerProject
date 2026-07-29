import { useEffect, useState } from "react";
import layerLogo from "../assets/icons/logo-layer-white.svg";

const APP_WIDTHS = [430, 390];

export default function DesktopFrame({ children }) {
  const [appWidth, setAppWidth] = useState(430);
  const [guideVisible, setGuideVisible] = useState(true);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--desktop-app-width",
      `${appWidth}px`,
    );
  }, [appWidth]);

  useEffect(() => {
    document.documentElement.dataset.guideEnabled = String(guideVisible);
    window.dispatchEvent(
      new CustomEvent("layer:guide-change", { detail: guideVisible }),
    );
  }, [guideVisible]);

  return (
    <div
      className="desktop-shell"
      style={{ "--desktop-app-width": `${appWidth}px` }}
    >
      <aside className="desktop-brand" aria-label="LAYER desktop guide">
        <div className="desktop-brand-content">
          <div className="desktop-lockup">
            <img src={layerLogo} alt="Layer" className="desktop-layer-logo" />
            <p>Find your scent, leave your trace</p>
          </div>

          <div className="desktop-controls">
            <div className="desktop-size-controls" aria-label="웹앱 너비 선택">
              {APP_WIDTHS.map((width) => (
                <button
                  key={width}
                  type="button"
                  aria-pressed={appWidth === width}
                  onClick={() => setAppWidth(width)}
                  className={appWidth === width ? "is-active" : ""}
                >
                  {width}px
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-pressed={guideVisible}
              onClick={() => setGuideVisible((visible) => !visible)}
              className={`desktop-guide-toggle glass-surface-dark glass-rim-light${
                guideVisible ? "" : " is-inactive"
              }`}
            >
              GUIDE {guideVisible ? "ON" : "OFF"}
            </button>
          </div>
        </div>
      </aside>

      <main
        className={`desktop-app${guideVisible ? " desktop-app-guide" : ""}`}
      >
        {children}
      </main>
    </div>
  );
}
