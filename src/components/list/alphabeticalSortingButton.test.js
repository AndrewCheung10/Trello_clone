import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../testUtils/renderWithProviders";
import AlphabeticalSortingButton from "./AlphabeticalSortingButton";
import { sortAlphabetically } from "../../redux/memosSlice";
import { nanoid } from "@reduxjs/toolkit";
import "@testing-library/jest-dom/extend-expect";

describe("Alphabetical sort button", () => {
    it("Button dispatch correct payload and type", () => {
        const id = nanoid();

        const { store } = renderWithProviders(
            <AlphabeticalSortingButton categoryId={id} />
        );
        const button = screen.getByLabelText("Sorting");

        fireEvent.click(button);

        expect(store.getActions()).toContainEqual(
            sortAlphabetically({ categoryId: id })
        );
    });

    it("Alphabetical sort icon exists", () => {
        const id = nanoid();

        renderWithProviders(<AlphabeticalSortingButton categoryId={id} />);
        const icon = screen.getByLabelText("SortByAlphaIcon");
        expect(icon).toBeInTheDocument();
    });
});
