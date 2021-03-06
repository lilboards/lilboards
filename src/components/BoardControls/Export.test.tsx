import { fireEvent, screen } from '@testing-library/react';

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

it('copies empty markdown to clipboard', () => {
  renderWithContext(<Export />);
  fireEvent.click(screen.getByLabelText('Copy board as Markdown'));
  expect(writeText).toBeCalledTimes(1);
  expect(writeText).toBeCalledWith('');
});

it('copies markdown to clipboard', () => {
  updateStore.withColumn();
  updateStore.withItem();
  renderWithContext(<Export />);
  fireEvent.click(screen.getByLabelText('Copy board as Markdown'));
  expect(writeText).toBeCalledTimes(1);
  expect(writeText.mock.calls[0][0]).toMatchInlineSnapshot(`
    "| Column One |
    | --- |
    | Item One |
    "
  `);
});
