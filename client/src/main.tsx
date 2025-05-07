import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import FormsCtxProvider from "./core/contexts/FormsCtx/FormsCtxProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <SocketCtxProvider> */}
    <Provider {...{ store }}>
      <FormsCtxProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FormsCtxProvider>
    </Provider>
    {/* </SocketCtxProvider> */}
  </StrictMode>
);
