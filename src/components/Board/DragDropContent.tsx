import { DragDropContext } from 'react-beautiful-dnd';

import Columns from '../Columns';

import type { Id } from '../../types';

type Props = {
  boardId: Id;
};

export default function Board(props: Props) {
  /* istanbul ignore next */
  function handleDragEnd() {}

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Columns boardId={props.boardId} />
    </DragDropContext>
  );
}
