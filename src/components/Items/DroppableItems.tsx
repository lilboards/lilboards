import Box from '@mui/material/Box';
import { Droppable } from 'react-beautiful-dnd';

import { useGetItemIds } from '../../hooks';
import type { Id } from '../../types';
import InnerList from './InnerList';
import { getDroppableBackgroundColor } from './styles';

interface Props {
  boardId: Id;
  columnId: Id;
}

export default function DroppableItems(props: Props) {
  const itemIds = useGetItemIds(props.columnId);

  return (
    <Droppable droppableId={props.columnId} isCombineEnabled>
      {(droppableProvided, droppableSnapshot) => (
        <div
          {...droppableProvided.droppableProps}
          ref={droppableProvided.innerRef}
        >
          <Box bgcolor={getDroppableBackgroundColor(droppableSnapshot)}>
            <InnerList
              boardId={props.boardId}
              columnId={props.columnId}
              itemIds={itemIds}
            />

            {droppableProvided.placeholder}
          </Box>
        </div>
      )}
    </Droppable>
  );
}
