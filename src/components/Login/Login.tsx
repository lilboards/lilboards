import { Redirect } from '@reach/router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Typography from '@material-ui/core/Typography';
import type { RouteComponentProps } from '@reach/router';

import { firebaseAuth } from '../../firebase';
import { useAuth, useSelector } from '../../hooks';
import uiConfig from './uiConfig';
import Layout from '../Layout';

export default function Login(props: RouteComponentProps) {
  useAuth();
  const email = useSelector((state) => state.user.email);

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
