import 'firebase/auth';
import { firebaseApp } from './app';
import { isDevelopment, isLocalhost } from '../config';

export const firebaseAuth = firebaseApp.auth();

/* istanbul ignore next */
if (isDevelopment && isLocalhost) {
  const emulatorHost = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '';
  firebaseAuth.useEmulator(emulatorHost);
}
