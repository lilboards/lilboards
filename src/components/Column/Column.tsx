import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { useSelector } from '../../hooks';
import type { Id } from '../../types';
import Items from '../Items';
import ColumnName from './ColumnName';

interface Props {
  boardId: Id;
  columnId: Id;
  columnIndex: number;
}

export default function Column(props: Props) {
  const column = useSelector((state) => state.columns[props.columnId]);

  if (!column) {
    return null;
  }

  return (
    <Grid item xs>
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
