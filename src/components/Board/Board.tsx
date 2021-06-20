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
  const [isLoaded, setIsLoaded] = useState(false);
  const board = useSelector((state) =>
    props.boardId ? state.boards[props.boardId] : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!props.boardId || board) {
      return;
    }

    (async function subscribe() {
      const board = await getBoardVal(props.boardId as Id);
      /* istanbul ignore next */
      if (board) {
        board.id = props.boardId;
        dispatch(actions.loadBoard(board));
      }
      setIsLoaded(true);
    })();

    return () => setIsLoaded(false);
  }, [props.boardId, setIsLoaded, board, dispatch]);

  if (!props.boardId) {
    return null;
  }

  if (props.boardId && !board && isLoaded) {
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
      <Columns boardId={props.boardId} />
    </Layout>
  );
}
