import Typography from '@material-ui/core/Typography';
import type { RouteComponentProps } from '@reach/router';
import { Redirect } from '@reach/router';

import type { Id } from '../../types';
import BoardControls from '../BoardControls';
import Columns from '../Columns';
import { useBoard } from './hooks/useBoard';

interface Props extends RouteComponentProps {
  boardId?: Id;
}

export default function Board(props: Props) {
  const boardId = props.boardId || '';
  const { board, isLoaded } = useBoard(boardId);

  if (!boardId) {
    return null;
  }

  if (boardId && !board && isLoaded) {
    return <Redirect to="/404" noThrow />;
  }

  if (!board) {
    return null;
  }

  return (
    <>
      {board.name && (
        <Typography component="h1" gutterBottom variant="h4">
          {board.name}
        </Typography>
      )}

      <BoardControls boardId={boardId} />
      <Columns boardId={boardId} />
    </>
  );
}
