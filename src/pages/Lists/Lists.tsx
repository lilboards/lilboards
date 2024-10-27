import Typography from '@mui/material/Typography';
import AddList from 'src/components/AddList';
import { useSetDocumentTitle } from 'src/hooks';

import ListCards from './ListCards';

export default function Lists() {
  useSetDocumentTitle('Lists');

  return (
    <>
      <Typography component="h1" gutterBottom variant="h4">
        Lists
      </Typography>

      <AddList />

      <ListCards />
    </>
  );
}
