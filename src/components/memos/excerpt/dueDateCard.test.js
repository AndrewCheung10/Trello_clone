import DueDateCard from "./DueDateCard";
import { render, screen } from "@testing-library/react";
import moment from "moment";
import { hexToRgb } from "@material-ui/core";

describe("Due Date Card show correct date format and background color", () => {
    const today = new Date();
    const tmr = new Date().setDate(today.getDate() + 1);
    const yesterday = new Date().setDate(today.getDate() - 100);

    const setup = (dueDate, complete) => {
        render(<DueDateCard dueDate={dueDate} complete={complete} />);
        const card = screen.getByLabelText("Card");
        const date = moment(dueDate).format("ll");
        const styles = getComputedStyle(card);

        return { card, date, styles };
    };

    it("complete and not expired", () => {
        const { card, date, styles } = setup(tmr, true);
        expect(card.innerHTML).toEqual(date);
        expect(styles.backgroundColor).toBe(hexToRgb("#7bc86c"));
    });

    it("complete and expired", () => {
        const { card, date, styles } = setup(yesterday, true);
        expect(card.innerHTML).toEqual(date);
        expect(styles.backgroundColor).toBe(hexToRgb("#7bc86c"));
    });

    it("not completed and not expired", () => {
        const { card, date, styles } = setup(tmr, false);
        expect(card.innerHTML).toEqual(date);
        expect(styles.backgroundColor).toBe(hexToRgb("#7bc86c"));
    });

    it("not completed and expired", () => {
        const { card, date, styles } = setup(yesterday, false);
        expect(card.innerHTML).toEqual(date);
        expect(styles.backgroundColor).toBe(hexToRgb("#EC8488"));
    });
});
