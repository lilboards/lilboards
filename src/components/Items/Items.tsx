import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import DroppableItems from './DroppableItems';

import actions from '../../actions';
import { generateId, updateItem } from '../../firebase';
import { useDispatch } from '../../hooks';

import type { Id } from '../../types';

type Props = {
  boardId: Id;
  columnId: Id;
};

export default function Items(props: Props) {
  const dispatch = useDispatch();

  function addItem() {
    const itemId = generateId();
    const now = Date.now();
    const item = {
      created: now,
      text: '',
      updated: now,
    };
    dispatch(
      actions.updateItem({
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
    updateItem(props.boardId, itemId, item);
  }

  return (
    <>
      <Box marginBottom={2}>
        <Button color="primary" fullWidth onClick={addItem} variant="contained">
          <AddIcon /> Add item
        </Button>
      </Box>

      <DroppableItems boardId={props.boardId} columnId={props.columnId} />
    </>
  );
}
