import { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import AddButton from '../AddButton';
import BoardCards from './BoardCards';
import Layout from '../Layout';

import actions from '../../actions';
import {
  firebaseAnalytics,
  generateId,
  getBoardVal,
  getUserBoardsVal,
  saveUserBoardId,
} from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';

import type { RouteComponentProps } from '@reach/router';
import type { Board } from '../../types';

export default function Boards(props: RouteComponentProps) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    (async () => {
      const userBoards = await getUserBoardsVal(userId);
      if (!userBoards) {
        return;
      }

      const boardIds = Object.keys(userBoards);
      const boards = await Promise.all(
        boardIds.map(async (boardId) => {
          const board = await getBoardVal(boardId);
          if (board) {
            return {
              ...board,
              id: boardId,
            };
          }
        })
      );

      boards.forEach((board) => board && dispatch(actions.loadBoard(board)));
    })();
  }, [dispatch, userId]);

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
    firebaseAnalytics.logEvent('create_board');
  }

  return (
    <Layout>
      <Typography component="h1" gutterBottom variant="h4">
        Boards
      </Typography>

      <Box marginBottom={2}>
        <AddButton aria-label="Create board" onClick={addBoard} />
      </Box>

      <BoardCards />
    </Layout>
  );
}
