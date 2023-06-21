import AddButton from '../../components/AddButton';
import { generateId, logEvent, saveUserBoardId } from '../../firebase';
import { useDispatch, useGetUserId } from '../../hooks';
import { actions } from '../../store';
import type { Board } from '../../types';

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
      })
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
