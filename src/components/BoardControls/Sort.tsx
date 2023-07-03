import Button from '@mui/material/Button';
import type { SxProps } from '@mui/system';

import { logEvent } from '../../firebase';
import { useDispatch, useIsAdmin, useSelector } from '../../hooks';
import { actions } from '../../store';
import type { Id } from '../../types';
import { sortByLikes } from './utils';

interface Props {
  boardId: Id;
  sx?: SxProps;
}

export default function Sort(props: Props) {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.columns);
  const likes = useSelector((state) => state.likes);
  const isAdmin = useIsAdmin(props.boardId);

  if (!isAdmin) {
    return null;
  }

  function sortItems() {
    dispatch(
      actions.setColumnItemIds({
        boardId: props.boardId,
        columnItemIds: sortByLikes(columns, likes),
      })
    );
    logEvent('sort_items', {
      by: 'likes',
      order: 'descending',
    });
  }

  return (
    <Button
      color="primary"
      onClick={sortItems}
      sx={props.sx}
      variant="outlined"
    >
      Sort by likes
    </Button>
  );
}
