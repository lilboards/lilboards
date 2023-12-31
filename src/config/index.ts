export const isDevelopment = import.meta.env.DEV;
export const isLocalhost = location.hostname === 'localhost';
export const isProduction = import.meta.env.PROD;

export const FIREBASE_API_KEY = import.meta.env.VITE_APP_FIREBASE_API_KEY;
export const FIREBASE_APP_ID = import.meta.env.VITE_APP_FIREBASE_APP_ID;
// prettier-ignore
export const FIREBASE_AUTH_DOMAIN = import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN || 'localhost';
// prettier-ignore
export const FIREBASE_DATABASE_URL = import.meta.env.VITE_APP_FIREBASE_DATABASE_URL;
// prettier-ignore
export const FIREBASE_MEASUREMENT_ID = import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID;
// prettier-ignore
export const FIREBASE_MESSAGING_SENDER_ID = import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID;
export const FIREBASE_PROJECT_ID = import.meta.env.VITE_APP_FIREBASE_PROJECT_ID;
// prettier-ignore
export const FIREBASE_STORAGE_BUCKET = import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET;

export const PROJECT_NAME = import.meta.env.VITE_APP_PROJECT_NAME;
export const PROJECT_VERSION = import.meta.env.VITE_APP_PROJECT_VERSION;
