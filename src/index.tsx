import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  useTranslation,
  initReactI18next,
  I18nextProvider,
} from "react-i18next";
import i18n from "i18next";

import enTranslate from "./lang/en-translate.json";
import vnTranslate from "./lang/vn-translate.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslate },
    vn: { translation: vnTranslate },
  },
  lng: "en", // Ngôn ngữ mặc định
  fallbackLng: "en", // Ngôn ngữ dự phòng
  interpolation: { escapeValue: false },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
