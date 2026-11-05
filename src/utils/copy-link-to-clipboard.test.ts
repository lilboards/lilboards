import { afterAll, beforeAll, beforeEach, expect, it, vi } from 'vitest';

import { copyLinkToClipboard } from './copy-link-to-clipboard';

const { clipboard } = navigator;
const writeText = vi.fn();

beforeAll(() => {
  Object.assign(navigator, { clipboard: { writeText } });
});

beforeEach(() => {
  writeText.mockClear();
});

afterAll(() => {
  Object.assign(navigator, { clipboard });
});

it('copies link to clipboard', () => {
  void copyLinkToClipboard();
  expect(writeText).toHaveBeenCalledTimes(1);
  expect(writeText).toHaveBeenCalledWith(window.location.href);
});
