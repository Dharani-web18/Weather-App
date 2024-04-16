// Importing necessary dependencies
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Creating a root for ReactDOM
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the App component within a StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
