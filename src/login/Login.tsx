/* istanbul ignore file */

import { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import type { RouteComponentProps } from '@reach/router';
import Layout from '../layout';
import { auth as firebaseAuth } from '../firebase';
import uiConfig from './ui-config';

function firebaseAuthSignOut() {
  firebaseAuth.signOut();
}

export default function Login(props: RouteComponentProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = firebaseAuth.onAuthStateChanged((user) => {
      setIsSignedIn(Boolean(user));
    });

    return unregisterAuthObserver;
  }, []);

  if (isSignedIn) {
    return (
      <Layout>
        <Button
          color="primary"
          variant="contained"
          onClick={firebaseAuthSignOut}
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
