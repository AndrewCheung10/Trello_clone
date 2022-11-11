import React from "react";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { DragWrapper, DropWrapper } from "./DnDWrapper";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export const renderWithDnD = (
    ui,
    {
        route = "/",
        store = configureStore()(),
        isDrag = false,
        ...renderOptions
    } = {}
) => {
    window.history.pushState({}, "Test page", route);

    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <BrowserRouter>
                        {isDrag ? DragWrapper(children) : DropWrapper(children)}
                    </BrowserRouter>
                </LocalizationProvider>
            </Provider>
        );
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
