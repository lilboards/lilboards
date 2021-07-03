import Grid from '@material-ui/core/Grid';

import Column from '../Column';
import DragDropContainer from './DragDropContainer';

import { useDispatch, useSelector } from '../../hooks';
import { useColumns, useItems } from './hooks';

import type { Id } from '../../types';

type Props = {
  boardId: Id;
};

export default function Columns(props: Props) {
  const dispatch = useDispatch();
  const columnIds = useSelector((state) => Object.keys(state.columns));
  useColumns(props.boardId, dispatch);
  useItems(props.boardId, dispatch);

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
