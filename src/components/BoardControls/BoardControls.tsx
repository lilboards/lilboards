import Box from '@material-ui/core/Box';

import AddButton from '../AddButton';

import actions from '../../actions';
import { generateId } from '../../firebase';
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
        boardId: props.boardId,
        column,
        columnId,
      })
    );
    dispatch(actions.setUserEditing({ columnId }));
  }

  return (
    <Box marginBottom={4}>
      <AddButton onClick={addColumn} size="medium" variant="extended">
        Add column
      </AddButton>
    </Box>
  );
}
