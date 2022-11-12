import { render, screen, fireEvent } from "@testing-library/react";
import DatePicker from "./DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "@testing-library/jest-dom/extend-expect";

describe("DatePicker", () => {
    const setDueDate = jest.fn();

    beforeEach(() => {
        setDueDate.mockClear();
    });

    const setup = (dueDate) => {
        render(
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker dueDate={dueDate} setDueDate={setDueDate} />
            </LocalizationProvider>
        );
    };

    it("Show correct date", async () => {
        setup("2022-12-25 08:39");
        const date = screen.getByLabelText("Date Picker");
        expect(date.value).toBe("12/25/2022 08:39 AM");
    });
    it("Change datepicker date", async () => {
        setup(null);

        const date = screen.getByLabelText("Date Picker");
        fireEvent.change(date, { target: { value: "02/28/2022 11:55 PM" } });
        expect(date.value).toBe("02/28/2022 11:55 PM");
        expect(setDueDate).toBeCalledTimes(1);
        expect(setDueDate).toHaveBeenCalledWith("2022-02-28 23:55");

        fireEvent.change(date, { target: { value: "12/31/2022 10:25 AM" } });
        expect(date.value).toBe("12/31/2022 10:25 AM");
        expect(setDueDate).toBeCalledTimes(2);
        expect(setDueDate).toHaveBeenCalledWith("2022-12-31 10:25");
    });
    it("Cancel datepicker date", () => {
        setup("2022-12-25 08:39");

        const cancel = screen.getByLabelText("Delete Button");
        fireEvent.click(cancel);
        expect(setDueDate).toHaveBeenCalledWith(null);
    });
    it("Clear icon exist", () => {
        setup("2022-12-25 08:39");
        const icon = screen.getByLabelText("Clear Icon");
        expect(icon).toBeInTheDocument();
    });
});
