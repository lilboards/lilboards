import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Link as RouterLink } from '@reach/router';
import type { ChangeEvent } from 'react';

import actions from '../../actions';
import { firebaseAnalytics } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import type { Id } from '../../types';
import CloseButton from '../CloseButton';

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
          updatedBy: userId,
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
    firebaseAnalytics.logEvent('delete_board');
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
