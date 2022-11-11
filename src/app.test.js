import { screen } from "@testing-library/react";
import App from "./App";
import { renderWithRouter } from "./testUtils/renderWithRouter";
import { store } from "./app/store";

describe("app", () => {
    it("landing on a bad page", () => {
        renderWithRouter(<App />, { route: "/badRoute", store: store });
        expect(screen.queryByLabelText("Home")).not.toBe(null);
    });
    it("landing on Edit Memo Form", () => {
        renderWithRouter(<App />, {
            route: "/category-1/2/edit",
            store: store,
        });
        expect(screen.queryByLabelText("Home")).not.toBe(null);
        //expect(screen.queryByLabelText("Edit Memo Form")).not.toBe(null);
    });
});
