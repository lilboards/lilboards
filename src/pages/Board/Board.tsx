import { useParams } from 'react-router-dom';
import BoardControls from 'src/components/BoardControls';
import Breadcrumb from 'src/components/Breadcrumb';
import Columns from 'src/components/Columns';
import Heading from 'src/components/Heading';
import { useSetDocumentTitle } from 'src/hooks';
import type { Id } from 'src/types';

import { useBoard } from './hooks/useBoard';

export default function Board() {
  const params = useParams<{ boardId: Id }>();
  const boardId = params.boardId || '';
  const board = useBoard(boardId);
  useSetDocumentTitle(board?.name || 'Untitled Board');

  if (!boardId || !board) {
    return null;
  }

  return (
    <>
      <Breadcrumb to="/boards">Boards</Breadcrumb>

      <Heading link>{board.name}</Heading>

      <BoardControls boardId={boardId} />

      <Columns boardId={boardId} />
    </>
  );
}
