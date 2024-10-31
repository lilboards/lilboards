import { Draggable } from '@hello-pangea/dnd';
import type { Id } from 'src/types';

import ListItem from '../ListItem';

interface Props {
  listId: Id;
  rowId: Id;
  itemId: Id;
  itemIndex: number;
}

export default function DraggableItem(props: Props) {
  return (
    <Draggable draggableId={props.itemId} index={props.itemIndex}>
      {(draggableProvided) => (
        <div
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
        >
          <ListItem
            listId={props.listId}
            rowId={props.rowId}
            itemId={props.itemId}
          />
        </div>
      )}
    </Draggable>
  );
}
