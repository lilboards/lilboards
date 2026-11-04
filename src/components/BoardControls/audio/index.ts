/* istanbul ignore file */

import alarm from './alarm.ogg';

let alarmAudio: HTMLAudioElement;

/**
 * Loads alarm audio.
 */
export function loadAlarm() {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  alarmAudio ??= new Audio(alarm);
}

/**
 * Plays alarm audio.
 */
export function playAlarm() {
  loadAlarm();
  void alarmAudio.play();
}
