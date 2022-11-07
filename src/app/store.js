import { combineReducers, configureStore } from "@reduxjs/toolkit";
import memosReducer from "../redux/memosSlice";

const rootReducer = combineReducers({
    memos: memosReducer,
});

export const setupStore = (preloadedState) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};
