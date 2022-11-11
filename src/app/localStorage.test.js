import { loadState, saveState } from "./localStorage";

describe("LoaclStorage", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });
    describe("Save state", () => {
        const id = "state";

        it("Save state to empty localStorage", () => {
            const mockJson = { data: "json data" };
            saveState(mockJson);
            expect(localStorage.getItem(id)).toEqual(JSON.stringify(mockJson));
        });

        it("Overwrite state to localStorage", () => {
            const mockOldData = { data: "json data" };
            window.localStorage.setItem(id, JSON.stringify(mockOldData));

            const mockNewData = { data: " new data" };
            saveState(mockNewData);

            expect(localStorage.getItem(id)).toEqual(
                JSON.stringify(mockNewData)
            );
        });
    });

    describe("Load state", () => {
        const id = "state";

        it("Return undefined if localStorage is empty", () =>
            expect(loadState(id)).toEqual(undefined));

        it("Load state from localStorage", () => {
            const mockJson = { data: "json data" };
            window.localStorage.setItem(id, JSON.stringify(mockJson));

            expect(loadState(id)).toEqual(mockJson);
        });
    });
});
