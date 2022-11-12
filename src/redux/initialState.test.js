import reducer from "./memosSlice";

describe("Return initial state", () => {
    it("Get intial state correctly", () => {
        expect(reducer(undefined, { type: undefined })).toEqual({
            categories: {
                "category-1": {
                    id: "category-1",
                    title: "Todo",
                    list: [
                        {
                            id: "1",
                            title: "Redux Toolkit",
                            description: "some description...",
                            favourite: true,
                            dueDate: "2022-12-31 03:37",
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
                            title: "Trello",
                            description: "",
                            favourite: false,
                            dueDate: null,
                            complete: true,
                        },
                    ],
                },
                "category-3": {
                    id: "category-3",
                    title: "Done",
                    list: [
                        {
                            id: "8",
                            title: "E",
                            description: "",
                            favourite: false,
                            dueDate: "2022-12-25 16:37",
                            complete: true,
                        },
                        {
                            id: "7",
                            title: "D",
                            description: "Second element after sorting",
                            favourite: true,
                            dueDate: null,
                            complete: true,
                        },
                        {
                            id: "6",
                            title: "C",
                            description: "",
                            favourite: false,
                            dueDate: "2022-01-01 12:30",
                            complete: true,
                        },
                        {
                            id: "5",
                            title: "B",
                            description: "First element after sorting",
                            favourite: true,
                            dueDate: "2022-09-01 06:30",
                            complete: false,
                        },
                        {
                            id: "4",
                            title: "A",
                            description: "",
                            favourite: false,
                            dueDate: null,
                            complete: false,
                        },
                    ],
                },
            },
            categoryIds: ["category-1", "category-2", "category-3"],
        });
    });
});
