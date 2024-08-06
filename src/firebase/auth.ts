/* istanbul ignore file */

import type { User } from 'firebase/auth';
import {
  getAuth,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  sendEmailVerification as firebaseSendEmailVerification,
  signInAnonymously as firebaseSignInAnonymously,
  signOut as firebaseSignOut,
} from 'firebase/auth';

import { isDevelopment, isLocalhost } from '../config';
import { firebaseApp } from './app';

export const firebaseAuth = getAuth(firebaseApp);

if (isDevelopment && isLocalhost) {
  /**
   * @see https://firebase.google.com/docs/emulator-suite/connect_auth#web-modular-api
   */
  const emulatorHost = 'http://127.0.0.1:9099';
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { connectAuthEmulator } = require('firebase/auth');
  connectAuthEmulator(firebaseAuth, emulatorHost, { disableWarnings: true });
}

/**
 * Observer registered on authentication state change.
 *
 * @param callback - Callback containing user account data.
 */
export function onAuthStateChanged(callback: (user: User | null) => void) {
  return firebaseOnAuthStateChanged(firebaseAuth, callback);
}

/**
 * Authenticates with Firebase anonymously.
 */
export function signInAnonymously() {
  return firebaseSignInAnonymously(firebaseAuth);
}

/**
 * Signs user out.
 */
export function signOut() {
  return firebaseSignOut(firebaseAuth);
}

/**
 * Sends email verification to user.
 */
export function sendEmailVerification() {
  const { currentUser } = firebaseAuth;
  if (currentUser) {
    firebaseSendEmailVerification(currentUser);
  }
}
