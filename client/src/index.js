import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./context/Provider"; // import your context provider

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  // <React.StrictMode>
    <Provider> {/* wrap everything inside the Provider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
);