/* istanbul ignore file */
import 'firebase/analytics';

import type firebase from 'firebase';

import { isProduction } from '../config';
import { noop } from '../utils';
import { firebaseApp } from './app';
import { getAnalytics } from './helpers';

let firebaseAnalytics: firebase.analytics.Analytics;

if (isProduction) {
  firebaseAnalytics = getAnalytics(firebaseApp);
} else {
  firebaseAnalytics = {
    logEvent: noop,
    setUserId: noop,
  } as unknown as firebase.analytics.Analytics;
}

export { firebaseAnalytics };
