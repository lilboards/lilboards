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
import { useDispatch, useSelector } from '../../hooks';

type Props = {
  boardId: Id;
};

export default function BoardCard(props: Props) {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boards[props.boardId]);
  const isEditing = useSelector(
    (state) => state.user.editing.boardId === props.boardId
  );
  const userId = useSelector((state) => state.user.id);

  if (!board) {
    return null;
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    dispatch(
      actions.updateBoard({
        board: {
          name: event.target.value,
          updatedAt: Date.now(),
        },
        boardId: props.boardId,
        debounce: true,
      })
    );
  }

  function handleBlur() {
    dispatch(actions.setUserEditing({ boardId: '' }));
  }

  function handleFocus() {
    dispatch(actions.setUserEditing({ boardId: props.boardId }));
  }

  function deleteBoard() {
    dispatch(
      actions.deleteBoard({
        boardId: props.boardId,
        userId,
      })
    );
  }

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Box height="100%" position="relative">
        <Card raised={isEditing}>
          <Box position="absolute" right={0} top={0}>
            <CloseButton
              aria-label={`Delete board "${board.name || props.boardId}"`}
              onClick={deleteBoard}
            />
          </Box>

          <CardContent>
            <TextField
              autoFocus={isEditing}
              fullWidth
              id={props.boardId}
              label="Board Name"
              margin="normal"
              placeholder="Untitled Board"
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
              value={board.name}
            />
          </CardContent>

          <CardActions>
            <Button
              color="primary"
              component={RouterLink}
              to={`/boards/${props.boardId}`}
            >
              Open board
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
}
