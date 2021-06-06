/* istanbul ignore file */

import { useEffect } from 'react';
import { Redirect } from '@reach/router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Typography from '@material-ui/core/Typography';
import type { RouteComponentProps } from '@reach/router';

import { auth as firebaseAuth } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import { actions as userActions } from '../../store/userSlice';
import uiConfig from './uiConfig';
import Layout from '../Layout';

export default function Login(props: RouteComponentProps) {
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    const unregisterAuthObserver = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(userActions.setUser(user.uid));
      }
    });
    return unregisterAuthObserver;
  }, [dispatch]);

  if (userId) {
    return <Redirect to="/boards" noThrow />;
  }

  return (
    <Layout>
      <Typography align="center" component="h1" gutterBottom variant="h4">
        Sign In
      </Typography>

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
    </Layout>
  );
}
