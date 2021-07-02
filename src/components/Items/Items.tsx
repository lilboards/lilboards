import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Item from '../Item';

import actions from '../../actions';
import { generateId, updateItem } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';

import type { Id } from '../../types';

type Props = {
  boardId: Id;
  columnId: Id;
};

export default function Items(props: Props) {
  const dispatch = useDispatch();
  const itemIds = useSelector(
    (state) => (state.columns[props.columnId] || {}).itemIds
  );

  function addItem() {
    const itemId = generateId();
    const now = Date.now();
    const item = {
      created: now,
      text: '',
      updated: now,
    };
    dispatch(
      actions.updateItem({
        ...item,
        itemId,
      })
    );
    dispatch(
      actions.addColumnItemId({
        boardId: props.boardId,
        columnId: props.columnId,
        itemId,
      })
    );
    dispatch(actions.setUserEditing({ itemId }));
    updateItem(props.boardId, itemId, item);
  }

  return (
    <>
      <Box marginBottom={2}>
        <Button color="primary" fullWidth onClick={addItem} variant="contained">
          <AddIcon /> Add item
        </Button>
      </Box>

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
    </>
  );
}
