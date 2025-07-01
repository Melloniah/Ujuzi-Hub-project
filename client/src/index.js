import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import { Provider } from "./context/Provider";


const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
    
  );

