import { fireEvent, screen } from '@testing-library/react';
import { getStoreState, renderWithStore, updateStore } from '../../utils/test';
import {
  debouncedSaveBoardData,
  generateId,
  getBoardVal,
  getUserBoardsVal,
  saveBoardData,
  saveUserBoardId,
} from '../../firebase';
import { BOARD_TEST_ID as boardId } from '../../constants/test';
import Boards from './Boards';

jest.mock('../../firebase', () => ({
  debouncedSaveBoardData: jest.fn(),
  generateId: jest.fn(),
  getBoardVal: jest.fn(),
  getUserBoardsVal: jest.fn(),
  saveBoardData: jest.fn(),
  saveUserBoardId: jest.fn(),
}));

beforeEach(() => {
  (debouncedSaveBoardData as unknown as jest.Mock).mockClear();
  (generateId as jest.Mock).mockReturnValue(boardId);
  (getBoardVal as jest.Mock).mockResolvedValueOnce(null);
  (getUserBoardsVal as jest.Mock).mockResolvedValueOnce(null);
  (saveBoardData as jest.Mock).mockClear();
  (saveUserBoardId as jest.Mock).mockClear();
});

it('renders heading', () => {
  renderWithStore(<Boards />);
  expect(screen.getByRole('heading', { level: 1 })).toBe(
    screen.getByText('Boards')
  );
});

it('renders "Create board" button', () => {
  renderWithStore(<Boards />);
  expect(screen.getByLabelText('Create board')).toBeInTheDocument();
});

it('renders "Open board" link', () => {
  updateStore.withBoard();
  renderWithStore(<Boards />);
  expect(screen.getByText('Open board').closest('a')).toHaveAttribute(
    'href',
    `/boards/${boardId}`
  );
});

it('adds board', async () => {
  const user = updateStore.withUser();
  renderWithStore(<Boards />);
  fireEvent.click(screen.getByLabelText('Create board'));
  const boards = await screen.findAllByLabelText('Board Name');
  expect(boards).toHaveLength(1);
  expect(screen.getByPlaceholderText('Untitled Board')).toBe(boards[0]);
  expect(boards[0]).toHaveFocus();
  expect(saveBoardData).toBeCalledTimes(1);
  expect(saveBoardData).toBeCalledWith(boardId, {
    created: expect.any(Number),
    name: '',
    updated: expect.any(Number),
  });
  expect(saveUserBoardId).toBeCalledTimes(1);
  expect(saveUserBoardId).toBeCalledWith(user.id, boardId);
});

it('edits and saves board on change', async () => {
  const board = updateStore.withBoard();
  renderWithStore(<Boards />);
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
  const board = updateStore.withBoard();
  renderWithStore(<Boards />);
  fireEvent.blur(screen.getByLabelText('Board Name'));
  expect(getStoreState().user.editing.boardId).toBe('');
});

it('deletes board', () => {
  updateStore.withBoard();
  updateStore.withUser();
  renderWithStore(<Boards />);
  fireEvent.click(screen.getByLabelText(/Delete board/));
  expect(screen.queryByLabelText('Board Name')).not.toBeInTheDocument();
});

describe('mount', () => {
  beforeEach(() => {
    (getUserBoardsVal as jest.Mock).mockReset().mockResolvedValueOnce({
      [`${boardId}1`]: true,
      [`${boardId}2`]: true,
      [`${boardId}3`]: false,
    });

    (getBoardVal as jest.Mock)
      .mockReset()
      .mockResolvedValueOnce({ name: 'Board 1' })
      .mockResolvedValueOnce({ name: 'Board 2' })
      .mockResolvedValueOnce(null);
  });

  it('loads boards', async () => {
    updateStore.withUser();
    renderWithStore(<Boards />);
    const boards = await screen.findAllByLabelText('Board Name');
    expect(boards).toHaveLength(2);
  });
});
