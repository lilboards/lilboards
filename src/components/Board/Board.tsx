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

interface Props extends RouteComponentProps {
  boardId?: Id;
}

export default function Board(props: Props) {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boards[props.boardId || '']);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!props.boardId || board) {
      return;
    }

    getBoardVal(props.boardId).then((board) => {
      /* istanbul ignore next */
      if (board) {
        dispatch(
          actions.loadBoard({
            ...board,
            id: props.boardId,
          })
        );
      }
      setIsLoaded(true);
    });

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
