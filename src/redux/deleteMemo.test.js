import reducer, { deleteMemo } from "./memosSlice";

describe("Delete the memo sucessfully", () => {
    const previousState = {
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
    it("Delete second memo of first list", () => {
        expect(
            reducer(
                previousState,
                deleteMemo({
                    categoryId: "category-1",
                    memoIndex: 1,
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
                            description: "",
                            favourite: true,
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
        });
    });
});
