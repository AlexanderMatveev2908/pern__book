import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import App from "./app/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./core/store/store.ts";
import FormsCtxProvider from "./core/contexts/FormsCtx/FormsCtxProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider {...{ store }}>
      <FormsCtxProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FormsCtxProvider>
    </Provider>
  </StrictMode>
);
