import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BoardControls from 'src/components/BoardControls';
import Breadcrumb from 'src/components/Breadcrumb';
import Columns from 'src/components/Columns';
import { useSetDocumentTitle } from 'src/hooks';
import type { Id } from 'src/types';

import BoardName from './BoardName';
import { useBoard } from './hooks/useBoard';

export default function Board() {
  const params = useParams<{ boardId: Id }>();
  const boardId = params.boardId || '';
  const { board, isLoaded } = useBoard(boardId);
  useSetDocumentTitle(board?.name || 'Untitled Board');
  const navigate = useNavigate();

  useEffect(() => {
    // board not found
    if (boardId && !board && isLoaded) {
      navigate('/404');
    }
  }, [boardId, board, isLoaded, navigate]);

  // no board id
  if (!boardId) {
    return null;
  }

  // board not found
  if (boardId && !board && isLoaded) {
    return null;
  }

  // no board
  if (!board) {
    return null;
  }

  return (
    <>
      <Breadcrumb to="/boards">Boards</Breadcrumb>

      {board.name ? <BoardName name={board.name} /> : <br />}

      <BoardControls boardId={boardId} />

      <Columns boardId={boardId} />
    </>
  );
}
