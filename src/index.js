import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { setupStore } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { loadState, saveState } from "./localStorage";

const store = setupStore(loadState());
store.subscribe(() => {
    saveState(store.getState());
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Router>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </Router>
        </LocalizationProvider>
    </Provider>
);
