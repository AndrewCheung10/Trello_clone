import React from "react";
import { render, cleanup } from "@testing-library/react";
import ReactDOM from "react-dom";
import App from "./App";

afterEach(cleanup);

// jest.mock will mock all the function using jest.fn() that is present inside the react-dom library
jest.mock("react-dom");

describe("Testing Application Root", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        div.id = "root";
        document.body.appendChild(div);
        require("./index");
        expect(ReactDOM.render).toHaveBeenCalledWith(<App />, div);
    });

    it("should render the app inside div which has root id", () => {
        expect(global.document.getElementById("root")).toBeDefined();
    });

    it("should render App component", () => {
        expect(App).toBeDefined();
    });
});
