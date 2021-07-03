import Box from '@material-ui/core/Box';

import AddButton from '../AddButton';

import actions from '../../actions';
import { generateId, updateColumn } from '../../firebase';
import { useDispatch } from '../../hooks';

import type { Id } from '../../types';

type Props = {
  boardId: Id;
};

export default function BoardControls(props: Props) {
  const dispatch = useDispatch();

  function addColumn() {
    const columnId = generateId();
    const now = Date.now();
    const column = {
      created: now,
      name: '',
      updated: now,
    };
    dispatch(
      actions.updateColumn({
        ...column,
        columnId,
      })
    );
    dispatch(actions.setUserEditing({ columnId }));
    updateColumn(props.boardId, columnId, column);
  }

  return (
    <Box marginBottom={4}>
      <AddButton onClick={addColumn} size="medium" variant="extended">
        Add column
      </AddButton>
    </Box>
  );
}
