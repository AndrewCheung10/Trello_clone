import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { createRoot } from "react-dom/client";

const container =
    document.getElementById("root") || document.createElement("div");
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Router>
                <App />
            </Router>
        </LocalizationProvider>
    </Provider>
);
