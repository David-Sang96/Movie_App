import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Routes from "./Routes/Router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Routes />
  </StrictMode>,
);
