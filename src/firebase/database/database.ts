// v8 ignore file

import { type Database, getDatabase, onValue, ref } from 'firebase/database';
import { FIREBASE_DATABASE_URL, isDevelopment, isLocalhost } from 'src/config';

import { firebaseApp } from '../app';

export const database = getDatabase(firebaseApp);

if (isDevelopment && isLocalhost) {
  const databaseUrl = new URL(FIREBASE_DATABASE_URL);
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { connectDatabaseEmulator } = require('firebase/database') as {
    connectDatabaseEmulator: (
      database: Database,
      hostname: string,
      port: number,
      options?: { disableWarnings?: boolean },
    ) => void;
  };
  connectDatabaseEmulator(
    database,
    databaseUrl.hostname,
    Number(databaseUrl.port) || 9000,
  );
}

export const rootRef = ref(database);

/**
 * Detects Firebase Realtime Database client's connection state change.
 *
 * @see {@link https://firebase.google.com/docs/database/web/offline-capabilities#section-connection-state}
 *
 * @param callback - The callback.
 */
export const onConnected = (callback: (isConnected: boolean) => void) => {
  const connectedRef = ref(database, '.info/connected');
  onValue(connectedRef, (snapshot) => {
    const isConnected = snapshot.val() as boolean;
    callback(isConnected);
  });
};
