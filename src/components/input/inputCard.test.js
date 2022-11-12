import { fireEvent, screen, within } from "@testing-library/react";
import { nanoid } from "@reduxjs/toolkit";
import InputCard from "./InputCard";
import { renderWithProviders } from "../../testUtils/renderWithProviders";
import { addMemo, addCategory } from "../../redux/memosSlice";
import "@testing-library/jest-dom/extend-expect";

describe("InputCard", () => {
    const setOpen = jest.fn();

    beforeEach(() => {
        setOpen.mockClear();
    });

    const id = nanoid();
    const cardType = {
        memo: "memo",
        category: "category",
    };

    describe("Show the correct placeholder", () => {
        const setup = (type) => {
            renderWithProviders(
                <InputCard setOpen={() => {}} categoryId={id} type={type} />
            );

            const button = screen.getByLabelText("Submit Button");
            const memoInputBase = screen.queryByPlaceholderText(
                "Enter a title of this memo..."
            );
            const categoryInputBase = screen.queryByPlaceholderText(
                "Enter Category title..."
            );

            return { button, memoInputBase, categoryInputBase };
        };

        it("Memo type", () => {
            const { button, memoInputBase, categoryInputBase } = setup(
                cardType.memo
            );

            expect(button.textContent).toBe("Add Memo");
            expect(memoInputBase).not.toBe(null);
            expect(categoryInputBase).toBe(null);
        });
        it("Category type", () => {
            const { button, memoInputBase, categoryInputBase } = setup(
                cardType.category
            );

            expect(button.textContent).toBe("Add Category");
            expect(memoInputBase).toBe(null);
            expect(categoryInputBase).not.toBe(null);
        });
    });

    describe("InputBase", () => {
        const setup = (btnLabel) => {
            renderWithProviders(
                <InputCard
                    setOpen={setOpen}
                    categoryId={id}
                    type={cardType.memo}
                />
            );
            const button = screen.getByLabelText(btnLabel);

            return { button };
        };

        it("Close on comfirm with empty", () => {
            const { button } = setup("Submit Button");

            fireEvent.click(button);
            expect(setOpen).toBeCalledTimes(0);
        });
        it("Close on comfirm with not empty", () => {
            const { button } = setup("Submit Button");
            const inputBase = within(
                screen.getByLabelText("Input Base")
            ).getByRole("textbox");

            fireEvent.change(inputBase, { target: { value: "text" } });
            fireEvent.click(button);

            expect(setOpen).toBeCalledTimes(1);
            expect(setOpen).toHaveBeenCalledWith(false);
        });
        it("Close on cancel", () => {
            const { button } = setup("Cancel Button");

            fireEvent.click(button);
            expect(setOpen).toBeCalledTimes(1);
            expect(setOpen).toHaveBeenCalledWith(false);
        });
    });

    describe("Redux", () => {
        const setup = (type) => {
            const { store } = renderWithProviders(
                <InputCard setOpen={() => {}} categoryId={id} type={type} />
            );
            const inputBase = within(
                screen.getByLabelText("Input Base")
            ).getByRole("textbox");
            const button = screen.getByLabelText("Submit Button");

            return { store, inputBase, button };
        };

        const submitWithText = (type, store, inputBase, button, text) => {
            fireEvent.change(inputBase, { target: { value: text } });
            fireEvent.click(button);

            if (type === cardType.memo)
                expect(store.getActions()).toContainEqual(
                    addMemo({ title: text, categoryId: id })
                );
            else
                expect(store.getActions()).toContainEqual(
                    addCategory({ title: text })
                );
        };

        const testWithType = (type) => {
            const { store, inputBase, button } = setup(type);

            submitWithText(type, store, inputBase, button, "1321");
            submitWithText(type, store, inputBase, button, "asdfsdaf");
            submitWithText(type, store, inputBase, button, "321sda4f65");
            submitWithText(type, store, inputBase, button, "293hsadf@!(*");
        };

        it("Submit with memo type: dispatch correct payload and type", () =>
            testWithType(cardType.memo));
        it("Submit with category type: dispatch correct payload and type", () =>
            testWithType(cardType.category));
    });

    describe("focus", () => {
        it("Focus on InputBase at the beginning", () => {
            renderWithProviders(
                <InputCard
                    setOpen={() => {}}
                    categoryId={id}
                    type={cardType.memo}
                />
            );
            const inputBase = within(
                screen.getByLabelText("Input Base")
            ).getByRole("textbox");

            expect(document.activeElement).toEqual(inputBase);
        });
    });
});
