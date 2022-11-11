import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export const renderWithRouter = (
    ui,
    { route = "/", store = configureStore()(), ...renderOptions } = {}
) => {
    window.history.pushState({}, "Test page", route);

    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <BrowserRouter>{children}</BrowserRouter>
                </LocalizationProvider>
            </Provider>
        );
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
