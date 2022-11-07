import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { useDispatch, useSelector } from "react-redux";
import { selectAllMemos, swapMemo, swapCategory } from "../redux/memosSlice";

import MemosList from "./list/MemosList";
import InputContainer from "./input/InputContainer";
import { makeStyles } from "@material-ui/core/styles";
import { useCallback } from "react";

const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        padding: 10,
    },
    listsContainer: {
        display: "flex",
    },
    addCategoryContainer: {
        paddingLeft: "1px",
        paddingRight: "10px",
        maxWidth: "280px",
        minWidth: "280px",
    },
}));

const Home = () => {
    const classes = useStyle();

    const dispatch = useDispatch();

    const data = useSelector(selectAllMemos);

    const onDragEnd = useCallback(
        (result) => {
            const { destination, source, type } = result;
            if (!destination) return;
            if (type === "category")
                dispatch(swapCategory({ source, destination, type }));
            else {
                dispatch(swapMemo({ source, destination, type }));
            }
        },
        [dispatch]
    );
    return (
        <div className={classes.root}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="home"
                    type="category"
                    direction="horizontal"
                >
                    {(provided) => (
                        <div
                            className={classes.listsContainer}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {data.categoryIds.map((categoryId, index) => (
                                <div key={categoryId} aria-label="Category">
                                    <MemosList
                                        category={data.categories[categoryId]}
                                        categoryId={categoryId}
                                        index={index}
                                    />
                                </div>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className={classes.addCategoryContainer}>
                <InputContainer type="Category" />
            </div>
        </div>
    );
};

export default Home;
