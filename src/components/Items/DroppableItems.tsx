import { Droppable } from '@hello-pangea/dnd';
import Box from '@mui/material/Box';
import { DatabaseKey } from 'src/constants';
import { useGetItemIds } from 'src/hooks';
import type { Id } from 'src/types';

import InnerList from './InnerList';
import { getDroppableBackgroundColor } from './styles';

interface Props {
  boardId: Id;
  columnId: Id;
}

export default function DroppableItems(props: Props) {
  const itemIds = useGetItemIds(DatabaseKey.columns, props.columnId);

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
