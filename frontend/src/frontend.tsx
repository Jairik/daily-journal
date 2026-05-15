/**
 * Entry point. Renders <App/> into #root and preserves the React root
 * across HMR reloads via import.meta.hot.data.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

(import.meta.hot.data.root ??= createRoot(elem)).render(app);
