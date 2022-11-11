import { nanoid } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import { BrowserRouter } from "react-router-dom";
import MemoExcerpt from "./MemoExcerpt";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { fireEvent, screen, render } from "@testing-library/react";
import { createMemoryHistory } from "history";

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
        const history = createMemoryHistory();

        render(
            <Provider store={store}>
                <BrowserRouter history={history}>
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

        it("Show title", () => testTitle("132"));
    });

    describe("dueDate", () => {
        const testDueDate = (dueDate) => {
            const data = createData({ dueDate: dueDate });
            setup(data);

            const dueDateCard = screen.queryByLabelText("Due Date Card");

            if (dueDate) expect(dueDateCard).not.toBe(null);
            else expect(dueDateCard).toBe(null);
        };

        it("Show due date card if it's not null", () =>
            testDueDate("2022-12-25 16:39"));
        it("Dont't Show due date card if it's null", () => testDueDate());
    });

    describe("description", () => {
        const testDescription = (text) => {
            const data = createData({ description: text });
            setup(data);

            const description = screen.queryByLabelText("Description");

            if (text) expect(description).not.toBe(null);
            else expect(description).toBe(null);
        };

        it("Show description icon if it's not empty", () =>
            testDescription("132"));
        it("Don't show description icon if it's empty", () =>
            testDescription());
    });

    describe("favourite", () => {
        const testFavourite = (isFavourite) => {
            const data = createData({ favourite: isFavourite });
            setup(data);

            const favourite = screen.queryByLabelText("Favourite");

            if (isFavourite) expect(favourite).not.toBe(null);
            else expect(favourite).toBe(null);
        };

        it("Show favourite icon if favourite is true", () =>
            testFavourite(true));
        it("Don't show favourite icon if favourite is false", () =>
            testFavourite(false));
    });

    // describe("Navigation", () => {
    //     it("Navigate to edit page", () => {
    //         setup({});
    //         const id = "123";
    //         const memoIndex = "1";
    //         const history = createMemoryHistory();
    //         fireEvent.click(screen.getByLabelText("Link"));

    //         expect(history.location.pathname).toBe(
    //             `memo/${id}/${memoIndex}/edit`
    //         );
    //     });
    // });
});
