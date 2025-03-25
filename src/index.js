import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for React 18
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // Router import to enable routing

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter> 
    {/* Wrap the App with BrowserRouter to enable routing */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
