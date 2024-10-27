import Grid from '@mui/material/Grid';
import { useSelector } from 'src/hooks';

import { useLists } from './hooks';
import ListCard from './ListCard';
import { selectListIds } from './selectors';

export default function ListCards() {
  useLists();
  const listIds = useSelector(selectListIds);

  if (!listIds.length) {
    return null;
  }

  return (
    <Grid container spacing={2}>
      {listIds.map((listId) => (
        <ListCard listId={listId} key={listId} />
      ))}
    </Grid>
  );
}
