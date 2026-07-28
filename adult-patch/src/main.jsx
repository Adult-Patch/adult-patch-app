import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/brand.css";
import "./styles/recommendation.css";
import "./styles/explore.css";
import "./styles/layout-fix.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("root 요소를 찾을 수 없습니다.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);