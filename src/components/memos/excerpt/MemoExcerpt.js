import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import NotesIcon from "@mui/icons-material/Notes";
import DueDateCard from "./DueDateCard";
import Favorite from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";

const useStyle = makeStyles((theme) => ({
    linkToEdit: {
        textDecoration: "none",
    },
    card: {
        padding: theme.spacing(0, 1, 0.5, 1),
        margin: theme.spacing(0, 0, 1, 0),
    },
    title: {
        margin: theme.spacing(1, 0, 0.5, 0.3),
        wordWrap: "break-word",
    },
    bottomContainer: { display: "flex", alignItems: "center" },
    favouriteIcon: { color: pink[600] },
}));

let MemoExcerpt = ({ data, categoryId, memoIndex }) => {
    const classes = useStyle();
    const location = useLocation();

    return (
        <div>
            <Draggable draggableId={data.id} index={memoIndex}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        style={{
                            padding: 1,
                            ...provided.draggableProps.style,
                        }}
                    >
                        <Link
                            to={`memo/${categoryId}/${memoIndex}/edit`}
                            state={{ background: location }}
                            className={classes.linkToEdit}
                        >
                            <Card className={classes.card}>
                                <p aria-label="Title" className={classes.title}>
                                    {data.title}
                                </p>
                                <div className={classes.bottomContainer}>
                                    {data.dueDate ? (
                                        <div aria-label="Due Date Card">
                                            <DueDateCard
                                                dueDate={data.dueDate}
                                                complete={data.complete}
                                                aria-label="Due Date Card"
                                            />
                                        </div>
                                    ) : null}
                                    {data.description ? (
                                        <div aria-label="Description">
                                            <NotesIcon aria-label="Notes Icon" />
                                        </div>
                                    ) : null}
                                    {data.favourite ? (
                                        <div aria-label="Favourite">
                                            <Favorite
                                                className={
                                                    classes.favouriteIcon
                                                }
                                                aria-label="Favorite Icon"
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            </Card>
                        </Link>
                    </div>
                )}
            </Draggable>
        </div>
    );
};

const areEqual = (prevProps, nextProps) => {
    return (
        prevProps.categoryId === nextProps.categoryId &&
        prevProps.memoIndex === nextProps.memoIndex &&
        prevProps.data.id === nextProps.data.id &&
        prevProps.data.dueDate === nextProps.data.dueDate &&
        prevProps.data.title === nextProps.data.title &&
        prevProps.data.description === nextProps.data.description &&
        prevProps.data.complete === nextProps.data.complete &&
        prevProps.data.favourite === nextProps.data.favourite
    );
};

const MemoizedMemoExcerpt = React.memo(MemoExcerpt, areEqual);
export default MemoizedMemoExcerpt;
