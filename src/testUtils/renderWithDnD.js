import React from "react";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { DragWrapper, DropWrapper } from "./DnDWrapper";

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
                <BrowserRouter>
                    {isDrag ? DragWrapper(children) : DropWrapper(children)}
                </BrowserRouter>
            </Provider>
        );
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
