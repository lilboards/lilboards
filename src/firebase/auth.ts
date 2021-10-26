import 'firebase/auth';

import { isDevelopment, isLocalhost } from '../config';
import { firebaseApp } from './app';
import { getAuth } from './helpers';

export const firebaseAuth = getAuth(firebaseApp);

/* istanbul ignore next */
if (isDevelopment && isLocalhost) {
  const emulatorHost = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '';
  firebaseAuth.useEmulator(emulatorHost);
}
