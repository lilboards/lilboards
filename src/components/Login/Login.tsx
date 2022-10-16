import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useLocation, useNavigate } from 'react-router-dom';

import { REDIRECT_TO } from '../../constants';
import { firebaseAuth } from '../../firebase';
import { useAuth, useSelector, useSetDocumentTitle } from '../../hooks';
import uiConfig from './uiConfig';

/**
 * {@link https://github.com/firebase/firebaseui-web-react}
 */
export default function Login() {
  useAuth();
  useSetDocumentTitle('Login');
  const email = useSelector((state) => state.user.email);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      const state = (location?.state || {}) as Record<string, string>;
      let redirectTo = state[REDIRECT_TO];

      if (!redirectTo || redirectTo === '/' || redirectTo === '/logout') {
        redirectTo = '/boards';
      }

      navigate(redirectTo);
    }
  }, [email, location, navigate]);

  return (
    <>
      <Typography align="center" component="h1" gutterBottom variant="h4">
        Sign In
      </Typography>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
    </>
  );
}
