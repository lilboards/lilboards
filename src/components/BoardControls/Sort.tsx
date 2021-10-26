import Button from '@material-ui/core/Button';

import actions from '../../actions';
import { firebaseAnalytics } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import type { Id } from '../../types';
import { sortByLikes } from './utils';

interface Props {
  boardId: Id;
}

export default function Sort(props: Props) {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.columns);
  const likes = useSelector((state) => state.likes);

  function sortItems() {
    dispatch(
      actions.setColumnItemIds({
        boardId: props.boardId,
        columnItemIds: sortByLikes(columns, likes),
      })
    );
    firebaseAnalytics.logEvent('sort_items', {
      by: 'likes',
      order: 'descending',
    });
  }

  return (
    <Button color="primary" onClick={sortItems} variant="outlined">
      Sort by likes
    </Button>
  );
}
