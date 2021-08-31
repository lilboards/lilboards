import { act, fireEvent, screen } from '@testing-library/react';
import { renderWithContext, updateStore } from '../../utils/test';
import { BOARD_TEST_ID as boardId } from '../../constants/test';
import {
  DEFAULT_MINUTES,
  MINUTE_IN_SECONDS,
  SECOND_IN_MILLISECONDS,
} from './constants';
import Timer from './Timer';

const defaultMilliseconds =
  DEFAULT_MINUTES * MINUTE_IN_SECONDS * SECOND_IN_MILLISECONDS;

describe('timer', () => {
  let alertSpy: jest.SpyInstance;
  let button: HTMLElement;
  let input: HTMLElement;

  beforeAll(() => {
    alertSpy = jest.spyOn(window, 'alert');
    jest.useFakeTimers('modern');
  });

  afterAll(() => {
    alertSpy.mockRestore();
    jest.useRealTimers();
  });

  beforeEach(() => {
    const board = updateStore.withBoard();
    renderWithContext(<Timer boardId={board.id} />);
    input = screen.getByLabelText('Timer in minutes');
    button = screen.getByLabelText('Start timer');
  });

  afterEach(() => {
    alertSpy.mockReset();
  });

  it('starts and stops the timer', () => {
    // start
    act(() => {
      fireEvent.click(button);
      jest.setSystemTime(Date.now() + SECOND_IN_MILLISECONDS);
      jest.advanceTimersByTime(SECOND_IN_MILLISECONDS);
    });

    expect(button).toHaveAttribute('aria-label', 'Stop timer');
    expect(button).toHaveTextContent('Stop');
    expect(input).toHaveProperty('type', 'text');
    expect(input).toBeDisabled();
    expect(input).toHaveValue('4:58');

    // stop
    act(() => {
      fireEvent.click(button);
    });

    expect(button).toHaveAttribute('aria-label', 'Start timer');
    expect(button).toHaveTextContent('Start');
    expect(input).toHaveProperty('type', 'number');
    expect(input).not.toBeDisabled();
    expect(input).toHaveValue(5);
  });

  it('alerts when the time is up', () => {
    act(() => {
      fireEvent.click(button);
      jest.setSystemTime(Date.now() + defaultMilliseconds);
      jest.advanceTimersByTime(defaultMilliseconds);
    });

    expect(alertSpy).toBeCalledTimes(1);
    expect(button).toHaveAttribute('aria-label', 'Start timer');
    expect(button).toHaveTextContent('Start');
    expect(input).toHaveProperty('type', 'number');
    expect(input).not.toBeDisabled();
    expect(input).toHaveValue(5);
  });
});

it('renders "Timer" input', () => {
  renderWithContext(<Timer boardId={boardId} />);
  const input = screen.getByRole('spinbutton', { name: 'Timer in minutes' });
  expect(input).toHaveValue(5);
  expect(input).toHaveProperty('placeholder', 'Minutes');
  expect(input).toHaveProperty('type', 'number');
  expect(input).not.toBeDisabled();
});

it('renders "Start" button', () => {
  renderWithContext(<Timer boardId={boardId} />);
  expect(screen.getByRole('button', { name: 'Start timer' })).toHaveTextContent(
    'Start'
  );
});

it.each([undefined, '', -1, 0, 0.1, 1, 2, 3.14, 42])(
  'changes input value to %j',
  (value) => {
    renderWithContext(<Timer boardId={boardId} />);
    const input = screen.getByLabelText('Timer in minutes');
    const event = { target: { value } };
    fireEvent.change(input, event);
    expect(input).toHaveValue(value === '' ? null : value);
  }
);

it('does not start timer if minutes is not greater than 0', () => {
  const board = updateStore.withBoard();
  renderWithContext(<Timer boardId={board.id} />);
  const input = screen.getByLabelText('Timer in minutes');
  const event = { target: { value: 0 } };
  fireEvent.change(input, event);
  const button = screen.getByLabelText('Start timer');

  act(() => {
    fireEvent.click(button);
  });
  expect(button).toHaveTextContent('Start');
  expect(input).not.toBeDisabled();
});
