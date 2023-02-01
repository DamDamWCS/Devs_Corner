// eslint-disable-next-line import/no-extraneous-dependencies
import "@sncf/bootstrap-sncf.metier/dist/bootstrap-sncf.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
