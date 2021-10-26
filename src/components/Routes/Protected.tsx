import type { RouteComponentProps } from '@reach/router';
import { Redirect } from '@reach/router';
import type { FC } from 'react';

import { REDIRECT_TO } from '../../constants';
import { useAuth, useSelector } from '../../hooks';
import type { User } from '../../types';
import VerifyEmail from '../VerifyEmail';

interface Props extends RouteComponentProps {
  check: Extract<keyof User, 'id' | 'email'>;
  component: FC<RouteComponentProps>;
  signInAnonymously?: boolean;
}

export default function Protected(props: Props) {
  const isLoaded = useAuth(props.signInAnonymously);
  const isLoggedIn = useSelector((state) => Boolean(state.user[props.check]));
  const emailVerified = useSelector((state) => state.user.emailVerified);

  if (!isLoaded) {
    return null;
  }

  if (!isLoggedIn) {
    return (
      <Redirect to="/login" state={{ [REDIRECT_TO]: props.uri }} noThrow />
    );
  }

  if (props.check === 'email' && !emailVerified) {
    return <VerifyEmail />;
  }

  const { component: Component, ...restProps } = props;
  return <Component {...restProps} />;
}

Protected.defaultProps = {
  check: 'id',
};
