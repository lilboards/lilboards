import Typography from '@mui/material/Typography';
import AddBoard from 'src/components/AddBoard';
import { useSetDocumentTitle } from 'src/hooks';

import BoardCards from './BoardCards';

export default function Boards() {
  useSetDocumentTitle('Boards');

  return (
    <>
      <Typography component="h1" gutterBottom variant="h4">
        Boards
      </Typography>

      <AddBoard />

      <BoardCards />
    </>
  );
}
