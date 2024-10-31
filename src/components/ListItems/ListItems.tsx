import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import DeleteDialog from 'src/components/DeleteDialog';
import { DatabaseKey } from 'src/constants';
import { generateId, logEvent } from 'src/firebase';
import {
  useDispatch,
  useGetItemIds,
  useGetUserId,
  useIsAdmin,
} from 'src/hooks';
import { actions } from 'src/store';
import type { Id, ListItem } from 'src/types';

import DroppableItems from './DroppableItems';

interface Props {
  listId: Id;
  rowId: Id;
}

export default function Items(props: Props) {
  const dispatch = useDispatch();
  const userId = useGetUserId();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const itemIds = useGetItemIds(DatabaseKey.rows, props.rowId);
  const isAdmin = useIsAdmin(DatabaseKey.lists, props.listId);

  function addItem() {
    const item: ListItem = {
      createdAt: Date.now(),
      createdBy: userId,
      text: '',
    };

    const itemId = generateId();

    dispatch(
      actions.updateListItem({
        listId: props.listId,
        item,
        itemId,
      }),
    );

    dispatch(
      actions.addRowItemId({
        listId: props.listId,
        rowId: props.rowId,
        itemId,
      }),
    );

    dispatch(
      actions.setUserEditing({
        listItemId: itemId,
      }),
    );

    logEvent('create_item');
  }

  function deleteRow() {
    dispatch(
      actions.removeRow({
        listId: props.listId,
        rowId: props.rowId,
      }),
    );

    itemIds.forEach((itemId) => {
      dispatch(
        actions.removeListItem({
          listId: props.listId,
          itemId,
        }),
      );
    });

    logEvent('delete_row');
  }

  return (
    <>
      <DroppableItems listId={props.listId} rowId={props.rowId} />

      <Box
        sx={{ display: 'flex', marginTop: 2, justifyContent: 'space-between' }}
      >
        <Button onClick={addItem}>
          <AddIcon /> Add item
        </Button>

        {isAdmin && (
          <Button color="error" onClick={() => setIsDialogOpen(true)}>
            Delete
          </Button>
        )}
      </Box>

      {isAdmin && (
        <DeleteDialog
          content="This action cannot be undone."
          id={props.rowId}
          onClose={() => setIsDialogOpen(false)}
          onDelete={() => {
            deleteRow();
            setIsDialogOpen(false);
          }}
          open={isDialogOpen}
          title="Delete row?"
        />
      )}
    </>
  );
}
