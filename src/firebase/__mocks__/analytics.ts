const app = {};
const logEvent = jest.fn();
const setAnalyticsCollectionEnabled = jest.fn();
const setCurrentScreen = jest.fn();
const setUserId = jest.fn();
const setUserProperties = jest.fn();

export const firebaseAnalytics = {
  app,
  logEvent,
  setAnalyticsCollectionEnabled,
  setCurrentScreen,
  setUserId,
  setUserProperties,
};
