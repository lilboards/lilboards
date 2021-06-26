import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
import {
  generateId,
  getBoardVal,
  getUserBoardsVal,
  saveBoardData,
} from '../../firebase';
import { BOARD_TEST_ID as boardId } from '../../constants/test';
import Boards from './Boards';

jest.mock('../../firebase', () => ({
  generateId: jest.fn(),
  getBoardVal: jest.fn(),
  getUserBoardsVal: jest.fn(),
  saveBoardData: jest.fn(),
}));

beforeEach(() => {
  (generateId as jest.Mock).mockReturnValue(boardId);
  (getBoardVal as jest.Mock).mockResolvedValueOnce(null);
  (getUserBoardsVal as jest.Mock).mockResolvedValueOnce(null);
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

it('creates board', async () => {
  updateStore.withUser();
  renderWithStore(<Boards />);
  fireEvent.click(screen.getByLabelText('Create board'));
  const boards = await screen.findAllByLabelText('Board Name');
  expect(boards).toHaveLength(1);
  expect(screen.getByPlaceholderText('Untitled Board')).toBe(boards[0]);
  expect(boards[0]).toHaveFocus();
});

it('edits board on change', async () => {
  updateStore.withBoard();
  renderWithStore(<Boards />);
  const value = 'My Board Name';
  fireEvent.change(screen.getByLabelText('Board Name'), { target: { value } });
  const inputs = await screen.findAllByDisplayValue(value);
  expect(inputs).toHaveLength(1);
});

it('saves board on blur', () => {
  const board = updateStore.withBoard();
  renderWithStore(<Boards />);
  fireEvent.blur(screen.getByLabelText('Board Name'));
  expect(saveBoardData).toBeCalledWith(board.id, board);
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
