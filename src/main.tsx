import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Suppress benign layout/resize observer or script error exceptions that trigger full page reloads in iframe
if (typeof window !== "undefined") {
  window.addEventListener("error", (e) => {
    const ignoredErrors = [
      "ResizeObserver",
      "Script error",
      "unhandledrejection",
      "Cannot read properties of null",
      "reading 'contains'",
      "reading 'ownerDocument'"
    ];
    if (e.message && ignoredErrors.some(err => e.message.includes(err))) {
      e.stopImmediatePropagation();
      e.preventDefault();
      console.warn("Suppressed benign iframe/render error:", e.message);
    }
  });

  window.addEventListener("unhandledrejection", (e) => {
    e.stopImmediatePropagation();
    e.preventDefault();
    console.warn("Suppressed unhandled promise rejection in preview:", e.reason);
  });
}

// Unregister any existing service workers that might cause reload loops
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister();
    }
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

