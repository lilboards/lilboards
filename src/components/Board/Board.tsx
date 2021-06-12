import { useEffect, useState } from 'react';
import { Redirect } from '@reach/router';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import AddButton from '../AddButton';
import Layout from '../Layout';

import { boardsRef } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import actions from '../../actions';

import type { RouteComponentProps } from '@reach/router';

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
      const boardSnapshot = await boardRef.get();
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

  function addColumn() {
    /* istanbul ignore next */
    if (props.boardId) {
      dispatch(actions.addColumn(props.boardId));
    }
  }

  return (
    <Layout>
      {board.name && (
        <Typography component="h1" gutterBottom variant="h4">
          {board.name}
        </Typography>
      )}

      <Box marginBottom={2}>
        <AddButton
          aria-label="Add column"
          onClick={addColumn}
          size="medium"
          variant="extended"
        >
          Add column
        </AddButton>
      </Box>
    </Layout>
  );
}
