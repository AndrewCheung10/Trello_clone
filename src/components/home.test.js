import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { Provider } from "react-redux";
import { setupStore } from "../app/store";
import { BrowserRouter } from "react-router-dom";

describe("Home", () => {
    it("List correct number of categories from store", () => {
        const store = setupStore();

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </Provider>
        );

        const container = screen.queryAllByLabelText("Category");
        expect(container.length).toBe(
            store.getState().memos.categoryIds.length
        );
    });
});
