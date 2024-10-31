import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { useDispatch, useSelector } from 'src/hooks';
import { actions } from 'src/store';
import type { Id } from 'src/types';
import { reorder } from 'src/utils';

interface Props {
  listId: Id;
  children: React.ReactNode;
}

export default function DragDropContainer(props: Props) {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.rows);

  /* istanbul ignore next */
  function handleDragEnd(result: DropResult) {
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
      actions.setRowItemIds({
        listId: props.listId,
        rowItemIds: reorder(source, destination, rows),
      }),
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {props.children}
    </DragDropContext>
  );
}
