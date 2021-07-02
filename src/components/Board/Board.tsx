import { Redirect } from '@reach/router';
import Typography from '@material-ui/core/Typography';

import Columns from '../Columns';
import Layout from '../Layout';

import { useAuth } from '../../hooks';
import { useBoard } from './useBoard';

import type { RouteComponentProps } from '@reach/router';
import type { Id } from '../../types';

interface Props extends RouteComponentProps {
  boardId?: Id;
}

export default function Board(props: Props) {
  useAuth(true);
  const { board, isLoaded } = useBoard(props.boardId);

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
