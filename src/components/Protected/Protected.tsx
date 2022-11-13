import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { REDIRECT_TO } from '../../constants';
import { useAuth, useSelector } from '../../hooks';
import VerifyEmail from '../VerifyEmail';

export interface Props {
  // check user id or email
  check: 'id' | 'email';
  children: ReactElement;
  signInAnonymously?: boolean;
}

export default function Protected(props: Props) {
  const isLoaded = useAuth(props.signInAnonymously);
  const isLoggedIn = useSelector((state) => Boolean(state.user[props.check]));
  const emailVerified = useSelector((state) => state.user.emailVerified);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !props.signInAnonymously) {
      navigate('/login', {
        state: {
          [REDIRECT_TO]: location.pathname,
        },
      });
    }
  }, [isLoggedIn, location, navigate, props.signInAnonymously]);

  if (!isLoaded) {
    return null;
  }

  if (props.check === 'email' && !emailVerified) {
    return <VerifyEmail />;
  }

  return props.children;
}
