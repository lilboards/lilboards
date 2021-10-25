/* istanbul ignore file */
import type firebase from 'firebase';

/**
 * Gets Firebase analytics.
 *
 * @param app - The Firebase app.
 *
 * @deprecated Remove after Firebase v9 migration.
 */
export const getAnalytics = (app: firebase.app.App) => app.analytics();

/**
 * Gets Firebase auth.
 *
 * @param app - The Firebase app.
 *
 * @deprecated Remove during Firebase v9 migration.
 */
export const getAuth = (app: firebase.app.App) => app.auth();
