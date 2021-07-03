import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import AddButton from '../AddButton';
import Column from '../Column';
import DragDropContainer from './DragDropContainer';

import actions from '../../actions';
import { generateId, updateColumn } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import { useColumns } from './useColumns';
import { useItems } from './useItems';

import type { Id } from '../../types';

type Props = {
  boardId: Id;
};

export default function Columns(props: Props) {
  const dispatch = useDispatch();
  const columnIds = useSelector((state) => Object.keys(state.columns));
  useColumns(props.boardId, dispatch);
  useItems(props.boardId, dispatch);

  function addColumn() {
    const columnId = generateId();
    const now = Date.now();
    const column = {
      created: now,
      name: '',
      updated: now,
    };
    dispatch(
      actions.editColumn({
        ...column,
        columnId,
      })
    );
    dispatch(actions.setUserEditing({ columnId }));
    updateColumn(props.boardId, columnId, column);
  }

  return (
    <>
      <Box marginBottom={4}>
        <AddButton onClick={addColumn} size="medium" variant="extended">
          Add column
        </AddButton>
      </Box>

      <Grid container spacing={2} wrap="nowrap">
        <DragDropContainer boardId={props.boardId}>
          {columnIds.map((columnId, index) => (
            <Column
              boardId={props.boardId}
              columnId={columnId}
              index={index}
              key={columnId}
            />
          ))}
        </DragDropContainer>
      </Grid>
    </>
  );
}
