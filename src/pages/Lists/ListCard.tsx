import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteDialog from 'src/components/DeleteDialog';
import { logEvent } from 'src/firebase';
import { useDispatch, useGetUserId, useSelector } from 'src/hooks';
import { actions } from 'src/store';
import type { Id } from 'src/types';

interface Props {
  listId: Id;
}

export default function ListCard(props: Props) {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.lists[props.listId]);
  const isEditing = useSelector(
    (state) => state.user.editing.listId === props.listId,
  );
  const userId = useGetUserId();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!list) {
    return null;
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    dispatch(
      actions.updateList({
        list: {
          name: event.target.value,
          updatedAt: Date.now(),
          updatedBy: userId,
        },
        listId: props.listId,
        debounce: true,
      }),
    );
  }

  function handleBlur() {
    dispatch(actions.setUserEditing({ listId: '' }));
  }

  function handleFocus() {
    dispatch(actions.setUserEditing({ listId: props.listId }));
  }

  function deleteList() {
    dispatch(
      actions.deleteList({
        listId: props.listId,
        userId,
      }),
    );
    logEvent('delete_list');
  }

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card raised={isEditing}>
        <CardContent sx={{ paddingBottom: 0 }}>
          <TextField
            autoFocus={isEditing}
            fullWidth
            id={props.listId}
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
          <Button
            aria-label="Open list"
            component={Link}
            to={`/lists/${props.listId}`}
          >
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
            id={props.listId}
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
