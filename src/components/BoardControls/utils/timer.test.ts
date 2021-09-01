import { formatTimeRemaining, minutesToMilliseconds } from './timer';

describe('formatTimeRemaining', () => {
  it.each([
    // milliseconds, formatted time
    [0, '00:00'],
    [499, '00:00'],
    [500, '00:01'],
    [1000, '00:01'],
    [5000, '00:05'],
    [30000, '00:30'],
    [59000, '00:59'],
    [60000, '1:00'],
    [61000, '1:01'],
    [90000, '1:30'],
    [180000, '3:00'],
    [194000, '3:14'],
    [300000, '5:00'],
  ])('formats %d milliseconds to %s', (milliseconds, expected) => {
    expect(formatTimeRemaining(milliseconds)).toBe(expected);
  });
});

describe('minutesToMilliseconds', () => {
  it.each([
    // minutes, milliseconds
    [0, 0],
    [0.1, 6000],
    [0.5, 30000],
    [1, 60000],
    [1.5, 90000],
    [2, 120000],
    [3.14, 188400],
  ])('converts %d minutes to %d milliseconds', (minutes, expected) => {
    expect(minutesToMilliseconds(minutes)).toBe(expected);
  });
});
