import { act, fireEvent, screen } from '@testing-library/react';

import { renderWithContext, updateStore } from '../../utils/test';
import Export from './Export';

const { clipboard } = navigator;
const writeText = jest.fn();

beforeAll(() => {
  (navigator as any).clipboard = { writeText };
  jest.useFakeTimers();
});

beforeEach(() => {
  writeText.mockClear();
});

afterAll(() => {
  (navigator as any).clipboard = clipboard;
  jest.useRealTimers();
});

it('copies empty markdown to clipboard', async () => {
  renderWithContext(<Export />);
  fireEvent.click(screen.getByText('Export'));
  expect(await screen.findAllByText('Copied Markdown')).toHaveLength(1);
  expect(writeText).toBeCalledTimes(1);
  expect(writeText).toBeCalledWith('');
  act(() => {
    jest.runOnlyPendingTimers();
  });
});

it('copies markdown to clipboard', async () => {
  updateStore.withColumn();
  updateStore.withItem();
  renderWithContext(<Export />);
  fireEvent.click(screen.getByText('Export'));
  expect(await screen.findAllByText('Copied Markdown')).toHaveLength(1);
  expect(writeText).toBeCalledTimes(1);
  expect(writeText.mock.calls[0][0]).toMatchInlineSnapshot(`
    "| Column One |
    | --- |
    | Item One |
    "
  `);
  act(() => {
    jest.runOnlyPendingTimers();
  });
});

it('shows and hides tooltip', async () => {
  renderWithContext(<Export />);
  fireEvent.click(screen.getByText('Export'));
  expect(await screen.findAllByText('Copied Markdown')).toHaveLength(1);
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(screen.queryAllByText('Copied Markdown')).toHaveLength(0);
});
