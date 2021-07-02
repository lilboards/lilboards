import { DragDropContext } from 'react-beautiful-dnd';

import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function DragDropContainer(props: Props) {
  /* istanbul ignore next */
  function handleDragEnd() {}

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {props.children}
    </DragDropContext>
  );
}
