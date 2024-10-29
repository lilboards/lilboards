import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders, updateStore } from 'test/utils';

import Export from './Export';

const { clipboard } = navigator;
const writeText = jest.fn();

beforeAll(() => {
  (navigator as any).clipboard = { writeText };
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  (navigator as any).clipboard = clipboard;
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
  expect(writeText.mock.calls[0][0]).toBe(
    `| Column One |
| --- |
| Item One |`,
  );
});
