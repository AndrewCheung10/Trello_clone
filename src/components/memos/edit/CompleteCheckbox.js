import { Checkbox } from "@material-ui/core";
import { green } from "@mui/material/colors";

const label = { inputProps: { "aria-label": "Complete" } };

const CompleteCheckbox = ({ complete, setComplete }) => {
    return (
        <Checkbox
            {...label}
            checked={complete}
            onChange={() => setComplete(!complete)}
            style={{
                color: green[600],
            }}
            data-testid="checkbox"
        />
    );
};

export default CompleteCheckbox;
