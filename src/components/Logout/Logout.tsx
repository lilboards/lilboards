import { useEffect } from 'react';
import { Redirect } from '@reach/router';
import type { RouteComponentProps } from '@reach/router';

import { firebaseAuth } from '../../firebase';
import { useDispatch } from '../../hooks';
import { resetActions } from '../../actions';

export default function Logout(props: RouteComponentProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    firebaseAuth.signOut();
    resetActions.forEach((resetAction) => dispatch(resetAction()));
  }, [dispatch]);

  return <Redirect to="/login" noThrow />;
}
