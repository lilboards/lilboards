import Grid from '@mui/material/Grid';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'src/hooks';
import { RootState, SortBy, SortOrder } from 'src/types';
import { sort } from 'src/utils';

import BoardCard from './BoardCard';

const selectBoardIds = createSelector(
  (state: RootState) => state.boards,
  (boards) => {
    const boardsWithId = Object.keys(boards).map((id) => ({
      ...boards[id],
      id,
    }));
    return sort(boardsWithId, SortBy.createdAt, SortOrder.Descending).map(
      (board) => board.id,
    );
  },
);

export default function BoardCards() {
  const boardIds = useSelector(selectBoardIds);

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
