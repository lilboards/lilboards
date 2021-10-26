import Grid from '@material-ui/core/Grid';

import { useSelector } from '../../hooks';
import { SortBy, SortOrder } from '../../types';
import { sort } from '../../utils';
import BoardCard from './BoardCard';

export default function BoardCards() {
  const boardIds = useSelector((state) => {
    const boards = Object.keys(state.boards).map((id) => ({
      ...state.boards[id],
      id,
    }));
    return sort(boards, SortBy.createdAt, SortOrder.Descending).map(
      (board) => board.id
    );
  });

  if (!boardIds.length) {
    return null;
  }

  return (
    <Grid container spacing={2}>
      {boardIds.map((boardId) => (
        <BoardCard boardId={boardId} key={boardId} />
      ))}
    </Grid>
  );
}
