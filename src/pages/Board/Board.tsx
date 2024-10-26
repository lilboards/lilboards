import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import BoardControls from '../../components/BoardControls';
import Columns from '../../components/Columns';
import { useSetDocumentTitle } from '../../hooks';
import type { Id } from '../../types';
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
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          component={RouterLink}
          sx={{ alignItems: 'center', display: 'flex' }}
          to="/boards"
          underline="hover"
        >
          <ArrowBackIosIcon fontSize="inherit" />
          Boards
        </Link>
      </Breadcrumbs>

      {board.name ? <BoardName name={board.name} /> : <br />}

      <BoardControls boardId={boardId} />

      <Columns boardId={boardId} />
    </>
  );
}
