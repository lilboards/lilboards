import AddButton from 'src/components/AddButton';
import { DatabaseKey } from 'src/constants';
import { generateId, logEvent } from 'src/firebase';
import { useDispatch, useGetUserId, useIsAdmin } from 'src/hooks';
import { actions } from 'src/store';
import type { Column, Id } from 'src/types';

interface Props {
  boardId: Id;
}

export default function AddColumn(props: Props) {
  const dispatch = useDispatch();
  const canEdit = useIsAdmin(DatabaseKey.boards, props.boardId);
  const userId = useGetUserId();

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
      }),
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
