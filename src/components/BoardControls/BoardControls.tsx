import Box from '@material-ui/core/Box';

import AddButton from '../AddButton';
import Sort from './Sort';

import actions from '../../actions';
import { firebaseAnalytics, generateId } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';

import type { Column, Id } from '../../types';

interface Props {
  boardId: Id;
}

export default function BoardControls(props: Props) {
  const dispatch = useDispatch();
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

  return (
    <Box display="flex" marginBottom={4}>
      <Box flexGrow={1}>
        {canEdit && (
          <AddButton onClick={addColumn} size="medium" variant="extended">
            Add column
          </AddButton>
        )}
      </Box>

      <Sort boardId={props.boardId} />
    </Box>
  );
}
