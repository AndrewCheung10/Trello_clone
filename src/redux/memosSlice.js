import { createSlice, nanoid } from "@reduxjs/toolkit";
import produce from "immer";

const initialState = {
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
};

const memosSlice = createSlice({
    name: "memos",
    initialState,
    reducers: {
        addCategory: {
            reducer(state, action) {
                const newCategory = createCategory({}, action.payload);
                state.categories[newCategory.id] = newCategory;
                state.categoryIds.push(newCategory.id);
            },
        },
        addMemo: {
            reducer(state, action) {
                const categoryId = action.payload.categoryId;
                state.categories[categoryId].list.push(
                    createMemo({}, action.payload)
                );
            },
        },
        updateMemo: {
            reducer(state, action) {
                const nextState = produce(state, (draftState) => {
                    const { categoryId, memoIndex } = action.payload;
                    createMemo(
                        getMemo(state, categoryId, memoIndex),
                        action.payload
                    );
                });
                return nextState;
            },
        },
        deleteMemo: {
            reducer(state, action) {
                const nextState = produce(state, (draftState) => {
                    const { categoryId, memoIndex } = action.payload;
                    getCategory(draftState, categoryId).list =
                        getCategoriesList(state, categoryId).filter(
                            (memo, i) => {
                                return i !== Number(memoIndex);
                            }
                        );
                });
                return nextState;
            },
        },
        swapMemo: {
            reducer(state, action) {
                const nextState = produce(state, (draftState) => {
                    const { source: from, destination: to } = action.payload;

                    const fromList = getCategoriesList(
                        draftState,
                        from.droppableId
                    );
                    const draggingMemo = fromList[from.index];

                    fromList.splice(from.index, 1);
                    getCategoriesList(draftState, to.droppableId).splice(
                        to.index,
                        0,
                        draggingMemo
                    );
                });
                return nextState;
            },
        },
        swapCategory: {
            reducer(state, action) {
                const nextState = produce(state, (draftState) => {
                    const { source: from, destination: to } = action.payload;

                    const newListIds = draftState.categoryIds;
                    newListIds.splice(from.index, 1);
                    newListIds.splice(
                        to.index,
                        0,
                        state.categoryIds[from.index]
                    );
                });
                return nextState;
            },
        },
        sortAlphabetically: {
            reducer(state, action) {
                const nextState = produce(state, (draftState) => {
                    draftState.categories[action.payload.categoryId].list.sort(
                        (a, b) =>
                            b.favourite - a.favourite ||
                            a.title.localeCompare(b.title)
                    );
                });
                return nextState;
            },
        },
    },
});

const createCategory = (category, newCategory) => {
    category.id = category.id || nanoid();
    category.title = newCategory.title || "";
    category.list = newCategory.description || [];

    return category;
};

const createMemo = (memo, newMemo) => {
    memo.id = memo.id || nanoid();
    memo.title = newMemo.title || "";
    memo.description = newMemo.description || "";
    memo.favourite = newMemo.favourite || false;
    memo.dueDate = newMemo.dueDate || null;
    memo.complete = newMemo.complete || false;

    return memo;
};

const getCategory = (state, id) => state.categories[id];
const getCategoriesList = (state, id) => getCategory(state, id).list;
const getMemo = (state, categoryId, memoIndex) =>
    getCategoriesList(state, categoryId)[memoIndex];

export const selectAllMemos = (state) => state.memos;

export const selectMemoByIdMemoIndex = (state, categoryId, memoIndex) =>
    state.memos.categories[categoryId].list[memoIndex];

export const {
    addCategory,
    addMemo,
    updateMemo,
    deleteMemo,
    addFavourite,
    updateCategoryTitle,
    swapMemo,
    swapCategory,
    sortAlphabetically,
} = memosSlice.actions;

export default memosSlice.reducer;
