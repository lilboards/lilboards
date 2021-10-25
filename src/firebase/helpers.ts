/* istanbul ignore file */
import type firebase from 'firebase';

/**
 * Gets Firebase analytics.
 *
 * @param app - The Firebase app.
 *
 * @deprecated Remove after Firebase v9 migration.
 */
export function getAnalytics(app: firebase.app.App) {
  return app.analytics();
}
