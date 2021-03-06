import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { RouteComponentProps } from '@reach/router';

import actions from '../../actions';
import { generateId, logEvent, saveUserBoardId } from '../../firebase';
import { useDispatch, useSelector, useSetDocumentTitle } from '../../hooks';
import type { Board } from '../../types';
import AddButton from '../AddButton';
import BoardCards from './BoardCards';
import { useBoards } from './hooks';

export default function Boards(props: RouteComponentProps) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  useBoards(dispatch, userId);
  useSetDocumentTitle('Boards');

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
    <>
      <Typography component="h1" gutterBottom variant="h4">
        Boards
      </Typography>

      <Box marginBottom={2}>
        <AddButton aria-label="Create board" onClick={addBoard} />
      </Box>

      <BoardCards />
    </>
  );
}
