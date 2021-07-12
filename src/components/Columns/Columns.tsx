import Grid from '@material-ui/core/Grid';

import Column from '../Column';
import DragDropContainer from './DragDropContainer';

import { useSelector } from '../../hooks';
import { useColumns, useItems, useLikes } from './hooks';

import type { Id } from '../../types';

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
