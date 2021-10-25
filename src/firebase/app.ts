import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
} as const;

/**
 * Initializes Firebase app.
 *
 * @param app - The Firebase config.
 *
 * @deprecated Remove after Firebase v9 migration.
 */
function initializeApp(config: typeof firebaseConfig) {
  return firebase.initializeApp(config);
}

export const firebaseApp = initializeApp(firebaseConfig);
