import { useEffect } from 'react';
import { Redirect } from '@reach/router';
import type { RouteComponentProps } from '@reach/router';

import { auth as firebaseAuth } from '../../firebase';
import { useDispatch } from '../../hooks';
import { actions as userActions } from '../../store/userSlice';

export default function Logout(props: RouteComponentProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    firebaseAuth.signOut();
    dispatch(userActions.resetUser());
  }, [dispatch]);

  return <Redirect to="/login" noThrow />;
}
