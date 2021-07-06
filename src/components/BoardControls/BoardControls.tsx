import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import AddButton from '../AddButton';

import actions from '../../actions';
import { firebaseAnalytics, generateId } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import { sortByLikes } from './utils';

import type { Column, Id } from '../../types';

type Props = {
  boardId: Id;
};

export default function BoardControls(props: Props) {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.columns);
  const items = useSelector((state) => state.items);
  const canEdit = useSelector(
    (state) => (state.boards[props.boardId] || {}).createdBy === state.user.id
  );
  const userId = useSelector((state) => state.user.id);

  function addColumn() {
    const column: Column = {
      createdAt: Date.now(),
      createdBy: userId,
      name: '',
    };
    const columnId = generateId();
    dispatch(
      actions.updateColumn({
        boardId: props.boardId,
        column,
        columnId,
      })
    );
    dispatch(actions.setUserEditing({ columnId }));
    firebaseAnalytics.logEvent('create_column');
  }

  function sortItems() {
    dispatch(
      actions.setColumnItemIds({
        boardId: props.boardId,
        columnItemIds: sortByLikes(columns, items),
      })
    );
  }

  return (
    <Box display="flex" marginBottom={4}>
      <Box flexGrow={1}>
        {canEdit && (
          <AddButton onClick={addColumn} size="medium" variant="extended">
            Add column
          </AddButton>
        )}
      </Box>

      <Button color="primary" onClick={sortItems} variant="outlined">
        Sort by likes
      </Button>
    </Box>
  );
}
