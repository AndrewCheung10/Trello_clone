import { configureStore } from "@reduxjs/toolkit";
import memosReducer from "../redux/memosSlice";
import { loadState, saveState } from "./localStorage";

const reducer = {
    memos: memosReducer,
};

export const store = configureStore({
    reducer,
    preloadedState: loadState(),
});

store.subscribe(() => {
    saveState(store.getState());
});
