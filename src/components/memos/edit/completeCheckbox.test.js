import { fireEvent, render, screen } from "@testing-library/react";
import CompleteCheckbox from "./CompleteCheckbox";

describe("Complete check box show correct checking and return correct state", () => {
    const setComplete = jest.fn();

    beforeEach(() => {
        setComplete.mockClear();
    });

    const setup = (complete) => {
        render(
            <CompleteCheckbox complete={complete} setComplete={setComplete} />
        );
        const checkbox = screen.getByLabelText("Complete");
        return { checkbox };
    };

    describe("Complete checkbox shows correct checking", () => {
        it("Complete Checkbox toggle false to true", () => {
            const { checkbox } = setup(false);
            expect(checkbox.checked).toBe(false);
            fireEvent.click(checkbox);
            expect(setComplete).toBeCalledTimes(1);
            expect(setComplete).toHaveBeenCalledWith(true);
        });
        it("Complete Checkbox toggle true to false", () => {
            const { checkbox } = setup(true);
            expect(checkbox.checked).toBe(true);
            fireEvent.click(checkbox);
            expect(setComplete).toBeCalledTimes(1);
            expect(setComplete).toHaveBeenCalledWith(false);
        });
    });
});
