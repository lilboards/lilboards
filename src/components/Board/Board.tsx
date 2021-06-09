import { useEffect } from 'react';
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
  const board = useSelector((state) =>
    props.boardId ? state.boards[props.boardId] : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!props.boardId) {
      return;
    }

    // subscribe on mount
    const boardRef = boardsRef.child(props.boardId);
    boardRef.on('value', (snapshot) => {
      const board = snapshot.val();
      /* istanbul ignore next */
      if (!board) {
        return;
      }
      board.id = props.boardId;
      dispatch(actions.loadBoard(board));
    });

    // unsubscribe on unmount
    return function subscribe() {
      boardRef.off('value');
    };
  }, [props.boardId, dispatch]);

  if (!props.boardId || !board) {
    return null;
  }

  return (
    <Layout>
      <Typography component="h1" gutterBottom variant="h4">
        {board.name}
      </Typography>
    </Layout>
  );
}
