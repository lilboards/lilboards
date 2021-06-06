import { Redirect } from '@reach/router';
import type { FC } from 'react';
import type { RouteComponentProps } from '@reach/router';

import { useSelector } from '../../hooks';

type Props = RouteComponentProps & {
  component: FC<RouteComponentProps>;
};

export default function ProtectedRoute(props: Props) {
  const userId = useSelector((state) => state.user.id);

  if (!userId) {
    return <Redirect to="/login" noThrow />;
  }

  const { component: Component, ...restProps } = props;
  return <Component {...restProps} />;
}
