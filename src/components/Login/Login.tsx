import { useEffect } from 'react';
import { Redirect } from '@reach/router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Typography from '@material-ui/core/Typography';
import type { RouteComponentProps } from '@reach/router';

import { firebaseAuth } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import actions from '../../actions';
import uiConfig from './uiConfig';
import Layout from '../Layout';

export default function Login(props: RouteComponentProps) {
  const email = useSelector((state) => state.user.email);
  const dispatch = useDispatch();

  useEffect(() => {
    const unregisterAuthObserver = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          actions.setUser({
            email: user.email,
            id: user.uid,
          })
        );
      }
    });
    return unregisterAuthObserver;
  }, [dispatch]);

  if (email) {
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
