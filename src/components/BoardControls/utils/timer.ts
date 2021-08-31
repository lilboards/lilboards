import { MINUTE_IN_SECONDS, SECOND_IN_MILLISECONDS } from '../constants';

/**
 * Formats milliseconds remaining to `mm:ss`.
 */
export function formatTimeRemaining(milliseconds: number) {
  let seconds = Math.round(milliseconds / SECOND_IN_MILLISECONDS);
  const minutes = Math.floor(seconds / MINUTE_IN_SECONDS);
  seconds = seconds % MINUTE_IN_SECONDS;
  return `${minutes || '00'}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Converts minutes to milliseconds.
 */
export const minutesToMilliseconds = (minutes: number) =>
  minutes * MINUTE_IN_SECONDS * SECOND_IN_MILLISECONDS;
