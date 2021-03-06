import Typography from '@mui/material/Typography';
import type { RouteComponentProps } from '@reach/router';
import { Redirect } from '@reach/router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { REDIRECT_TO } from '../../constants';
import { firebaseAuth } from '../../firebase';
import { useAuth, useSelector, useSetDocumentTitle } from '../../hooks';
import uiConfig from './uiConfig';

/**
 * {@link https://github.com/firebase/firebaseui-web-react}
 */
export default function Login(props: RouteComponentProps) {
  useAuth();
  useSetDocumentTitle('Login');
  const email = useSelector((state) => state.user.email);

  if (email) {
    const state = (props.location?.state || {}) as Record<string, string>;
    let redirectTo = state[REDIRECT_TO];
    if (!redirectTo || redirectTo === '/') {
      redirectTo = '/boards';
    }
    return <Redirect to={redirectTo} noThrow />;
  }

  return (
    <>
      <Typography align="center" component="h1" gutterBottom variant="h4">
        Sign In
      </Typography>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
    </>
  );
}
