import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { generateId, logEvent } from 'src/firebase';
import { useDispatch, useGetUserId } from 'src/hooks';
import { actions } from 'src/store';
import type { Id, Item } from 'src/types';

import DroppableItems from './DroppableItems';

interface Props {
  boardId: Id;
  columnId: Id;
}

export default function Items(props: Props) {
  const dispatch = useDispatch();
  const userId = useGetUserId();

  function addItem() {
    const item: Item = {
      createdAt: Date.now(),
      createdBy: userId,
      text: '',
    };
    const itemId = generateId();
    dispatch(
      actions.updateItem({
        boardId: props.boardId,
        item,
        itemId,
      }),
    );
    dispatch(
      actions.addColumnItemId({
        boardId: props.boardId,
        columnId: props.columnId,
        itemId,
      }),
    );
    dispatch(actions.setUserEditing({ itemId }));
    logEvent('create_item');
  }

  return (
    <>
      <Button
        color="primary"
        fullWidth
        onClick={addItem}
        variant="contained"
        sx={{ marginBottom: 2 }}
      >
        <AddIcon /> Add item
      </Button>

      <DroppableItems boardId={props.boardId} columnId={props.columnId} />
    </>
  );
}
