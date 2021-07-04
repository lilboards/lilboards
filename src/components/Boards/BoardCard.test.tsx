import { fireEvent, screen } from '@testing-library/react';
import { getStoreState, renderWithStore, updateStore } from '../../utils/test';
import { BOARD_TEST_ID as boardId } from '../../constants/test';
import BoardCard from './BoardCard';

it('renders "Open board" button', () => {
  const board = updateStore.withBoard();
  renderWithStore(<BoardCard boardId={board.id} />);
  expect(screen.getByRole('button', { name: 'Open board' })).toHaveAttribute(
    'href',
    `/boards/${boardId}`
  );
});

describe('edit board', () => {
  let board: ReturnType<typeof updateStore.withBoard>;

  beforeEach(() => {
    board = updateStore.withBoard();
    renderWithStore(<BoardCard boardId={board.id} />);
  });

  it('sets user editing boardId when input is focused', () => {
    fireEvent.focus(screen.getByPlaceholderText('Untitled Board'));
    expect(getStoreState().user.editing.boardId).toBe(board.id);
  });

  it('edits and saves board name on change', async () => {
    const event = { target: { value: 'My Board Name' } };
    fireEvent.change(screen.getByLabelText('Board Name'), event);
    expect(getStoreState().boards[boardId]).toEqual({
      created: expect.any(Number),
      name: event.target.value,
      updated: expect.any(Number),
    });
  });

  it('resets user editing boardId on blur', () => {
    fireEvent.blur(screen.getByLabelText('Board Name'));
    expect(getStoreState().user.editing.boardId).toBe('');
  });
});

describe('delete board', () => {
  it('deletes board', () => {
    const board = updateStore.withBoard();
    updateStore.withUser();
    renderWithStore(<BoardCard boardId={board.id} />);
    fireEvent.click(screen.getByLabelText(/Delete board/));
    expect(screen.queryByLabelText('Board Name')).not.toBeInTheDocument();
  });
});
