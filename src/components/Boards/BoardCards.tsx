import Grid from '@material-ui/core/Grid';

import BoardCard from './BoardCard';

import { useSelector } from '../../hooks';

export default function BoardCards() {
  const boardIds = useSelector((state) => Object.keys(state.boards));

  if (!boardIds.length) {
    return null;
  }

  return (
    <Grid container spacing={2}>
      {boardIds.reverse().map((boardId) => (
        <BoardCard boardId={boardId} key={boardId} />
      ))}
    </Grid>
  );
}
