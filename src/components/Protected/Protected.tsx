import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { REDIRECT_TO } from 'src/constants';
import { useAuth, useSelector } from 'src/hooks';

import VerifyEmail from '../VerifyEmail';

export interface Props {
  // check user id or email
  check: 'id' | 'email';
  signInAnonymously?: boolean;
}

export default function Protected(props: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoaded = useAuth(props.signInAnonymously);
  const isLoggedIn = useSelector((state) => Boolean(state.user[props.check]));
  const emailVerified = useSelector((state) => state.user.emailVerified);

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
    return <CircularProgress />;
  }

  if (props.check === 'email' && !emailVerified) {
    return <VerifyEmail />;
  }

  if (isLoggedIn) {
    return <Outlet />;
  }

  return null;
}
