/* istanbul ignore file */
import 'firebase/analytics';

import type firebase from 'firebase';

import { firebaseApp } from './app';
import { isProduction } from '../config';
import { noop } from '../utils';

type FirebaseAnalytics = ReturnType<typeof firebase.analytics>;

let firebaseAnalytics: FirebaseAnalytics;

if (isProduction) {
  firebaseAnalytics = firebaseApp.analytics();
} else {
  firebaseAnalytics = {
    setUserId: noop,
  } as unknown as FirebaseAnalytics;
}

export { firebaseAnalytics };
