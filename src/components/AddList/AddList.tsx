import AddButton from 'src/components/AddButton';
import { generateId, logEvent, saveUserListId } from 'src/firebase';
import { useDispatch, useGetUserId } from 'src/hooks';
import { actions } from 'src/store';
import type { List } from 'src/types';

export default function AddList() {
  const dispatch = useDispatch();
  const userId = useGetUserId();

  function addList() {
    const list: List = {
      createdAt: Date.now(),
      createdBy: userId,
      name: '',
    };
    const listId = generateId();
    dispatch(
      actions.updateList({
        list,
        listId,
      }),
    );
    dispatch(actions.setUserEditing({ listId }));
    saveUserListId(userId, listId);
    logEvent('create_list');
  }

  return (
    <AddButton
      onClick={addList}
      size="medium"
      sx={{ marginBottom: 2 }}
      variant="extended"
    >
      Add list
    </AddButton>
  );
}
