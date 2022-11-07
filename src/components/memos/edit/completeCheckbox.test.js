import { fireEvent, render, screen } from "@testing-library/react";
import CompleteCheckbox from "./CompleteCheckbox";

describe("Complete check box show correct checking and return correct state", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("Complete checkbox shows correct checking", () => {
        it("CompleteCheckbox default false", () => {
            let complete = false;
            const mockFunction = jest.fn();

            render(
                <CompleteCheckbox
                    complete={complete}
                    setComplete={mockFunction}
                />
            );

            const checkbox = screen.getByLabelText("Complete");

            expect(checkbox.checked).toBe(false);
        });
        it("CompleteCheckbox default true", () => {
            let complete = true;
            const mockFunction = jest.fn();

            render(
                <CompleteCheckbox
                    complete={complete}
                    setComplete={mockFunction}
                />
            );

            const checkbox = screen.getByLabelText("Complete");

            expect(checkbox.checked).toBe(true);
        });
    });
    describe("Change complete checkbox value", () => {
        it("Complete Checkbox toggle false to true", async () => {
            let complete = false;
            const mockFunction = jest.fn();

            render(
                <CompleteCheckbox
                    complete={complete}
                    setComplete={mockFunction}
                />
            );

            const checkbox = screen.getByLabelText("Complete");

            fireEvent.click(checkbox);
            expect(mockFunction).toHaveBeenCalledWith(true);
        });
        it("Complete Checkbox toggle true to false", async () => {
            let complete = true;
            const mockFunction = jest.fn();
            render(
                <CompleteCheckbox
                    complete={complete}
                    setComplete={mockFunction}
                />
            );
            const checkbox = screen.getByLabelText("Complete");

            fireEvent.click(checkbox);
            expect(mockFunction).toHaveBeenCalledWith(false);
        });
    });
});
