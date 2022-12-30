import actions from '../../actions';
import AddButton from '../../components/AddButton';
import { generateId, logEvent, saveUserBoardId } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import type { Board } from '../../types';

export default function AddBoard() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

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
