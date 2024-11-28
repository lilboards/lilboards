import Row from 'src/components/Row';
import { useRowIds } from 'src/hooks';
import type { Id } from 'src/types';

import DragDropContainer from './DragDropContainer';
import { useItems, useRows } from './hooks';

interface Props {
  listId: Id;
}

export default function Rows(props: Props) {
  useRows(props.listId);
  useItems(props.listId);
  const rowIds = useRowIds();

  return (
    <DragDropContainer listId={props.listId}>
      {rowIds.map((rowId, index) => (
        <Row listId={props.listId} rowId={rowId} rowIndex={index} key={rowId} />
      ))}
    </DragDropContainer>
  );
}
