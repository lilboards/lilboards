import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import CloseButton from '../CloseButton';

import actions from '../../actions';
import { useDispatch, useSelector } from '../../hooks';

import type { Id } from '../../types';

type Props = {
  boardId: Id;
  columnId: Id;
  itemId: Id;
};

export default function Item(props: Props) {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.items[props.itemId]);

  if (!item) {
    return null;
  }

  function deleteItem() {
    dispatch(
      actions.removeItem({
        boardId: props.boardId,
        itemId: props.itemId,
      })
    );
    dispatch(
      actions.removeColumnItemId({
        boardId: props.boardId,
        columnId: props.columnId,
        itemId: props.itemId,
      })
    );
  }

  return (
    <Box height="100%" position="relative">
      <Card>
        <Box position="absolute" right={0} top={0}>
          <CloseButton
            aria-label={`Delete item "${props.itemId}"`}
            onClick={deleteItem}
            size="small"
          />
        </Box>

        <CardContent></CardContent>
      </Card>
    </Box>
  );
}
