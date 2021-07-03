import Box from '@material-ui/core/Box';
import { Droppable } from 'react-beautiful-dnd';

import InnerList from './InnerList';

import { useSelector } from '../../hooks';
import { getBackgroundColor } from './styles';

import type { Id } from '../../types';

type Props = {
  boardId: Id;
  columnId: Id;
};

export default function DroppableItems(props: Props) {
  const itemIds = useSelector(
    (state) => (state.columns[props.columnId] || {}).itemIds || []
  );

  return (
    <Droppable droppableId={props.columnId} isCombineEnabled>
      {(droppableProvided, droppableSnapshot) => (
        <div
          {...droppableProvided.droppableProps}
          ref={droppableProvided.innerRef}
        >
          <Box bgcolor={getBackgroundColor(droppableSnapshot)}>
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
