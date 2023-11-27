/* istanbul ignore file */

import type { Analytics } from 'firebase/analytics';
import {
  getAnalytics,
  logEvent as firebaseLogEvent,
  setUserId as firebaseSetUserId,
} from 'firebase/analytics';

import { isProduction } from '../config';
import { firebaseApp } from './app';

let analytics: Analytics;

if (isProduction) {
  analytics = getAnalytics(firebaseApp);
}

/**
 * Sends event to Google Analytics.
 *
 * @param event - Event name.
 * @param parameters - Event parameters.
 */
export function logEvent(event: string, parameters?: Record<string, any>) {
  if (isProduction) {
    firebaseLogEvent(analytics, event, parameters);
  }
}

/**
 * Sets user id in Google Analytics.
 *
 * @param userId - User id.
 */
export function setUserId(userId: string) {
  if (isProduction) {
    firebaseSetUserId(analytics, userId);
  }
}
