/* istanbul ignore file */

import alarm from './alarm.ogg';

let alarmAudio: HTMLAudioElement;

/**
 * Loads alarm audio.
 */
export function loadAlarm() {
  if (!alarmAudio) {
    alarmAudio = new Audio(alarm);
  }
}

/**
 * Plays alarm audio.
 */
export function playAlarm() {
  loadAlarm();
  alarmAudio.play();
}
