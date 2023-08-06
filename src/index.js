import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./Store/AuthContext"


ReactDOMClient.createRoot(document.getElementById("root")).render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
    );

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
