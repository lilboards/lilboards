import Button from '@mui/material/Button';
import type { SxProps } from '@mui/system';
import { DatabaseKey } from 'src/constants';
import { logEvent } from 'src/firebase';
import { useDispatch, useIsAdmin, useSelector } from 'src/hooks';
import { actions } from 'src/store';
import type { Id } from 'src/types';

import { sortByLikes } from './utils';

interface Props {
  boardId: Id;
  sx?: SxProps;
}

export default function Sort(props: Props) {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.columns);
  const likes = useSelector((state) => state.likes);
  const isAdmin = useIsAdmin(DatabaseKey.boards, props.boardId);

  if (!isAdmin) {
    return null;
  }

  function sortItems() {
    dispatch(
      actions.setColumnItemIds({
        boardId: props.boardId,
        columnItemIds: sortByLikes(columns, likes),
      }),
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
