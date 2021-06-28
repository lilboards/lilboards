import { fireEvent, screen } from '@testing-library/react';
import { getStoreState, renderWithStore, updateStore } from '../../utils/test';
import { debouncedSaveBoardData } from '../../firebase';
import { BOARD_TEST_ID as boardId } from '../../constants/test';
import BoardCard from './BoardCard';

jest.mock('../../firebase', () => ({
  debouncedSaveBoardData: jest.fn(),
}));

beforeEach(() => {
  (debouncedSaveBoardData as unknown as jest.Mock).mockClear();
});

it('renders "Open board" link', () => {
  const board = updateStore.withBoard();
  renderWithStore(<BoardCard boardId={board.id} />);
  expect(screen.getByText('Open board').closest('a')).toHaveAttribute(
    'href',
    `/boards/${boardId}`
  );
});

it('edits and saves board on change', async () => {
  const board = updateStore.withBoard();
  renderWithStore(<BoardCard boardId={board.id} />);
  const value = 'My Board Name';
  fireEvent.change(screen.getByLabelText('Board Name'), { target: { value } });
  expect(getStoreState().boards[boardId]).toEqual({
    created: expect.any(Number),
    name: value,
    updated: expect.any(Number),
  });
  expect(debouncedSaveBoardData).toBeCalledWith(board.id, {
    name: value,
    updated: expect.any(Number),
  });
});

it('resets user editing board id on blur', () => {
  const board = updateStore.withBoard();
  updateStore.withUserEditing();
  renderWithStore(<BoardCard boardId={board.id} />);
  fireEvent.blur(screen.getByLabelText('Board Name'));
  expect(getStoreState().user.editing.boardId).toBe('');
});

it('deletes board', () => {
  const board = updateStore.withBoard();
  updateStore.withUser();
  renderWithStore(<BoardCard boardId={board.id} />);
  fireEvent.click(screen.getByLabelText(/Delete board/));
  expect(screen.queryByLabelText('Board Name')).not.toBeInTheDocument();
});
