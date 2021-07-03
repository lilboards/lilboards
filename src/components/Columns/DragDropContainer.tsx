import { DragDropContext } from 'react-beautiful-dnd';

import actions from '../../actions';
import { useDispatch, useSelector } from '../../hooks';
import { combine, reorder } from './utils';

import type { ReactNode } from 'react';
import type { DropResult } from 'react-beautiful-dnd';
import type { Id } from '../../types';

type Props = {
  boardId: Id;
  children: ReactNode;
};

export default function DragDropContainer(props: Props) {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.columns);
  const items = useSelector((state) => state.items);

  /* istanbul ignore next */
  function handleDragEnd(result: DropResult) {
    if (result.combine) {
      const { remove, update } = combine(items, result);

      // update item
      dispatch(
        actions.updateItem({
          boardId: props.boardId,
          item: {
            text: update.text,
            updated: Date.now(),
          },
          itemId: update.itemId,
        })
      );

      // remove item
      dispatch(
        actions.removeItem({
          boardId: props.boardId,
          itemId: remove.itemId,
        })
      );

      dispatch(
        actions.removeColumnItemId({
          boardId: props.boardId,
          columnId: remove.columnId,
          itemId: remove.itemId,
        })
      );
    }

    const { destination, source } = result;

    // dropped nowhere
    if (!destination) {
      return;
    }

    // did not move anywhere, can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    dispatch(
      actions.setColumnItemIds({
        boardId: props.boardId,
        columnItemIds: reorder(columns, source, destination),
      })
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {props.children}
    </DragDropContext>
  );
}
