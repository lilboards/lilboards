import { fireEvent, screen } from '@testing-library/react';

import { BOARD_TEST_ID as boardId } from '../../constants/test';
import { logEvent } from '../../firebase';
import { DEFAULT_MAX_LIKES } from '../../hooks';
import { renderWithProviders, updateStore } from '../../utils/test';
import MaxLikes from './MaxLikes';

jest.mock('../../firebase', () => ({
  logEvent: jest.fn(),
}));

it('renders default max likes value', () => {
  renderWithProviders(<MaxLikes boardId={boardId} />);
  expect(screen.getByRole('spinbutton', { name: 'Max Likes' })).toHaveValue(
    DEFAULT_MAX_LIKES
  );
});

describe('when user cannot edit', () => {
  it('renders disabled input', () => {
    renderWithProviders(<MaxLikes boardId={boardId} />);
    expect(screen.getByLabelText('Max Likes')).toBeDisabled();
  });

  it('does not change max likes value', () => {
    renderWithProviders(<MaxLikes boardId={boardId} />);
    const input = screen.getByLabelText('Max Likes');
    const event = { target: { value: DEFAULT_MAX_LIKES + 1 } };
    fireEvent.change(input, event);
    expect(input).toHaveValue(DEFAULT_MAX_LIKES);
    expect(logEvent).not.toBeCalled();
  });
});

describe('when user can edit', () => {
  let board: ReturnType<typeof updateStore.withBoard>;

  beforeEach(() => {
    board = updateStore.withBoard();
    updateStore.withUser();
  });

  it('changes max likes value', () => {
    renderWithProviders(<MaxLikes boardId={board.id} />);
    const input = screen.getByLabelText('Max Likes');
    const event = { target: { value: '0' } };
    fireEvent.change(input, event);
    expect(input).toHaveValue(Number(event.target.value));
  });

  it('logs event', () => {
    renderWithProviders(<MaxLikes boardId={board.id} />);
    const input = screen.getByLabelText('Max Likes');
    const event = { target: { value: '3.14' } };
    fireEvent.change(input, event);
    expect(logEvent).toBeCalledTimes(1);
    expect(logEvent).toBeCalledWith('max_likes', {
      boardId: board.id,
      maxLikes: 3,
    });
  });
});
