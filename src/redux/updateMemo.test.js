import reducer, { updateMemo } from "./memosSlice";

describe("Update the memo sucessfully", () => {
    const initialState = {
        categories: {
            "category-1": {
                id: "category-1",
                title: "Todo",
                list: [
                    {
                        id: "1",
                        title: "Redux Toolkit",
                        description: "",
                        favourite: true,
                        dueDate: null,
                        complete: false,
                    },
                    {
                        id: "2",
                        title: "Material UI",
                        description: "",
                        favourite: false,
                        dueDate: null,
                        complete: false,
                    },
                ],
            },
            "category-2": {
                id: "category-2",
                title: "Doing",
                list: [
                    {
                        id: "3",
                        title: "React Beautiful DnD",
                        description: "",
                        favourite: true,
                        dueDate: null,
                        complete: true,
                    },
                ],
            },
        },
        categoryIds: ["category-1", "category-2"],
    };

    it("Update titile, favourite, description, dueDate and complete of second memo of first list - memo:[0,1]", () => {
        expect(
            reducer(
                initialState,
                updateMemo({
                    categoryId: "category-1",
                    memoIndex: "1",
                    title: "new title: Material UI",
                    description: "new Description of first update",
                    favourite: true,
                    dueDate: "12345",
                    complete: true,
                })
            )
        ).toEqual({
            categories: {
                "category-1": {
                    id: "category-1",
                    title: "Todo",
                    list: [
                        {
                            id: "1",
                            title: "Redux Toolkit",
                            favourite: true,
                            description: "",
                            dueDate: null,
                            complete: false,
                        },
                        {
                            id: "2",
                            title: "new title: Material UI",
                            description: "new Description of first update",
                            favourite: true,
                            dueDate: "12345",
                            complete: true,
                        },
                    ],
                },
                "category-2": {
                    id: "category-2",
                    title: "Doing",
                    list: [
                        {
                            id: "3",
                            title: "React Beautiful DnD",
                            description: "",
                            favourite: true,
                            dueDate: null,
                            complete: true,
                        },
                    ],
                },
            },
            categoryIds: ["category-1", "category-2"],
        });
    });
});
