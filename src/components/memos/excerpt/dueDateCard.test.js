import DueDateCard from "./DueDateCard";
import { render, screen } from "@testing-library/react";
import moment from "moment";
import { hexToRgb } from "@material-ui/core";

describe("Due Date Card show correct date format and background color", () => {
    const today = new Date();
    const tmr = new Date().setDate(today.getDate() + 1);
    const yesterday = new Date().setDate(today.getDate() - 100);

    it("complete and not expired", () => {
        render(<DueDateCard dueDate={tmr} complete={true} />);
        const card = screen.getByLabelText("Card");
        const date = moment(tmr).format("ll");
        const styles = getComputedStyle(card);

        expect(card.innerHTML).toEqual(date);
        expect(styles.backgroundColor).toBe(hexToRgb("#7bc86c"));
    });

    it("complete and expired", () => {
        render(<DueDateCard dueDate={yesterday} complete={true} />);
        const card = screen.getByLabelText("Card");
        const date = moment(yesterday).format("ll");
        const styles = getComputedStyle(card);

        expect(card.innerHTML).toEqual(date);
        expect(styles.backgroundColor).toBe(hexToRgb("#7bc86c"));
    });

    it("not completed and not expired", () => {
        render(<DueDateCard dueDate={tmr} complete={false} />);
        const card = screen.getByLabelText("Card");
        const date = moment(tmr).format("ll");
        const styles = getComputedStyle(card);

        expect(card.innerHTML).toEqual(date);
        expect(styles.backgroundColor).toBe(hexToRgb("#7bc86c"));
    });

    it("not completed and expired", () => {
        render(<DueDateCard dueDate={yesterday} complete={false} />);
        const card = screen.getByLabelText("Card");
        const date = moment(yesterday).format("ll");
        const styles = getComputedStyle(card);

        expect(card.innerHTML).toEqual(date);
        expect(styles.backgroundColor).toBe(hexToRgb("#EC8488"));
    });
});
