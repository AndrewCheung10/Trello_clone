import { nanoid } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { setupStore } from "../../../app/store";
import { BrowserRouter } from "react-router-dom";
import MemoExcerpt from "./MemoExcerpt";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { screen, render } from "@testing-library/react";

describe("MemoExcerpt", () => {
    const drop = (component) => {
        return (
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
                            {component}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    };

    const setup = (data) => {
        const id = nanoid();
        const memoIndex = 0;
        const store = setupStore();

        render(
            <Provider store={store}>
                <BrowserRouter>
                    {drop(
                        <MemoExcerpt
                            data={data}
                            categoryId={id}
                            memoIndex={memoIndex}
                        />
                    )}
                </BrowserRouter>
            </Provider>
        );
    };

    const createData = (newData) => {
        const data = {
            id: "xSFZtlvQhJTe1EsUxPpsK",
            title: newData.title || "",
            description: newData.description || "",
            dueDate: newData.dueDate || "",
            complete: newData.complete || false,
            favourite: newData.favourite || false,
        };
        return data;
    };

    describe("title", () => {
        const testTitle = (text) => {
            const data = createData({ title: text });
            setup(data);

            const title = screen.getByLabelText("Title");
            expect(title.textContent).toBe(text);
        };

        it("1", () => testTitle("132"));
        it("2", () => testTitle("asdf"));
        it("3", () => testTitle("sadf132"));
        it("4", () => testTitle("132sadfas$T*("));
    });

    describe("dueDate", () => {
        const testDueDate = (dueDate) => {
            const data = createData({ dueDate: dueDate });
            setup(data);

            const dueDateCard = screen.queryByLabelText("Due Date Card");

            if (dueDate) expect(dueDateCard).not.toBe(null);
            else expect(dueDateCard).toBe(null);
        };

        it("1", () => testDueDate("2022-12-25 16:39"));
        it("2", () => testDueDate());
    });

    describe("description", () => {
        const testDescription = (text) => {
            const data = createData({ description: text });
            setup(data);

            const description = screen.queryByLabelText("Description");

            if (text) expect(description).not.toBe(null);
            else expect(description).toBe(null);
        };

        it("1", () => testDescription("132"));
        it("2", () => testDescription());
    });

    describe("favourite", () => {
        const testFavourite = (isFavourite) => {
            const data = createData({ favourite: isFavourite });
            setup(data);

            const favourite = screen.queryByLabelText("Favourite");

            if (isFavourite) expect(favourite).not.toBe(null);
            else expect(favourite).toBe(null);
        };

        it("1", () => testFavourite(true));
        it("2", () => testFavourite(false));
    });
});
