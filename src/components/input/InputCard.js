import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMemo, addCategory } from "../../redux/memosSlice";
import { Paper, InputBase, Button, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@mui/material/colors";

const useStyle = makeStyles((theme) => ({
    card: {
        // paddingBottom: theme.spacing(4),
    },
    input: {
        margin: theme.spacing(1),
    },
    btnConfirm: {
        background: blue[700],
        color: "#fff",
        "&:hover": {
            background: blue[800],
        },
    },
    confirm: {
        margin: theme.spacing(1, 0, 0, 0),
    },
}));

const InputCard = ({ setOpen, categoryId, type }) => {
    const dispatch = useDispatch();

    const classes = useStyle();
    const [title, setTitle] = useState("");

    const handleOnChange = (e) => {
        setTitle(e.target.value);
    };

    const handleBtnConfirm = () => {
        if (!canAdd) return;
        if (type === "memo") {
            dispatch(addMemo({ title, categoryId }));
        } else {
            dispatch(addCategory({ title }));
        }
        setOpen(false);
        // setTitle("");
    };

    const handleCancel = () => {
        // setTitle("");
        setOpen(false);
    };

    const canAdd = Boolean(title.trim());

    return (
        <div>
            <div>
                <Paper>
                    <InputBase
                        aria-label="Input Base"
                        onChange={handleOnChange}
                        multiline
                        fullWidth
                        inputProps={{
                            className: classes.input,
                        }}
                        value={title}
                        inputRef={(input) => input && input.focus()}
                        placeholder={
                            type === "memo"
                                ? "Enter a title of this memo..."
                                : "Enter Category title..."
                        }
                    />
                </Paper>
            </div>
            <div className={classes.confirm}>
                <Button
                    className={classes.btnConfirm}
                    onClick={handleBtnConfirm}
                    aria-label="Submit Button"
                >
                    {type === "memo" ? "Add Memo" : "Add Category"}
                </Button>
                <IconButton aria-label="Cancel Button" onClick={handleCancel}>
                    <ClearIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default InputCard;
