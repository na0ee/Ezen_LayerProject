import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Preview from "./Preview";

// preview.html 전용 진입점. main.jsx를 건드리지 않고도 화면을 볼 수 있게 남겨둔다.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Preview />
  </StrictMode>,
);
