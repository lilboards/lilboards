import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from '@reach/router';
import TextField from '@material-ui/core/TextField';

import type { ChangeEvent } from 'react';
import type { Id } from '../../types';

import CloseButton from '../CloseButton';

import actions from '../../actions';
import { debouncedSaveBoardData } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';

export default function BoardsCards() {
  const dispatch = useDispatch();
  const boards = useSelector((state) =>
    Object.entries(state.boards).map(([id, board]) => ({ ...board, id }))
  );
  const userEditingBoardId = useSelector((state) => state.user.editing.boardId);
  const userId = useSelector((state) => state.user.id);

  if (!boards.length) {
    return null;
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const boardId = event.target.id;
    const board = {
      name: event.target.value,
      updated: Date.now(),
    };
    dispatch(
      actions.editBoard({
        ...board,
        boardId,
      })
    );
    debouncedSaveBoardData(boardId, board);
  }

  function handleBlur() {
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
                  autoFocus={userEditingBoardId === boardId}
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
  );
}
