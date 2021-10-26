import actions from '../../actions';
import { firebaseAnalytics, generateId } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import type { Column, Id } from '../../types';
import AddButton from '../AddButton';

interface Props {
  boardId: Id;
}

export default function AddColumn(props: Props) {
  const dispatch = useDispatch();
  const canEdit = useSelector(
    (state) => (state.boards[props.boardId] || {}).createdBy === state.user.id
  );
  const userId = useSelector((state) => state.user.id);

  if (!canEdit) {
    return null;
  }

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
    <AddButton onClick={addColumn} size="medium" variant="extended">
      Add column
    </AddButton>
  );
}
