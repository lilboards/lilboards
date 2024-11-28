import AddButton from 'src/components/AddButton';
import { DatabaseKey } from 'src/constants';
import { generateId, logEvent } from 'src/firebase';
import { useDispatch, useIsAdmin, useUserId } from 'src/hooks';
import { actions } from 'src/store';
import type { Id, Row } from 'src/types';

interface Props {
  listId: Id;
}

export default function AddRow(props: Props) {
  const dispatch = useDispatch();
  const canEdit = useIsAdmin(DatabaseKey.lists, props.listId);
  const userId = useUserId();

  if (!canEdit) {
    return null;
  }

  function addRow() {
    const row: Row = {
      createdAt: Date.now(),
      createdBy: userId,
      name: '',
    };
    const rowId = generateId();

    dispatch(
      actions.updateRow({
        listId: props.listId,
        row,
        rowId,
      }),
    );

    dispatch(actions.setUserEditing({ rowId }));
    logEvent('create_row');
  }

  return (
    <AddButton onClick={addRow} size="medium" variant="extended">
      Add row
    </AddButton>
  );
}
