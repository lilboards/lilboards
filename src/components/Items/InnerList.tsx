import { memo } from 'react';
import type { Id } from 'src/types';

import DraggableItem from './DraggableItem';

interface Props {
  boardId: Id;
  columnId: Id;
  itemIds: Id[];
}

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

/**
 * @see {@link https://github.com/hello-pangea/dnd/blob/main/docs/api/droppable.md#recommended-droppable--performance-optimisation}
 */
export default memo(InnerList);
