import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { nanoid } from "@reduxjs/toolkit";
import { Draggable } from "react-beautiful-dnd";

export const DropWrapper = (children) => {
    return (
        <DragDropContext>
            <Droppable droppableId={nanoid().toString()}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {children}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export const DragWrapper = (children) => {
    return (
        <DragDropContext>
            <Draggable draggableId={nanoid().toString()}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {children}
                    </div>
                )}
            </Draggable>
        </DragDropContext>
    );
};
