import Grid from '@mui/material/Grid';
import { useSelector } from 'src/hooks';

import BoardCard from './BoardCard';
import { useBoards } from './hooks';
import { selectBoardIds } from './selectors';

export default function BoardCards() {
  useBoards();
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
