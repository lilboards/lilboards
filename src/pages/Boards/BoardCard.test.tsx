import { fireEvent, screen } from '@testing-library/react';
import { boardId, dateNow } from 'test/constants';
import { renderWithProviders, router, store, updateStore } from 'test/utils';

import BoardCard from './BoardCard';

describe('open board', () => {
  let board: ReturnType<typeof updateStore.withBoard>;

  beforeEach(() => {
    board = updateStore.withBoard();
  });

  it('renders link to open board', () => {
    renderWithProviders(<BoardCard boardId={board.id} />);
    expect(screen.getByRole('link', { name: 'Open board' })).toHaveAttribute(
      'href',
      `/boards/${boardId}`,
    );
  });

  it('navigates to board on submit', () => {
    renderWithProviders(<BoardCard boardId={board.id} />);
    fireEvent.submit(screen.getByRole('form', { name: '' }));
    expect(router.state.location.pathname).toBe(`/boards/${board.id}`);
  });
});

describe('edit board', () => {
  let board: ReturnType<typeof updateStore.withBoard>;

  beforeEach(() => {
    board = updateStore.withBoard();
  });

  it('sets user editing boardId when input is focused', () => {
    renderWithProviders(<BoardCard boardId={board.id} />);
    fireEvent.focus(screen.getByPlaceholderText('Untitled Board'));
    expect(store.getState().user.editing.boardId).toBe(board.id);
  });

  it('edits and saves board name on change', async () => {
    updateStore.withUser();
    renderWithProviders(<BoardCard boardId={board.id} />);
    const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(dateNow);
    const event = { target: { value: 'My Board Name' } };
    fireEvent.change(screen.getByLabelText('Board Name'), event);
    expect(store.getState().boards).toEqual({
      board_test_id: {
        createdAt: 1234567890,
        createdBy: 'user_test_id',
        name: 'My Board Name',
        updatedAt: 1234567890,
        updatedBy: 'user_test_id',
      },
    });
    dateNowSpy.mockRestore();
  });

  it('resets user editing boardId on blur', () => {
    renderWithProviders(<BoardCard boardId={board.id} />);
    fireEvent.blur(screen.getByLabelText('Board Name'));
    expect(store.getState().user.editing.boardId).toBe('');
  });
});

describe('delete board', () => {
  let board: ReturnType<typeof updateStore.withBoard>;
  const dialogContent = 'This action cannot be undone.';

  beforeEach(() => {
    board = updateStore.withBoard();
    updateStore.withUser();
  });

  it('renders dialog with name', () => {
    renderWithProviders(<BoardCard boardId={board.id} />);
    fireEvent.click(screen.getByLabelText(`Delete board “${board.name}”`));
    expect(
      screen.getByText(`Delete board “${board.name}”?`),
    ).toBeInTheDocument();
    expect(screen.getByText(dialogContent)).toBeInTheDocument();
  });

  it('renders dialog with no name', () => {
    board = updateStore.withBoard({ name: '' });
    updateStore.withUser();
    renderWithProviders(<BoardCard boardId={board.id} />);
    fireEvent.click(screen.getByLabelText('Delete board'));
    expect(screen.getByText('Delete board?')).toBeInTheDocument();
    expect(screen.getByText(dialogContent)).toBeInTheDocument();
  });

  it('cancels delete', () => {
    renderWithProviders(<BoardCard boardId={board.id} />);
    fireEvent.click(screen.getByLabelText(/Delete board/));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByText(dialogContent)).not.toBeVisible();
    expect(screen.getByDisplayValue(board.name)).toBeInTheDocument();
  });

  it('deletes board', () => {
    renderWithProviders(<BoardCard boardId={board.id} />);
    fireEvent.click(screen.getByLabelText(/Delete board/));
    fireEvent.click(screen.getAllByText('Delete')[1]);
    expect(screen.queryByText(dialogContent)).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue(board.name)).not.toBeInTheDocument();
  });
});
