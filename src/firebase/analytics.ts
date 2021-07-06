/* istanbul ignore file */
import 'firebase/analytics';

import type firebase from 'firebase';

import { firebaseApp } from './app';
import { isProduction } from '../config';
import { noop } from '../utils';

type Analytics = ReturnType<typeof firebase.analytics>;

let firebaseAnalytics: Analytics;

if (isProduction) {
  firebaseAnalytics = firebaseApp.analytics();
} else {
  firebaseAnalytics = {
    logEvent: noop,
    setUserId: noop,
  } as unknown as Analytics;
}

export { firebaseAnalytics };
