import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

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

  /* istanbul ignore next */
  function sortByLikes() {}

  return (
    <Box display="flex" marginBottom={4}>
      <Box flexGrow={1}>
        <AddButton onClick={addColumn} size="medium" variant="extended">
          Add column
        </AddButton>
      </Box>

      <Button color="primary" onClick={sortByLikes} variant="outlined">
        Sort by likes
      </Button>
    </Box>
  );
}
