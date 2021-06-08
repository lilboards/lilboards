import { useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import type { ChangeEvent } from 'react';
import type { RouteComponentProps } from '@reach/router';

import Layout from '../Layout';

import { boardsRef } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import actions from '../../actions';

export default function Boards(props: RouteComponentProps) {
  const userId = useSelector((state) => state.user.id);
  const boards = useSelector((state) =>
    Object.entries(state.boards).map(([id, board]) => ({
      ...board,
      id,
    }))
  );
  const dispatch = useDispatch();

  useEffect(() => {
    boardsRef.once('value', (snapshot) => {
      const boards = snapshot.val();
      /* istanbul ignore next */
      if (boards) {
        dispatch(actions.loadBoards(boards));
      }
    });
  }, [dispatch]);

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

  function deleteBoard(boardId: string) {
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
        <Fab aria-label="Create board" color="primary" onClick={addBoard}>
          <AddIcon />
        </Fab>
      </Box>

      <Grid container spacing={2}>
        {boards.reverse().map((board) => (
          <Grid item key={board.id} xs={12} sm={6} md={3}>
            <Box component={Card} height="100%" position="relative">
              <Box position="absolute" right={0} top={0}>
                <IconButton
                  aria-label={`Delete board "${board.name || board.id}"`}
                  onClick={() => deleteBoard(board.id)}
                >
                  <CloseIcon />
                </IconButton>
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
                <Button color="primary">Open board</Button>
              </CardActions>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
