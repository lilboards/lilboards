import Grid from '@mui/material/Grid';

import { useSelector } from '../../hooks';
import type { Id } from '../../types';
import Column from '../Column';
import DragDropContainer from './DragDropContainer';
import { useColumns, useItems, useLikes } from './hooks';

type Props = {
  boardId: Id;
};

export default function Columns(props: Props) {
  useColumns(props.boardId);
  useItems(props.boardId);
  useLikes(props.boardId);
  const columnIds = useSelector((state) => Object.keys(state.columns));

  return (
    <Grid container spacing={2} wrap="nowrap">
      <DragDropContainer boardId={props.boardId}>
        {columnIds.map((columnId, index) => (
          <Column
            boardId={props.boardId}
            columnId={columnId}
            columnIndex={index}
            key={columnId}
          />
        ))}
      </DragDropContainer>
    </Grid>
  );
}
