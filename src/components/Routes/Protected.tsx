import { Redirect } from '@reach/router';

import { REDIRECT_TO } from '../../constants';
import { useAuth, useSelector } from '../../hooks';

import type { FC } from 'react';
import type { RouteComponentProps } from '@reach/router';

interface Props extends RouteComponentProps {
  check: 'id' | 'email';
  component: FC<RouteComponentProps>;
  signInAnonymously?: boolean;
}

export default function Protected(props: Props) {
  const isLoaded = useAuth(props.signInAnonymously);
  const isLoggedIn = useSelector((state) => Boolean(state.user[props.check]));

  if (!isLoaded) {
    return null;
  }

  if (!isLoggedIn) {
    return (
      <Redirect to="/login" state={{ [REDIRECT_TO]: props.uri }} noThrow />
    );
  }

  const { component: Component, ...restProps } = props;
  return <Component {...restProps} />;
}

Protected.defaultProps = {
  check: 'id',
};
