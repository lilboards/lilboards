// v8 ignore file
import { vi } from 'vitest';

export const logEvent = vi.fn();
export const setUserId = vi.fn();

export const firebaseAnalytics = {
  app: {},
  logEvent,
  setAnalyticsCollectionEnabled: vi.fn(),
  setCurrentScreen: vi.fn(),
  setUserId,
  setUserProperties: vi.fn(),
};
