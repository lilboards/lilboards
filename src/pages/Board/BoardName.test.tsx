import { fireEvent, render, screen } from '@testing-library/react';

import BoardName from './BoardName';

const { clipboard } = navigator;
const writeText = jest.fn();
const boardName = 'Board Name';

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

it('renders nothing when there is no name', () => {
  render(<BoardName />);
  expect(screen.queryAllByRole('heading')).toHaveLength(0);
});

it('renders board name', () => {
  render(<BoardName name={boardName} />);
  expect(screen.getByText(boardName)).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 1 })).toBe(
    screen.getByText(boardName)
  );
});

it('copies board link to clipboard', () => {
  render(<BoardName name={boardName} />);
  fireEvent.click(screen.getByLabelText('Copy link to board'));
  expect(writeText).toBeCalledTimes(1);
  expect(writeText).toBeCalledWith(window.location.href);
});
