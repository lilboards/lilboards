import AddButton from 'src/components/AddButton';
import { generateId, logEvent, saveUserBoardId } from 'src/firebase';
import { useDispatch, useGetUserId } from 'src/hooks';
import { actions } from 'src/store';
import type { Board } from 'src/types';

export default function AddBoard() {
  const dispatch = useDispatch();
  const userId = useGetUserId();

  function addBoard() {
    const board: Board = {
      createdAt: Date.now(),
      createdBy: userId,
      name: '',
    };
    const boardId = generateId();
    dispatch(
      actions.updateBoard({
        board,
        boardId,
      }),
    );
    dispatch(actions.setUserEditing({ boardId }));
    saveUserBoardId(userId, boardId);
    logEvent('create_board');
  }

  return (
    <AddButton
      onClick={addBoard}
      size="medium"
      sx={{ marginBottom: 2 }}
      variant="extended"
    >
      Add board
    </AddButton>
  );
}
