import type { RouteComponentProps } from '@reach/router';
import { Redirect } from '@reach/router';

import { useSetDocumentTitle } from '../../hooks';
import type { Id } from '../../types';
import BoardControls from '../BoardControls';
import Columns from '../Columns';
import BoardName from './BoardName';
import { useBoard } from './hooks/useBoard';

interface Props extends RouteComponentProps {
  boardId?: Id;
}

export default function Board(props: Props) {
  const boardId = props.boardId || '';
  const { board, isLoaded } = useBoard(boardId);
  useSetDocumentTitle(board?.name || 'Untitled Board');

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
      <BoardName name={board.name} />
      <BoardControls boardId={boardId} />
      <Columns boardId={boardId} />
    </>
  );
}
