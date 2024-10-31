import Row from 'src/components/Row';
import { useGetRowIds } from 'src/hooks';
import type { Id } from 'src/types';

import DragDropContainer from './DragDropContainer';
import { useItems, useRows } from './hooks';

interface Props {
  listId: Id;
}

export default function Rows(props: Props) {
  useRows(props.listId);
  useItems(props.listId);
  const rowIds = useGetRowIds();

  return (
    <DragDropContainer listId={props.listId}>
      {rowIds.map((rowId, index) => (
        <Row listId={props.listId} rowId={rowId} rowIndex={index} key={rowId} />
      ))}
    </DragDropContainer>
  );
}
