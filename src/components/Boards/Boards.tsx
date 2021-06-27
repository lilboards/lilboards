import { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from '@reach/router';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import type { ChangeEvent } from 'react';
import type { RouteComponentProps } from '@reach/router';
import type { Id } from '../../types';

import AddButton from '../AddButton';
import CloseButton from '../CloseButton';
import Layout from '../Layout';

import actions from '../../actions';
import {
  generateId,
  getBoardVal,
  getUserBoardsVal,
  saveBoardData,
  saveUserBoardId,
} from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';

export default function Boards(props: RouteComponentProps) {
  const dispatch = useDispatch();
  const boards = useSelector((state) =>
    Object.entries(state.boards).map(([id, board]) => ({ ...board, id }))
  );
  const user = useSelector((state) => state.user);
  const userId = user.id;

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
    const board = {
      created: now,
      name: '',
      updated: now,
    };
    dispatch(
      actions.editBoard({
        ...board,
        boardId,
      })
    );
    dispatch(actions.toggleUserEditing({ boardId }));
    saveBoardData(boardId, board);
    saveUserBoardId(userId, boardId);
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const boardId = event.target.id;
    const name = event.target.value;
    dispatch(
      actions.editBoard({
        boardId,
        name,
        updated: Date.now(),
      })
    );
  }

  function handleBlur(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const boardId = event.target.id;
    const board = boards.find((board) => board.id === boardId);
    /* istanbul ignore next */
    if (board) {
      saveBoardData(boardId, board);
    }
    dispatch(actions.toggleUserEditing({ boardId: '' }));
  }

  function deleteBoard(boardId: Id) {
    dispatch(
      actions.deleteBoard({
        boardId,
        userId,
      })
    );
  }

  return (
    <Layout>
      <Typography component="h1" gutterBottom variant="h4">
        Boards
      </Typography>

      <Box marginBottom={2}>
        <AddButton aria-label="Create board" onClick={addBoard} />
      </Box>

      <Grid container spacing={2}>
        {boards.reverse().map((board) => {
          const boardId = board.id;
          const boardName = board.name;

          return (
            <Grid item key={boardId} xs={12} sm={6} md={3}>
              <Box component={Card} height="100%" position="relative">
                <Box position="absolute" right={0} top={0}>
                  <CloseButton
                    aria-label={`Delete board "${boardName || boardId}"`}
                    onClick={() => deleteBoard(boardId)}
                  />
                </Box>

                <CardContent>
                  <TextField
                    autoFocus={user.editing.boardId === boardId}
                    fullWidth
                    id={boardId}
                    label="Board Name"
                    margin="normal"
                    placeholder="Untitled Board"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={boardName}
                  />
                </CardContent>

                <CardActions>
                  <Button
                    color="primary"
                    component={RouterLink}
                    to={`/boards/${boardId}`}
                  >
                    Open board
                  </Button>
                </CardActions>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Layout>
  );
}
