import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { fetchCurrentUser } from "./app/slices/session";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <ToastContainer />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

store.dispatch(fetchCurrentUser());
