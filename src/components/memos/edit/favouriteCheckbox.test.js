import { fireEvent, render, screen, within } from "@testing-library/react";
import FavouriteCheckbox from "./FavouriteCheckbox";
import "@testing-library/jest-dom/extend-expect";

describe("Favourite check box", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("Shows correct checking", () => {
        it("Default false and show favourite border icon", () => {
            let favourite = false;
            const mockFunction = jest.fn();

            render(
                <FavouriteCheckbox
                    favourite={favourite}
                    setFavourite={mockFunction}
                />
            );

            const checkbox = screen.getByLabelText("Favourite Checkbox");

            expect(checkbox.checked).toBe(false);

            const favoriteBorderIcon = screen.getByLabelText(
                "Favorite Border Icon"
            );
            expect(favoriteBorderIcon).toBeInTheDocument();

            const favouriteIcon = screen.queryByLabelText("Favorite Icon");
            expect(favouriteIcon).toBe(null);
        });
        it("Default true and show favourite icon", () => {
            let favourite = true;
            const mockFunction = jest.fn();

            render(
                <FavouriteCheckbox
                    favourite={favourite}
                    setFavourite={mockFunction}
                />
            );

            const checkbox = screen.getByLabelText("Favourite Checkbox");

            expect(checkbox.checked).toBe(true);

            const favoriteIcon = screen.getByLabelText("Favorite Icon");
            expect(favoriteIcon).toBeInTheDocument();

            const favouriteBorderIcon = screen.queryByLabelText(
                "Favorite Border Icon"
            );
            expect(favouriteBorderIcon).toBe(null);
        });
    });
    describe("Change checkbox value", () => {
        it("Change checkbox from false to true", async () => {
            let favourite = false;
            const mockFunction = jest.fn();

            render(
                <FavouriteCheckbox
                    favourite={favourite}
                    setFavourite={mockFunction}
                />
            );

            const checkbox = screen.getByLabelText("Favourite Checkbox");

            fireEvent.click(checkbox);
            expect(mockFunction).toHaveBeenCalledWith(true);
        });
        it("change checkbox from true to false", async () => {
            let favourite = true;
            const mockFunction = jest.fn();
            render(
                <FavouriteCheckbox
                    favourite={favourite}
                    setFavourite={mockFunction}
                />
            );
            const checkbox = screen.getByLabelText("Favourite Checkbox");

            fireEvent.click(checkbox);
            expect(mockFunction).toHaveBeenCalledWith(false);
        });
    });
});
