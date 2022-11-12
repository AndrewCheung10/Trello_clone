import { fireEvent, render, screen } from "@testing-library/react";
import FavouriteCheckbox from "./FavouriteCheckbox";
import "@testing-library/jest-dom/extend-expect";

describe("Favourite check box", () => {
    const setFavourite = jest.fn();

    beforeEach(() => {
        setFavourite.mockClear();
    });

    const setup = (favourite) => {
        render(
            <FavouriteCheckbox
                favourite={favourite}
                setFavourite={setFavourite}
            />
        );
        const checkbox = screen.getByLabelText("Favourite Checkbox");
        const favouriteIcon = screen.queryByLabelText("Favorite Icon");
        const favoriteBorderIcon = screen.queryByLabelText(
            "Favorite Border Icon"
        );
        return { checkbox, favouriteIcon, favoriteBorderIcon };
    };

    describe("Shows correct checking", () => {
        it("Default false and show favourite border icon", () => {
            const { checkbox, favouriteIcon, favoriteBorderIcon } =
                setup(false);

            expect(checkbox.checked).toBe(false);
            expect(favoriteBorderIcon).toBeInTheDocument();
            expect(favouriteIcon).toBe(null);
        });
        it("Default true and show favourite icon", () => {
            const { checkbox, favouriteIcon, favoriteBorderIcon } = setup(true);

            expect(checkbox.checked).toBe(true);
            expect(favouriteIcon).toBeInTheDocument();
            expect(favoriteBorderIcon).toBe(null);
        });
    });
    describe("Change checkbox value", () => {
        it("Change checkbox from false to true", async () => {
            const { checkbox } = setup(false);
            fireEvent.click(checkbox);
            expect(setFavourite).toBeCalledTimes(1);
            expect(setFavourite).toHaveBeenCalledWith(true);
        });
        it("change checkbox from true to false", async () => {
            const { checkbox } = setup(true);
            fireEvent.click(checkbox);
            expect(setFavourite).toBeCalledTimes(1);
            expect(setFavourite).toHaveBeenCalledWith(false);
        });
    });
});
