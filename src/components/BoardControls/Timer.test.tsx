import { act, fireEvent, screen } from '@testing-library/react';

import { BOARD_TEST_ID as boardId } from '../../../test/constants';
import { renderWithProviders, updateStore } from '../../../test/utils';
import { playAlarm } from './audio';
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

beforeAll(() => {
  jest.useFakeTimers();
});

describe('timer', () => {
  let button: HTMLElement;
  let input: HTMLElement;

  beforeEach(() => {
    board = updateStore.withBoard();
    updateStore.withUser();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('starts and stops the timer', async () => {
    renderWithProviders(<Timer boardId={board.id} />);
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
    renderWithProviders(<Timer boardId={board.id} />);
    input = screen.getByLabelText('Timer in minutes');
    button = screen.getByLabelText('Start timer');

    fireEvent.click(button);
    act(() => {
      jest.setSystemTime(Date.now() + defaultMilliseconds);
      jest.advanceTimersByTime(defaultMilliseconds);
    });

    expect(screen.getByText("⏰ Time's up!")).toBeInTheDocument();
    expect(playAlarm).toHaveBeenCalledTimes(1);
    expect(button).toHaveAttribute('aria-label', 'Start timer');
    expect(button).toHaveTextContent('Start');
    expect(input).toHaveProperty('type', 'number');
    expect(input).not.toBeDisabled();
    expect(input).toHaveValue(5);
  });
});

it('renders nothing when user cannot edit and timer is not running', () => {
  renderWithProviders(<Timer boardId={boardId} />);
  expect(screen.queryByLabelText(/timer/i)).toBe(null);
});

describe('when user can edit', () => {
  beforeEach(() => {
    board = updateStore.withBoard();
    updateStore.withUser();
  });

  it('renders "Timer" input', () => {
    renderWithProviders(<Timer boardId={board.id} />);
    const input = screen.getByRole('spinbutton', { name: 'Timer in minutes' });
    expect(input).toHaveValue(5);
    expect(input).toHaveProperty('placeholder', 'Minutes');
    expect(input).toHaveProperty('type', 'number');
    expect(input).not.toBeDisabled();
  });

  it('renders "Start" button', () => {
    renderWithProviders(<Timer boardId={board.id} />);
    const button = screen.getByRole('button', { name: 'Start timer' });
    expect(button).toHaveTextContent('Start');
    expect(button).not.toBeDisabled();
  });

  describe('input onChange', () => {
    it.each([undefined, '', -1, 0, 0.1, 1, 2, 3.14, 42])(
      'changes value to %j',
      (value) => {
        renderWithProviders(<Timer boardId={board.id} />);
        const input = screen.getByLabelText('Timer in minutes');
        const event = { target: { value } };
        fireEvent.change(input, event);
        expect(input).toHaveValue(value === '' ? null : value);
      },
    );
  });
});

describe('when user cannot edit', () => {
  it('does not render the "Timer" input', () => {
    renderWithProviders(<Timer boardId={boardId} />);
    expect(screen.queryByLabelText('Timer in minutes')).not.toBeInTheDocument();
  });

  it('does not render the "Start" button', () => {
    renderWithProviders(<Timer boardId={boardId} />);
    expect(
      screen.queryByRole('button', { name: 'Start timer' }),
    ).not.toBeInTheDocument();
  });
});

describe('when minutes is not greater than 0', () => {
  let button: HTMLElement;
  let input: HTMLElement;
  const event = { target: { value: 0 } };

  beforeEach(() => {
    board = updateStore.withBoard();
    updateStore.withUser();
  });

  it('does not start timer', () => {
    renderWithProviders(<Timer boardId={board.id} />);
    input = screen.getByLabelText('Timer in minutes');
    fireEvent.change(input, event);
    button = screen.getByLabelText('Start timer');

    fireEvent.click(button);

    expect(button).toHaveTextContent('Start');
    expect(input).not.toBeDisabled();
  });
});
