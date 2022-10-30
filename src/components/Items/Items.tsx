import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

import actions from '../../actions';
import { generateId, logEvent } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import type { Id, Item } from '../../types';
import DroppableItems from './DroppableItems';

interface Props {
  boardId: Id;
  columnId: Id;
}

export default function Items(props: Props) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

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
      })
    );
    dispatch(
      actions.addColumnItemId({
        boardId: props.boardId,
        columnId: props.columnId,
        itemId,
      })
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
