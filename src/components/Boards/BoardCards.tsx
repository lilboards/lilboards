import Grid from '@material-ui/core/Grid';

import BoardCard from './BoardCard';

import { useSelector } from '../../hooks';
import { sort } from '../../utils';

import { SortBy, SortOrder } from '../../types';

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
