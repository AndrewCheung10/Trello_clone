import moment from "moment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { IconButton } from "@material-ui/core";

const label = { inputProps: { "aria-label": "Date Picker" } };

const DatePicker = ({ dueDate, setDueDate }) => {
    const handleChange = (newValue) => {
        setDueDate(moment(newValue).format("YYYY-MM-DD HH:mm"));
    };

    const handleClear = () => {
        setDueDate(null);
    };

    return (
        <div style={{ display: "flex", width: 300, alignItems: "center" }}>
            <DateTimePicker
                {...label}
                value={dueDate}
                onChange={handleChange}
                renderInput={(params) => (
                    <TextField
                        label="Outlined"
                        variant="outlined"
                        {...params}
                    />
                )}
            />
            <IconButton
                aria-label="Delete Button"
                onClick={() => handleClear()}
            >
                <ClearIcon aria-label="Clear Icon" />
            </IconButton>
        </div>
    );
};

export default DatePicker;
