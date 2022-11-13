import { fireEvent, screen } from '@testing-library/react';

import {
  BOARD_TEST_ID as boardId,
  DATE_NOW as dateNow,
} from '../../constants/test';
import { renderWithContext, store, updateStore } from '../../utils/test';
import BoardCard from './BoardCard';

it('renders "Open board" link', () => {
  const board = updateStore.withBoard();
  renderWithContext(<BoardCard boardId={board.id} />);
  expect(screen.getByRole('link', { name: 'Open board' })).toHaveAttribute(
    'href',
    `/boards/${boardId}`
  );
});

describe('edit board', () => {
  let board: ReturnType<typeof updateStore.withBoard>;

  beforeEach(() => {
    board = updateStore.withBoard();
  });

  it('sets user editing boardId when input is focused', () => {
    renderWithContext(<BoardCard boardId={board.id} />);
    fireEvent.focus(screen.getByPlaceholderText('Untitled Board'));
    expect(store.getState().user.editing.boardId).toBe(board.id);
  });

  it('edits and saves board name on change', async () => {
    updateStore.withUser();
    renderWithContext(<BoardCard boardId={board.id} />);
    const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(dateNow);
    const event = { target: { value: 'My Board Name' } };
    fireEvent.change(screen.getByLabelText('Board Name'), event);
    expect(store.getState().boards).toMatchInlineSnapshot(`
      Object {
        "board_test_id": Object {
          "createdAt": 1234567890,
          "createdBy": "user_test_id",
          "name": "My Board Name",
          "updatedAt": 1234567890,
          "updatedBy": "user_test_id",
        },
      }
    `);
    dateNowSpy.mockRestore();
  });

  it('resets user editing boardId on blur', () => {
    renderWithContext(<BoardCard boardId={board.id} />);
    fireEvent.blur(screen.getByLabelText('Board Name'));
    expect(store.getState().user.editing.boardId).toBe('');
  });
});

describe('delete board', () => {
  let board: ReturnType<typeof updateStore.withBoard>;

  beforeEach(() => {
    board = updateStore.withBoard();
    updateStore.withUser();
  });

  it('deletes board', () => {
    renderWithContext(<BoardCard boardId={board.id} />);
    fireEvent.click(screen.getByLabelText(/Delete board/));
    expect(screen.queryByLabelText('Board Name')).not.toBeInTheDocument();
  });
});
