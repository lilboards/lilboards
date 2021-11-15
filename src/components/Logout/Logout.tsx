import type { RouteComponentProps } from '@reach/router';
import { Redirect } from '@reach/router';
import { useEffect, useState } from 'react';

import { resetActions } from '../../actions';
import { logEvent, signOut } from '../../firebase';
import { useDispatch } from '../../hooks';

export default function Logout(props: RouteComponentProps) {
  const dispatch = useDispatch();
  const [isSignedOut, setIsSignedOut] = useState(false);

  useEffect(() => {
    resetActions.forEach((resetAction) => dispatch(resetAction()));

    signOut().then(() => {
      setIsSignedOut(true);
      logEvent('logout');
    });
  }, [dispatch]);

  if (isSignedOut) {
    return <Redirect to="/login" noThrow />;
  }

  return null;
}
