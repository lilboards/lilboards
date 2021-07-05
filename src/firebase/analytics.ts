/* istanbul ignore file */
import 'firebase/analytics';

import { firebaseApp } from './app';
import { isProduction } from '../config';

let firebaseAnalytics;

if (isProduction) {
  firebaseAnalytics = firebaseApp.analytics();
}

export { firebaseAnalytics };
