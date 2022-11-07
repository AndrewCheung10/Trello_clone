import { fireEvent, screen } from "@testing-library/react";
import { nanoid } from "@reduxjs/toolkit";
import InputContainer from "./InputContainer";
import "@testing-library/jest-dom/extend-expect";
import { renderWithProviders } from "../../testUtils/renderWithProviders";
import { React } from "react";

describe("InputContainer", () => {
    const id = nanoid();

    describe("typography", () => {
        it("Show correct Typography text with memo type", () => {
            renderWithProviders(<InputContainer categoryId={id} type="memo" />);

            const typography = screen.getByLabelText("Typography").textContent;
            expect(typography).toBe("+ Add a memo");
        });
        it("Show correct Typography text with category type", () => {
            renderWithProviders(
                <InputContainer categoryId={id} type="category" />
            );

            const typography = screen.getByLabelText("Typography").textContent;
            expect(typography).toBe("+ Add another category");
        });
    });
    describe("Open Input Card Container before clicking Typography", () => {
        const checkIsOpenShowingExpect = (isOpen) => {
            const inputCardContainer = screen.queryByLabelText(
                "Input Card Container"
            );
            const addCardPaperContainer = screen.queryByLabelText(
                "Add Card Paper Container"
            );

            if (isOpen) {
                expect(inputCardContainer).not.toBe(null);
                expect(addCardPaperContainer).toBe(null);
            } else {
                expect(inputCardContainer).toBe(null);
                expect(addCardPaperContainer).not.toBe(null);
            }
        };

        it("When the Typography is memo type", async () => {
            renderWithProviders(<InputContainer categoryId={id} type="memo" />);
            const addCard = screen.getByLabelText("Add Card Paper");

            checkIsOpenShowingExpect(false);
            fireEvent.click(addCard);
            checkIsOpenShowingExpect(true);
        });

        it("When the Typography is category type", async () => {
            renderWithProviders(
                <InputContainer categoryId={id} type="category" />
            );
            const addCard = screen.getByLabelText("Add Card Paper");

            checkIsOpenShowingExpect(false);
            fireEvent.click(addCard);
            checkIsOpenShowingExpect(true);
        });
    });
});
