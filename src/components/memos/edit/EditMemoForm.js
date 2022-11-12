import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectMemoByIdMemoIndex,
    updateMemo,
    deleteMemo,
} from "../../../redux/memosSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";

import FavouriteCheckbox from "./FavouriteCheckbox";
import DatePicker from "./DatePicker";
import CompleteCheckbox from "./CompleteCheckbox";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    closeButton: {
        display: "flex",
        flexDirection: "row-reverse",
    },
    containerBorder: {
        margin: "1em",
        border: "2px solid #000",
        borderRadius: "10px",
        padding: "1em",
    },
    form: { display: "flex", flexDirection: "column" },
    title: {
        display: "flex",
        justifyContent: "space-between",
    },
    complete: { display: "flex" },
}));

const EditMemoForm = () => {
    const classes = useStyle();

    const { categoryId } = useParams();
    const { memoIndex } = useParams();

    const navigate = useNavigate();

    const memo = useSelector((state) =>
        selectMemoByIdMemoIndex(state, categoryId, memoIndex)
    );

    const [title, setTitle] = useState(memo.title);
    const [description, setDescription] = useState(memo.description);
    const [favourite, setFavourite] = useState(memo.favourite);
    const [dueDate, setDueDate] = useState(memo.dueDate);
    const [complete, setComplete] = useState(memo.complete);

    const dispatch = useDispatch();

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onDescriptionChanged = (e) => setDescription(e.target.value);

    const canSave = title.trim();

    const onSaveMemoClicked = () => {
        if (canSave) {
            dispatch(
                updateMemo({
                    categoryId,
                    memoIndex,
                    title,
                    description,
                    favourite,
                    dueDate,
                    complete,
                })
            );

            setTitle("");
            setDescription("");
            navigate("/");
        }
    };

    const onDeleteMemoClicked = () => {
        dispatch(deleteMemo({ categoryId, memoIndex }));

        setTitle("");
        setDescription("");
        navigate("/");
    };

    return (
        <div className="modalDiv" aria-label="Edit Memo Form">
            <div className="modal">
                <div className={classes.closeButton}>
                    <Button onClick={() => navigate("/")}>close</Button>
                </div>
                <div className={classes.containerBorder}>
                    <div className={classes.form}>
                        <div className={classes.title}>
                            <h2>Title:</h2>
                            <FavouriteCheckbox
                                favourite={favourite}
                                setFavourite={setFavourite}
                            />
                        </div>
                        <TextField
                            aria-label="Title"
                            value={title}
                            onChange={onTitleChanged}
                            multiline
                        />
                        <h2>Description:</h2>
                        <TextField
                            value={description}
                            onChange={onDescriptionChanged}
                            multiline
                        />
                        <h2>Due Date:</h2>
                        <DatePicker dueDate={dueDate} setDueDate={setDueDate} />
                        <div className={classes.complete}>
                            <h2>Complete:</h2>
                            <CompleteCheckbox
                                complete={complete}
                                setComplete={setComplete}
                            />
                        </div>

                        <Button onClick={onSaveMemoClicked} disabled={!canSave}>
                            Save
                        </Button>
                        <Button onClick={onDeleteMemoClicked}>
                            Delete Memo
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditMemoForm;
