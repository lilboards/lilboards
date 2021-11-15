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
   * {@link https://firebase.google.com/docs/emulator-suite/connect_auth#web-version-9}
   */
  const emulatorHost = 'http://localhost:9099';
  const { connectAuthEmulator } = require('firebase/auth');
  connectAuthEmulator(firebaseAuth, emulatorHost);
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
