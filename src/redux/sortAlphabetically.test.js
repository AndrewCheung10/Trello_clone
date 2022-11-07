import reducer, { sortAlphabetically } from "./memosSlice";
describe("Update the memo sucessfully", () => {
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
                        favourite: false,
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
                        title: "E",
                        description: "",
                        favourite: false,
                        dueDate: null,
                        complete: true,
                    },
                    {
                        id: "4",
                        title: "D",
                        description: "",
                        favourite: true,
                        dueDate: null,
                        complete: true,
                    },
                    {
                        id: "5",
                        title: "C",
                        description: "",
                        favourite: false,
                        dueDate: null,
                        complete: true,
                    },
                    {
                        id: "6",
                        title: "B",
                        description: "",
                        favourite: true,
                        dueDate: null,
                        complete: true,
                    },
                    {
                        id: "7",
                        title: "A",
                        description: "",
                        favourite: false,
                        dueDate: null,
                        complete: true,
                    },
                ],
            },
        },
        categoryIds: ["category-1", "category-2"],
    };

    it("Sort first category's memo alphabetically - favourite first title second", () => {
        expect(
            reducer(
                previousState,
                sortAlphabetically({
                    categoryId: "category-2",
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
                            favourite: false,
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
                            id: "6",
                            title: "B",
                            description: "",
                            favourite: true,
                            dueDate: null,
                            complete: true,
                        },
                        {
                            id: "4",
                            title: "D",
                            description: "",
                            favourite: true,
                            dueDate: null,
                            complete: true,
                        },

                        {
                            id: "7",
                            title: "A",
                            description: "",
                            favourite: false,
                            dueDate: null,
                            complete: true,
                        },
                        {
                            id: "5",
                            title: "C",
                            description: "",
                            favourite: false,
                            dueDate: null,
                            complete: true,
                        },
                        {
                            id: "3",
                            title: "E",
                            description: "",
                            favourite: false,
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
