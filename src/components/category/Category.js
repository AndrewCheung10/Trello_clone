import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { CssBaseline, makeStyles, Paper } from "@material-ui/core";
import MemoExcerpt from "../memos/excerpt/MemoExcerpt";
import InputContainer from "../input/InputContainer";
import AlphabeticalSortingButton from "./AlphabeticalSortingButton";

const useStyle = makeStyles((theme) => ({
    root: {
        width: 280,
        backgroundColor: "#ECECEC",
        padding: 7,
        marginRight: theme.spacing(1),
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    title: {
        margin: theme.spacing(0.5, 0, 0.5, 0),
        padding: theme.spacing(0, 1, 0, 1),
        fontWeight: 700,
    },
}));

let Category = ({ category, categoryId, index }) => {
    const classes = useStyle();

    return (
        <Draggable draggableId={categoryId} index={index}>
            {(provided) => (
                <div {...provided.draggableProps} ref={provided.innerRef}>
                    <Paper
                        className={classes.root}
                        {...provided.dragHandleProps}
                    >
                        <CssBaseline />
                        <div className={classes.header}>
                            <div className={classes.title}>
                                {category.title}
                            </div>
                            <AlphabeticalSortingButton
                                categoryId={categoryId}
                            />
                        </div>
                        <Droppable droppableId={categoryId}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {category.list.map((post, j) => (
                                        <div key={post.id} aria-label="Memo">
                                            <MemoExcerpt
                                                data={post}
                                                categoryId={categoryId}
                                                memoIndex={j}
                                            />
                                        </div>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <InputContainer categoryId={categoryId} type="memo" />
                    </Paper>
                </div>
            )}
        </Draggable>
    );
};

let memoizedCategory = React.memo(Category);

export default memoizedCategory;
