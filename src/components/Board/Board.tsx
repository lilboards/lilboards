import { useEffect, useState } from 'react';
import { Redirect } from '@reach/router';
import Typography from '@material-ui/core/Typography';

import Columns from '../Columns';
import Layout from '../Layout';

import { getBoardVal } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import actions from '../../actions';

import type { RouteComponentProps } from '@reach/router';
import type { Id } from '../../types';

type Props = {
  boardId: Id;
};

export default function Board(props: RouteComponentProps<Props>) {
  const { boardId } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  const board = useSelector((state) =>
    boardId ? state.boards[boardId] : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!boardId || board) {
      return;
    }

    (async () => {
      const board = await getBoardVal(boardId);

      /* istanbul ignore next */
      if (board) {
        dispatch(
          actions.loadBoard({
            ...board,
            id: boardId,
          })
        );
      }

      setIsLoaded(true);
    })();

    return () => setIsLoaded(false);
  }, [boardId, setIsLoaded, board, dispatch]);

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
    <Layout>
      {board.name && (
        <Typography component="h1" gutterBottom variant="h4">
          {board.name}
        </Typography>
      )}
      <Columns boardId={boardId} />
    </Layout>
  );
}
