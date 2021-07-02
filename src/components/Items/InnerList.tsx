import { memo } from 'react';

import DraggableItem from './DraggableItem';

import type { Id } from '../../types';

type Props = {
  boardId: Id;
  columnId: Id;
  itemIds: Id[];
};

function InnerList(props: Props) {
  return (
    <>
      {props.itemIds.map((itemId, index) => (
        <DraggableItem
          boardId={props.boardId}
          columnId={props.columnId}
          key={itemId}
          itemId={itemId}
          itemIndex={index}
        />
      ))}
    </>
  );
}

// https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md#recommended-droppable--performance-optimisation
export default memo(InnerList);
