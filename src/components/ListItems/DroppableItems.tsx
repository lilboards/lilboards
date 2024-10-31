import { Droppable } from '@hello-pangea/dnd';
import Box from '@mui/material/Box';
import { DatabaseKey } from 'src/constants';
import { useGetItemIds } from 'src/hooks';
import type { Id } from 'src/types';

import InnerList from './InnerList';
import { getDroppableBackgroundColor } from './styles';

interface Props {
  listId: Id;
  rowId: Id;
}

export default function DroppableItems(props: Props) {
  const itemIds = useGetItemIds(DatabaseKey.rows, props.rowId);

  return (
    <Droppable droppableId={props.rowId}>
      {(droppableProvided, droppableSnapshot) => (
        <div
          {...droppableProvided.droppableProps}
          ref={droppableProvided.innerRef}
        >
          <Box bgcolor={getDroppableBackgroundColor(droppableSnapshot)}>
            <InnerList
              listId={props.listId}
              rowId={props.rowId}
              itemIds={itemIds}
            />

            {droppableProvided.placeholder}
          </Box>
        </div>
      )}
    </Droppable>
  );
}
