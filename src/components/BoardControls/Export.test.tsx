import { fireEvent, screen, waitFor } from '@testing-library/react';
import { logEvent } from 'src/firebase';
import { renderWithProviders, updateStore } from 'test/utils';
import { afterAll, beforeAll, beforeEach, expect, it, vi } from 'vitest';

import Export from './Export';

vi.mock('src/firebase');

const { clipboard } = navigator;
const writeText = vi.fn().mockResolvedValue(undefined);

beforeAll(() => {
  Object.assign(navigator, { clipboard: { writeText } });
});

beforeEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  Object.assign(navigator, { clipboard });
});

it('copies empty markdown to clipboard', () => {
  renderWithProviders(<Export />);
  fireEvent.click(screen.getByLabelText('Copy board as Markdown'));
  expect(writeText).toHaveBeenCalledTimes(1);
  expect(writeText).toHaveBeenCalledWith('');
});

it('copies markdown to clipboard', () => {
  updateStore.withColumn();
  updateStore.withItem();
  renderWithProviders(<Export />);
  fireEvent.click(screen.getByLabelText('Copy board as Markdown'));
  expect(writeText).toHaveBeenCalledTimes(1);
  expect((writeText.mock.calls[0] as string[])[0]).toBe(
    `| Column One |
| --- |
| Item One |`,
  );
});

it('logs copy event after writing markdown to clipboard', async () => {
  writeText.mockResolvedValue(undefined);
  updateStore.withColumn();
  updateStore.withItem();
  renderWithProviders(<Export />);
  fireEvent.click(screen.getByLabelText('Copy board as Markdown'));
  await waitFor(() => {
    expect(logEvent).toHaveBeenCalledWith('copy', { board: 'markdown' });
  });
});
