/* istanbul ignore file */
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import Item from '../Item';

import actions from '../../actions';
import { generateId } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';

import type { Id } from '../../types';

type Props = {
  boardId: Id;
  columnId: Id;
};

export default function Items(props: Props) {
  const { boardId, columnId } = props;
  const dispatch = useDispatch();
  const items = useSelector((state) =>
    Object.entries(state.items).map(([id, item]) => ({
      ...item,
      id,
    }))
  );

  function addItem() {
    const itemId = generateId();

    dispatch(
      actions.addItem({
        boardId,
        itemId,
      })
    );

    dispatch(
      actions.addColumnItemId({
        boardId,
        columnId,
        itemId,
      })
    );
  }

  return (
    <>
      <Box marginBottom={2}>
        <Button color="primary" fullWidth onClick={addItem} variant="contained">
          <AddIcon /> Add item
        </Button>
      </Box>

      {items.map((item) => (
        <Box key={item.id} marginBottom={2}>
          <Item boardId={boardId} columnId={columnId} itemId={item.id} />
        </Box>
      ))}
    </>
  );
}
