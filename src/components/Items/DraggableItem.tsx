import { Draggable } from '@hello-pangea/dnd';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import type { Id } from 'src/types';

import Item from '../Item';
import { getDraggableCardStyle } from './styles';

interface Props {
  boardId: Id;
  columnId: Id;
  itemId: Id;
  itemIndex: number;
}

export default function DraggableItem(props: Props) {
  const theme = useTheme();

  return (
    <Draggable draggableId={props.itemId} index={props.itemIndex}>
      {(draggableProvided, draggableSnapshot) => (
        <div
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
        >
          <Box paddingBottom={2}>
            <Item
              boardId={props.boardId}
              cardStyle={getDraggableCardStyle(draggableSnapshot, theme)}
              columnId={props.columnId}
              itemId={props.itemId}
            />
          </Box>
        </div>
      )}
    </Draggable>
  );
}
