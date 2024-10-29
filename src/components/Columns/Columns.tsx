import Grid from '@mui/material/Grid';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'src/hooks';
import type { Id, RootState } from 'src/types';

import Column from '../Column';
import DragDropContainer from './DragDropContainer';
import { useColumns, useItems, useLikes } from './hooks';

interface Props {
  boardId: Id;
}

const selectColumnIds = createSelector(
  (state: RootState) => state.columns,
  (columns) => Object.keys(columns),
);

export default function Columns(props: Props) {
  useColumns(props.boardId);
  useItems(props.boardId);
  useLikes(props.boardId);

  const columnIds = useSelector(selectColumnIds);

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
