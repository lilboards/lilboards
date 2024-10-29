import { useCallback, useState } from 'react';
import DeleteDialog from 'src/components/DeleteDialog';
import { logEvent } from 'src/firebase';
import { useDispatch } from 'src/hooks';
import { actions } from 'src/store';
import type { Id } from 'src/types';

import CloseButton from '../CloseButton';

interface Props {
  boardId: Id;
  columnId: Id;
  itemId: Id;
  itemText: string;
}

export default function Delete(props: Props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const openDialog = useCallback(() => setOpen(true), [setOpen]);
  const closeDialog = useCallback(() => setOpen(false), [setOpen]);

  const deleteItem = useCallback(() => {
    dispatch(
      actions.removeItem({
        boardId: props.boardId,
        itemId: props.itemId,
      }),
    );
    dispatch(
      actions.removeColumnItemId({
        boardId: props.boardId,
        columnId: props.columnId,
        itemId: props.itemId,
      }),
    );
    dispatch(
      actions.removeLikesItem({
        boardId: props.boardId,
        itemId: props.itemId,
      }),
    );
    logEvent('delete_item');
    closeDialog();
  }, [closeDialog, dispatch, props]);

  return (
    <>
      <CloseButton
        aria-label={`Delete item “${props.itemText}”`}
        onClick={openDialog}
        size="small"
        sx={styles.closeButton}
      />

      <DeleteDialog
        content="This action cannot be undone."
        id={props.itemId}
        onClose={closeDialog}
        onDelete={deleteItem}
        open={open}
        title="Are you sure you want to delete?"
      />
    </>
  );
}

const styles = {
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
};
