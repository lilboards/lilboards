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

const props = {
  name: boardName,
};

it('renders board name', () => {
  render(<BoardName {...props} />);
  expect(screen.getByText(boardName)).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 1 })).toBe(
    screen.getByText(boardName)
  );
});

it('copies board link to clipboard', () => {
  render(<BoardName {...props} />);
  fireEvent.click(screen.getByLabelText('Copy board link'));
  expect(writeText).toBeCalledTimes(1);
  expect(writeText).toBeCalledWith(window.location.href);
});
