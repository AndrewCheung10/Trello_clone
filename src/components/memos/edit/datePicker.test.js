import { render, screen, fireEvent } from "@testing-library/react";
import DatePicker from "./DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "@testing-library/jest-dom/extend-expect";

describe("DatePicker", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("Show correct date", async () => {
        let dueDate = "2022-12-25 08:39";
        const mockFunction = jest.fn();

        render(
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker dueDate={dueDate} setDueDate={mockFunction} />
            </LocalizationProvider>
        );

        const date = screen.getByLabelText("Date Picker");
        expect(date.value).toBe("12/25/2022 08:39 AM");
    });
    it("Change datepicker date", async () => {
        let dueDate = null;
        const mockFunction = jest.fn();

        render(
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker dueDate={dueDate} setDueDate={mockFunction} />
            </LocalizationProvider>
        );

        const date = screen.getByLabelText("Date Picker");
        fireEvent.change(date, { target: { value: "02/28/2022 11:55 PM" } });
        expect(date.value).toBe("02/28/2022 11:55 PM");
        expect(mockFunction).toHaveBeenCalledWith("2022-02-28 23:55");

        fireEvent.change(date, { target: { value: "12/31/2022 10:25 AM" } });
        expect(date.value).toBe("12/31/2022 10:25 AM");
        expect(mockFunction).toHaveBeenCalledWith("2022-12-31 10:25");
    });
    it("Cancel datepicker date", () => {
        let dueDate = "2022-12-25 08:39";
        const mockFunction = jest.fn();

        render(
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker dueDate={dueDate} setDueDate={mockFunction} />
            </LocalizationProvider>
        );

        const cancel = screen.getByLabelText("Delete Button");
        fireEvent.click(cancel);
        expect(mockFunction).toHaveBeenCalledWith(null);
    });

    it("Clear icon exist", () => {
        let dueDate = "2022-12-25 08:39";
        const mockFunction = jest.fn();

        render(
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker dueDate={dueDate} setDueDate={mockFunction} />
            </LocalizationProvider>
        );

        const icon = screen.getByLabelText("Clear Icon");
        expect(icon).toBeInTheDocument();
    });
});
