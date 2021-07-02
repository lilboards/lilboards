import Box from '@material-ui/core/Box';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Item from '../Item';

import { useSelector } from '../../hooks';

import type { Id } from '../../types';

type Props = {
  boardId: Id;
  columnId: Id;
};

export default function DroppableItems(props: Props) {
  const itemIds = useSelector(
    (state) => (state.columns[props.columnId] || {}).itemIds
  );

  return (
    <Droppable droppableId={props.columnId}>
      {(droppableProvided, droppableSnapshot) => (
        <div
          {...droppableProvided.droppableProps}
          ref={droppableProvided.innerRef}
        >
          <Box
            bgcolor={
              /* istanbul ignore next */
              droppableSnapshot.isDraggingOver ? 'grey.200' : undefined
            }
          >
            {itemIds &&
              itemIds.map((itemId, index) => (
                <Draggable draggableId={itemId} index={index} key={itemId}>
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      ref={draggableProvided.innerRef}
                    >
                      <Box paddingBottom={2}>
                        <Item
                          boardId={props.boardId}
                          columnId={props.columnId}
                          itemId={itemId}
                        />
                      </Box>
                    </div>
                  )}
                </Draggable>
              ))}

            {droppableProvided.placeholder}
          </Box>
        </div>
      )}
    </Droppable>
  );
}
