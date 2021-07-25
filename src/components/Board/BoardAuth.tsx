import { Redirect } from '@reach/router';

import Auth from '../Auth';
import Board from './Board';

import type { RouteComponentProps } from '@reach/router';
import type { Id } from '../../types';

interface Props extends RouteComponentProps {
  boardId?: Id;
}

export default function BoardAuth(props: Props) {
  if (!props.boardId) {
    return <Redirect to="/404" noThrow />;
  }

  return (
    <Auth signInAnonymously>
      <Board boardId={props.boardId} />
    </Auth>
  );
}
