import { useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles, alpha } from "@material-ui/core/styles";
import InputCard from "./InputCard";
import ClickAwayListener from "@mui/base/ClickAwayListener";

const useStyle = makeStyles((theme) => ({
    root: {
        // marginTop: theme.spacing(1),
    },
    addCard: {
        padding: theme.spacing(1),
        backgroundColor: "#EBECF0",
        "&:hover": {
            backgroundColor: alpha("#000", 0.1),
        },
    },
}));

const InputContainer = ({ categoryId, type }) => {
    const classes = useStyle();
    const [open, setOpen] = useState(false);

    const ShowWhenOpen = () => {
        return (
            <div aria-label="Input Card Container">
                <InputCard
                    setOpen={setOpen}
                    categoryId={categoryId}
                    type={type}
                />
            </div>
        );
    };

    const ShowWhenNotOpen = () => {
        return (
            <div aria-label="Add Card Paper Container">
                <Paper
                    aria-label="Add Card Paper"
                    className={classes.addCard}
                    elevation={0}
                    onClick={() => setOpen(!open)}
                >
                    <Typography aria-label="Typography">
                        {type === "memo"
                            ? "+ Add a memo"
                            : "+ Add another category"}
                    </Typography>
                </Paper>
            </div>
        );
    };

    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <div className={classes.root}>
                {open ? <ShowWhenOpen /> : <ShowWhenNotOpen />}
            </div>
        </ClickAwayListener>
    );
};

export default InputContainer;
