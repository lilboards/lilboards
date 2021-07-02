import { DragDropContext } from 'react-beautiful-dnd';

import actions from '../../actions';
import { useDispatch, useSelector } from '../../hooks';
import reorder from './reorder';

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
