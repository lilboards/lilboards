import { useEffect, useState } from 'react';
import { Redirect } from '@reach/router';

import { firebaseAuth } from '../../firebase';
import { useDispatch } from '../../hooks';
import { resetActions } from '../../actions';

import type { RouteComponentProps } from '@reach/router';

export default function Logout(props: RouteComponentProps) {
  const dispatch = useDispatch();
  const [isSignedOut, setIsSignedOut] = useState(false);

  useEffect(() => {
    resetActions.forEach((resetAction) => dispatch(resetAction()));
    firebaseAuth.signOut().then(() => setIsSignedOut(true));
  }, [dispatch]);

  if (isSignedOut) {
    return <Redirect to="/login" noThrow />;
  }

  return null;
}
