import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { useDispatch, useSelector, useUserId } from 'src/hooks';
import { actions } from 'src/store';
import type { Id } from 'src/types';
import { reorder } from 'src/utils';

import { combine } from './utils';

interface Props {
  boardId: Id;
  children: React.ReactNode;
}

export default function DragDropContainer(props: Props) {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.columns);
  const items = useSelector((state) => state.items);
  const likes = useSelector((state) => state.likes.items);
  const userId = useUserId();

  /* istanbul ignore next */
  function handleDragEnd(result: DropResult) {
    if (result.combine) {
      const { remove, update } = combine(result, items, likes);

      // update item
      dispatch(
        actions.updateItem({
          boardId: props.boardId,
          item: {
            text: update.text,
            updatedAt: Date.now(),
            updatedBy: userId,
          },
          itemId: update.itemId,
        }),
      );

      // update likes
      dispatch(
        actions.setLikesItem({
          boardId: props.boardId,
          itemId: update.itemId,
          likes: update.likes,
        }),
      );

      dispatch(
        actions.removeLikesItem({
          boardId: props.boardId,
          itemId: remove.itemId,
        }),
      );

      // remove item
      dispatch(
        actions.removeItem({
          boardId: props.boardId,
          itemId: remove.itemId,
        }),
      );

      dispatch(
        actions.removeColumnItemId({
          boardId: props.boardId,
          columnId: remove.columnId,
          itemId: remove.itemId,
        }),
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
        columnItemIds: reorder(source, destination, columns),
      }),
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {props.children}
    </DragDropContext>
  );
}
