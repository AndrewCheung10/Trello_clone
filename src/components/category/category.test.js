import { render, screen } from "@testing-library/react";
import { setupStore } from "../../app/store";
import Category from "./Category";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

describe("Category", () => {
    const testByIndex = (index) => {
        const store = setupStore();
        const categoryId = store.getState().memos.categoryIds[index];
        const category = store.getState().memos.categories[categoryId];

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <DragDropContext>
                        <Droppable
                            droppableId="home"
                            type="category"
                            direction="horizontal"
                        >
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <Category
                                        category={category}
                                        categoryId={categoryId}
                                        index={index}
                                    />
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </BrowserRouter>
            </Provider>
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
