import { Redirect } from '@reach/router';

import { REDIRECT_TO } from '../../constants';
import { useSelector } from '../../hooks';

import type { FC } from 'react';
import type { RouteComponentProps } from '@reach/router';

interface Props extends RouteComponentProps {
  component: FC<RouteComponentProps>;
}

export default function ProtectedRoute(props: Props) {
  const isLoggedIn = useSelector((state) => Boolean(state.user.email));

  if (!isLoggedIn) {
    return (
      <Redirect to="/login" state={{ [REDIRECT_TO]: props.uri }} noThrow />
    );
  }

  const { component: Component, ...restProps } = props;
  return <Component {...restProps} />;
}
