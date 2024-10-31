import { memo } from 'react';
import type { Id } from 'src/types';

import DraggableItem from './DraggableItem';

interface Props {
  listId: Id;
  rowId: Id;
  itemIds: Id[];
}

function InnerList(props: Props) {
  return (
    <>
      {props.itemIds.map((itemId, index) => (
        <DraggableItem
          listId={props.listId}
          rowId={props.rowId}
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
