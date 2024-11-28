import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DeleteDialog from 'src/components/DeleteDialog';
import { DatabaseKey } from 'src/constants';
import { logEvent } from 'src/firebase';
import {
  useBoardOrList,
  useDispatch,
  useIsEditing,
  useUserId,
} from 'src/hooks';
import { actions } from 'src/store';
import type { Id } from 'src/types';

interface Props {
  boardId: Id;
}

export default function BoardCard(props: Props) {
  const { boardId } = props;
  const boardUrl = `/boards/${boardId}`;

  const dispatch = useDispatch();
  const board = useBoardOrList(DatabaseKey.boards, boardId);
  const isEditing = useIsEditing('boardId', boardId);
  const userId = useUserId();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        actions.updateBoard({
          board: {
            name: event.target.value,
            updatedAt: Date.now(),
            updatedBy: userId,
          },
          boardId,
          debounce: true,
        }),
      );
    },
    [boardId, dispatch, userId],
  );

  const handleBlur = useCallback(() => {
    dispatch(actions.setUserEditing({ boardId: '' }));
  }, [dispatch]);

  const handleFocus = useCallback(() => {
    dispatch(actions.setUserEditing({ boardId }));
  }, [boardId, dispatch]);

  const deleteBoard = useCallback(() => {
    dispatch(
      actions.deleteBoard({
        boardId,
        userId,
      }),
    );
    logEvent('delete_board');
  }, [boardId, dispatch, userId]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      navigate(boardUrl);
    },
    [boardUrl, navigate],
  );

  if (!board) {
    return null;
  }

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        component="form"
        name="board"
        onSubmit={handleSubmit}
        raised={isEditing}
      >
        <CardContent sx={{ paddingBottom: 0 }}>
          <TextField
            autoFocus={isEditing}
            fullWidth
            id={boardId}
            label="Board Name"
            placeholder="Untitled Board"
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            value={board.name}
          />
        </CardContent>

        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: 1,
            marginRight: 1,
          }}
        >
          <Button aria-label="Open board" component={Link} to={boardUrl}>
            Open
          </Button>

          <Button
            aria-label={
              board.name ? `Delete board “${board.name}”` : 'Delete board'
            }
            color="error"
            onClick={() => setIsDialogOpen(true)}
          >
            Delete
          </Button>

          <DeleteDialog
            content="This action cannot be undone."
            id={boardId}
            onClose={() => setIsDialogOpen(false)}
            onDelete={() => {
              deleteBoard();
              setIsDialogOpen(false);
            }}
            open={isDialogOpen}
            title={
              board.name ? `Delete board “${board.name}”?` : 'Delete board?'
            }
          />
        </CardActions>
      </Card>
    </Grid>
  );
}
