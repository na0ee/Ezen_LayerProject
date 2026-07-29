import { useEffect, useState } from "react";
import layerLogo from "../assets/icons/logo-layer-white.svg";

const VIEW_MODES = [
  { id: "mockup", label: "MOCKUP", width: 430 },
  { id: "430", label: "430PX", width: 430 },
  { id: "390", label: "390PX", width: 390 },
];

export default function DesktopFrame({ children }) {
  const [viewMode, setViewMode] = useState("430");
  const [guideVisible, setGuideVisible] = useState(true);
  const activeMode =
    VIEW_MODES.find((mode) => mode.id === viewMode) ?? VIEW_MODES[1];
  const appWidth = activeMode.width;
  const isMockup = viewMode === "mockup";

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--desktop-app-width",
      `${appWidth}px`,
    );
    document.documentElement.dataset.desktopView = viewMode;
    window.dispatchEvent(
      new CustomEvent("layer:view-change", { detail: viewMode }),
    );

    return () => {
      delete document.documentElement.dataset.desktopView;
    };
  }, [appWidth, viewMode]);

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
              {VIEW_MODES.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  aria-pressed={viewMode === mode.id}
                  onClick={() => setViewMode(mode.id)}
                  className={viewMode === mode.id ? "is-active" : ""}
                >
                  {mode.label}
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
        className={`desktop-app${guideVisible ? " desktop-app-guide" : ""}${
          isMockup ? " desktop-app-mockup" : ""
        }`}
      >
        {isMockup ? (
          <>
            <div className="desktop-mockup-hardware" aria-hidden="true">
              <div className="desktop-mockup-statusbar" />
              <span className="desktop-mockup-island" />
            </div>
            <div className="desktop-mockup-viewport">{children}</div>
          </>
        ) : (
          children
        )}
      </main>
    </div>
  );
}
