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
  useDispatch,
  useGetBoardOrList,
  useGetUserId,
  useSelector,
} from 'src/hooks';
import { actions } from 'src/store';
import type { Id } from 'src/types';

interface Props {
  listId: Id;
}

export default function ListCard(props: Props) {
  const { listId } = props;
  const listUrl = `/lists/${listId}`;

  const dispatch = useDispatch();
  const list = useGetBoardOrList(DatabaseKey.lists, listId);
  const isEditing = useSelector(
    (state) => state.user.editing.listId === listId,
  );
  const userId = useGetUserId();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        actions.updateList({
          list: {
            name: event.target.value,
            updatedAt: Date.now(),
            updatedBy: userId,
          },
          listId,
          debounce: true,
        }),
      );
    },
    [dispatch, listId],
  );

  const handleBlur = useCallback(() => {
    dispatch(actions.setUserEditing({ listId: '' }));
  }, [dispatch, listId]);

  const handleFocus = useCallback(() => {
    dispatch(actions.setUserEditing({ listId }));
  }, [dispatch, listId]);

  const deleteList = useCallback(() => {
    dispatch(
      actions.deleteList({
        listId,
        userId,
      }),
    );
    logEvent('delete_list');
  }, [dispatch, listId, userId]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      navigate(listUrl);
    },
    [listUrl, navigate],
  );

  if (!list) {
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
            id={listId}
            label="List Name"
            placeholder="Untitled List"
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            value={list.name}
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
          <Button aria-label="Open list" component={Link} to={listUrl}>
            Open
          </Button>

          <Button
            aria-label={
              list.name ? `Delete list “${list.name}”` : 'Delete list'
            }
            color="error"
            onClick={() => setIsDialogOpen(true)}
          >
            Delete
          </Button>

          <DeleteDialog
            content="This action cannot be undone."
            id={listId}
            onClose={() => setIsDialogOpen(false)}
            onDelete={() => {
              deleteList();
              setIsDialogOpen(false);
            }}
            open={isDialogOpen}
            title={list.name ? `Delete list “${list.name}”?` : 'Delete list?'}
          />
        </CardActions>
      </Card>
    </Grid>
  );
}
