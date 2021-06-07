import 'firebase/database';
import firebaseApp from './app';
import { isDevelopment, isLocalhost } from '../config';

const firebaseDatabase = firebaseApp.database();

/* istanbul ignore next */
if (isDevelopment && isLocalhost) {
  const databaseUrl = new URL(
    process.env.REACT_APP_FIREBASE_DATABASE_URL || ''
  );
  firebaseDatabase.useEmulator(databaseUrl.hostname, Number(databaseUrl.port));
}

export const boardsRef = firebaseDatabase.ref('boards');

export default firebaseDatabase;
