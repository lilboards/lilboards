/* istanbul ignore file */

import { useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import type { RouteComponentProps } from '@reach/router';

import { auth as firebaseAuth } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import { actions } from '../../slices/userSlice';
import uiConfig from './uiConfig';
import Layout from '../Layout';

export default function Login(props: RouteComponentProps) {
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    const unregisterAuthObserver = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(actions.setUser(user.uid));
      }
    });
    return unregisterAuthObserver;
  }, [dispatch]);

  if (userId) {
    return (
      <Layout>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            firebaseAuth.signOut();
            dispatch(actions.setUser(''));
          }}
        >
          Logout
        </Button>
      </Layout>
    );
  }

  return (
    <Layout>
      <Typography align="center" component="h1" variant="h5">
        Sign In
      </Typography>

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
    </Layout>
  );
}
