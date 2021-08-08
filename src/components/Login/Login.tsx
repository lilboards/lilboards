import Typography from '@material-ui/core/Typography';
import { Redirect } from '@reach/router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { REDIRECT_TO } from '../../constants';
import { firebaseAuth } from '../../firebase';
import { useAuth, useSelector } from '../../hooks';
import uiConfig from './uiConfig';

import type { RouteComponentProps } from '@reach/router';

export default function Login(props: RouteComponentProps) {
  useAuth();
  const email = useSelector((state) => state.user.email);

  if (email) {
    // @ts-ignore
    let redirectTo = props.location?.state[REDIRECT_TO];
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
