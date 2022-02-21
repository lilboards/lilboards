import { act, fireEvent, screen } from '@testing-library/react';

import { BOARD_TEST_ID as boardId } from '../../constants/test';
import { renderWithContext, updateStore } from '../../utils/test';
import {
  DEFAULT_MINUTES,
  MINUTE_IN_SECONDS,
  SECOND_IN_MILLISECONDS,
} from './constants';
import Timer from './Timer';

jest.mock('./audio', () => ({
  loadAlarm: jest.fn(),
  playAlarm: jest.fn(),
}));

const defaultMilliseconds =
  DEFAULT_MINUTES * MINUTE_IN_SECONDS * SECOND_IN_MILLISECONDS;

let board: ReturnType<typeof updateStore.withBoard>;

// for some reason, the 'timer' test suite must run first or else it will fail (race condition?)
describe('timer', () => {
  let alertSpy: jest.SpyInstance;
  let button: HTMLElement;
  let input: HTMLElement;

  beforeAll(() => {
    alertSpy = jest.spyOn(window, 'alert');
    jest.useFakeTimers();
  });

  afterAll(() => {
    alertSpy.mockRestore();
    jest.useRealTimers();
  });

  beforeEach(() => {
    board = updateStore.withBoard();
    updateStore.withUser();
  });

  afterEach(() => {
    alertSpy.mockReset();
    jest.clearAllTimers();
  });

  it('starts and stops the timer', async () => {
    renderWithContext(<Timer boardId={board.id} />);
    input = screen.getByLabelText('Timer in minutes');
    button = screen.getByLabelText('Start timer');

    // start
    fireEvent.click(button);
    act(() => {
      jest.setSystemTime(Date.now() + SECOND_IN_MILLISECONDS);
      jest.advanceTimersByTime(SECOND_IN_MILLISECONDS);
    });

    expect(button).toHaveAttribute('aria-label', 'Stop timer');
    expect(button).toHaveTextContent('Stop');
    expect(input).toHaveProperty('type', 'text');
    expect(input).toBeDisabled();
    expect(input).toHaveValue('4:58');

    // stop
    fireEvent.click(button);
    await screen.findByLabelText('Start timer');

    expect(button).toHaveAttribute('aria-label', 'Start timer');
    expect(button).toHaveTextContent('Start');
    expect(input).toHaveProperty('type', 'number');
    expect(input).not.toBeDisabled();
    expect(input).toHaveValue(5);
  });

  it('alerts when the time is up', () => {
    renderWithContext(<Timer boardId={board.id} />);
    input = screen.getByLabelText('Timer in minutes');
    button = screen.getByLabelText('Start timer');

    fireEvent.click(button);
    act(() => {
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

it('renders nothing when user cannot edit and timer is not running', () => {
  renderWithContext(<Timer boardId={boardId} />);
  expect(screen.queryByLabelText(/timer/i)).toBe(null);
});

describe('when user can edit', () => {
  beforeEach(() => {
    board = updateStore.withBoard();
    updateStore.withUser();
  });

  it('renders "Timer" input', () => {
    renderWithContext(<Timer boardId={board.id} />);
    const input = screen.getByRole('spinbutton', { name: 'Timer in minutes' });
    expect(input).toHaveValue(5);
    expect(input).toHaveProperty('placeholder', 'Minutes');
    expect(input).toHaveProperty('type', 'number');
    expect(input).not.toBeDisabled();
  });

  it('renders "Start" button', () => {
    renderWithContext(<Timer boardId={board.id} />);
    const button = screen.getByRole('button', { name: 'Start timer' });
    expect(button).toHaveTextContent('Start');
    expect(button).not.toBeDisabled();
  });

  describe('input onChange', () => {
    it.each([undefined, '', -1, 0, 0.1, 1, 2, 3.14, 42])(
      'changes value to %j',
      (value) => {
        renderWithContext(<Timer boardId={board.id} />);
        const input = screen.getByLabelText('Timer in minutes');
        const event = { target: { value } };
        fireEvent.change(input, event);
        expect(input).toHaveValue(value === '' ? null : value);
      }
    );
  });
});

describe('when user cannot edit', () => {
  it('does not render the "Timer" input', () => {
    renderWithContext(<Timer boardId={boardId} />);
    expect(screen.queryByLabelText('Timer in minutes')).not.toBeInTheDocument();
  });

  it('does not render the "Start" button', () => {
    renderWithContext(<Timer boardId={boardId} />);
    expect(
      screen.queryByRole('button', { name: 'Start timer' })
    ).not.toBeInTheDocument();
  });
});

describe('when minutes is not greater than 0', () => {
  let button: HTMLElement;
  let input: HTMLElement;
  const event = { target: { value: 0 } };

  beforeAll(() => {
    board = updateStore.withBoard();
    updateStore.withUser();
  });

  it('does not start timer', () => {
    renderWithContext(<Timer boardId={board.id} />);
    input = screen.getByLabelText('Timer in minutes');
    fireEvent.change(input, event);
    button = screen.getByLabelText('Start timer');

    fireEvent.click(button);

    expect(button).toHaveTextContent('Start');
    expect(input).not.toBeDisabled();
  });
});
