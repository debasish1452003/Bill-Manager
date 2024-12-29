import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import billReducer from "./redux/reducers/billReducer"; // Adjust the path as needed
import "./index.css";

const store = configureStore({ reducer: { billManager: billReducer } });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
