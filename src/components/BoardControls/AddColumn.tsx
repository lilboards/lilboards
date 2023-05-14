import { generateId, logEvent } from '../../firebase';
import { useDispatch, useIsAdmin, useSelector } from '../../hooks';
import { actions } from '../../store';
import type { Column, Id } from '../../types';
import AddButton from '../AddButton';

interface Props {
  boardId: Id;
}

export default function AddColumn(props: Props) {
  const dispatch = useDispatch();
  const canEdit = useIsAdmin(props.boardId);
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
    logEvent('create_column');
  }

  return (
    <AddButton onClick={addColumn} size="medium" variant="extended">
      Add column
    </AddButton>
  );
}
