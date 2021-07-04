import { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import type { RouteComponentProps } from '@reach/router';

import AddButton from '../AddButton';
import BoardCards from './BoardCards';
import Layout from '../Layout';

import actions from '../../actions';
import {
  generateId,
  getBoardVal,
  getUserBoardsVal,
  saveUserBoardId,
} from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';

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
    const boardId = generateId();
    const now = Date.now();
    dispatch(
      actions.updateBoard({
        board: {
          created: now,
          creator: userId,
          name: '',
          updated: now,
        },
        boardId,
      })
    );
    dispatch(actions.setUserEditing({ boardId }));
    saveUserBoardId(userId, boardId);
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
