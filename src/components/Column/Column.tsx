import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'src/hooks';
import type { Id, RootState } from 'src/types';

import Items from '../Items';
import ColumnName from './ColumnName';

interface Props {
  boardId: Id;
  columnId: Id;
  columnIndex: number;
}

const selectColumn = createSelector(
  (state: RootState) => state.columns,
  (_: unknown, columnId: Id) => columnId,
  (columns, columnId) => columns[columnId],
);

export default function Column(props: Props) {
  const column = useSelector((state) => selectColumn(state, props.columnId));

  if (!column) {
    return null;
  }

  return (
    <Grid size="grow">
      <Box marginBottom={2} position="relative">
        <ColumnName
          boardId={props.boardId}
          columnId={props.columnId}
          name={column.name}
          placeholder={`Column ${props.columnIndex + 1}`}
        />
      </Box>
      <Items boardId={props.boardId} columnId={props.columnId} />
    </Grid>
  );
}
