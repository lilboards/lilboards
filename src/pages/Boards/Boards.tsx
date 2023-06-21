import Typography from '@mui/material/Typography';

import AddBoard from '../../components/Boards/AddBoard';
import { useDispatch, useGetUserId, useSetDocumentTitle } from '../../hooks';
import BoardCards from './BoardCards';
import { useBoards } from './hooks';

export default function Boards() {
  const dispatch = useDispatch();
  const userId = useGetUserId();

  useBoards(dispatch, userId);
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
