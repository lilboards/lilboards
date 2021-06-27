import { fireEvent, screen } from '@testing-library/react';
import { getStoreState, renderWithStore, updateStore } from '../../utils/test';
import { debouncedSaveBoardData } from '../../firebase';
import { BOARD_TEST_ID as boardId } from '../../constants/test';
import BoardCards from './BoardCards';

jest.mock('../../firebase', () => ({
  debouncedSaveBoardData: jest.fn(),
}));

beforeEach(() => {
  (debouncedSaveBoardData as unknown as jest.Mock).mockClear();
});

it('renders nothing when there are no boards', () => {
  renderWithStore(<BoardCards />);
  expect(screen.queryByLabelText('Board Name')).not.toBeInTheDocument();
});

it('renders "Open board" link', () => {
  updateStore.withBoard();
  renderWithStore(<BoardCards />);
  expect(screen.getByText('Open board').closest('a')).toHaveAttribute(
    'href',
    `/boards/${boardId}`
  );
});

it('edits and saves board on change', async () => {
  const board = updateStore.withBoard();
  renderWithStore(<BoardCards />);
  const value = 'My Board Name';
  fireEvent.change(screen.getByLabelText('Board Name'), { target: { value } });
  const inputs = await screen.findAllByDisplayValue(value);
  expect(inputs).toHaveLength(1);
  expect(debouncedSaveBoardData).toBeCalledWith(board.id, {
    name: value,
    updated: expect.any(Number),
  });
});

it('resets user editing board id on blur', () => {
  updateStore.withBoard();
  updateStore.withUserEditing();
  renderWithStore(<BoardCards />);
  fireEvent.blur(screen.getByLabelText('Board Name'));
  expect(getStoreState().user.editing.boardId).toBe('');
});

it('deletes board', () => {
  updateStore.withBoard();
  updateStore.withUser();
  renderWithStore(<BoardCards />);
  fireEvent.click(screen.getByLabelText(/Delete board/));
  expect(screen.queryByLabelText('Board Name')).not.toBeInTheDocument();
});
