import { screen } from "@testing-library/react";
import Home from "./Home";
import { store } from "../app/store";
import { renderWithRouter } from "./../testUtils/renderWithRouter";

describe("Home", () => {
    it("List correct number of categories from store", () => {
        renderWithRouter(<Home />, { store: store });
        const container = screen.queryAllByLabelText("Category");
        expect(container.length).toBe(
            store.getState().memos.categoryIds.length
        );
    });
});
