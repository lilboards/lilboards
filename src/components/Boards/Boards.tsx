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

import { getBoardVal, getUserBoardsVal } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import actions from '../../actions';

export default function Boards(props: RouteComponentProps) {
  const userId = useSelector((state) => state.user.id);
  const boards = useSelector((state) =>
    Object.entries(state.boards).map(([id, board]) => ({ ...board, id }))
  );
  const dispatch = useDispatch();

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
          if (!board) {
            return;
          }
          board.id = boardId;
          return board;
        })
      );

      boards.forEach((board) => dispatch(actions.loadBoard(board)));
    })();
  }, [userId, dispatch]);

  function addBoard() {
    dispatch(actions.addBoard(userId));
  }

  function editBoard(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    dispatch(
      actions.editBoard({
        id: event.target.id,
        name: event.target.value,
      })
    );
  }

  function deleteBoard(id: Id) {
    dispatch(
      actions.deleteBoard({
        id,
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
        {boards.reverse().map((board) => (
          <Grid item key={board.id} xs={12} sm={6} md={3}>
            <Box component={Card} height="100%" position="relative">
              <Box position="absolute" right={0} top={0}>
                <CloseButton
                  aria-label={`Delete board "${board.name || board.id}"`}
                  onClick={() => deleteBoard(board.id)}
                />
              </Box>

              <CardContent>
                <TextField
                  autoFocus={board.focus}
                  fullWidth
                  id={board.id}
                  label="Board Name"
                  margin="normal"
                  placeholder="Untitled Board"
                  onChange={editBoard}
                  value={board.name}
                />
              </CardContent>

              <CardActions>
                <Button
                  color="primary"
                  component={RouterLink}
                  to={`/boards/${board.id}`}
                >
                  Open board
                </Button>
              </CardActions>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
