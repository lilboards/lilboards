import { useEffect, useState } from 'react';
import { Redirect } from '@reach/router';
import Typography from '@material-ui/core/Typography';

import { boardsRef } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import actions from '../../actions';

import type { RouteComponentProps } from '@reach/router';

import Layout from '../Layout';

type Props = {
  boardId: string;
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

    // subscribe on mount
    const boardRef = boardsRef.child(props.boardId);
    (async function subscribe() {
      const boardSnapshot = await boardRef.once('value');
      const board = boardSnapshot.val();
      /* istanbul ignore next */
      if (board) {
        board.id = props.boardId;
        dispatch(actions.loadBoard(board));
      }
      setIsLoaded(true);
    })();

    // unsubscribe on unmount
    return function unsubscribe() {
      boardRef.off('value');
      setIsLoaded(false);
    };
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
    </Layout>
  );
}
