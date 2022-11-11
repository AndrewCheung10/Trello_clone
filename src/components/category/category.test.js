import { screen } from "@testing-library/react";
import { store } from "../../app/store";
import Category from "./Category";
import { renderWithDnD } from "./../../testUtils/renderWithDnD";

describe("Category", () => {
    const testByIndex = (index) => {
        const categoryId = store.getState().memos.categoryIds[index];
        const category = store.getState().memos.categories[categoryId];
        renderWithDnD(
            <Category
                category={category}
                categoryId={categoryId}
                index={index}
            />
        );

        const memo = screen.queryAllByLabelText("Memo");
        expect(memo.length).toBe(category.list.length);
    };

    it("Shows the correct number of memos in first List", () => {
        testByIndex(0);
    });
    it("Shows the correct number of memos in second List", () => {
        testByIndex(1);
    });
    it("Shows the correct number of memos in third List", () => {
        testByIndex(2);
    });
});
