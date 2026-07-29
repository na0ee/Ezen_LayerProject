import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Preview from "./Preview";

// preview.html 전용 진입점. main.jsx를 건드리지 않고도 화면을 볼 수 있게 남겨둔다.
// Header 등 공통 컴포넌트가 라우터를 쓰므로 BrowserRouter로 감싼다.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Preview />
    </BrowserRouter>
  </StrictMode>,
);
